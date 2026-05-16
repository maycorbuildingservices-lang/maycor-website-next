// A–H Engine (pure functions)
// Config shape: see frontend/src/config.json

function roundToNearest(val, step = 50) {
  return Math.round(val / step) * step;
}

export function spreadPctFromRiskScore(riskScoreCapped) {
  if (riskScoreCapped <= 8) return 0.20;
  if (riskScoreCapped <= 14) return 0.30;
  if (riskScoreCapped <= 17) return 0.40;
  if (riskScoreCapped <= 20) return 0.45;
  if (riskScoreCapped <= 23) return 0.50;
  return 0.55;
}

function highCapMultiple(spreadPct) {
  return spreadPct <= 0.30 ? 1.65 : 1.85;
}

function isCompactBand(band) {
  return band === "wc" || band === "very_small";
}

const FINISH_MULTIPLIER_CAPS_BY_BAND = {
  wc: {
    standard: 1.0,
    mid: 1.08,
    premium: 1.15,
  },
  very_small: {
    standard: 1.0,
    mid: 1.12,
    premium: 1.22,
  },
  small: {
    standard: 1.0,
    mid: 1.14,
    premium: 1.23,
  },
  medium: {
    standard: 1.0,
    mid: 1.15,
    premium: 1.25,
  },
  large: {
    standard: 1.0,
    mid: 1.16,
    premium: 1.26,
  },
};

function finishMultiplierForBand(config, band, finishUsed) {
  const configured = Number(config.finish_multipliers?.[finishUsed] ?? 1.0);
  const bandCap = FINISH_MULTIPLIER_CAPS_BY_BAND[band]?.[finishUsed];

  return Math.min(configured, bandCap ?? configured);
}

export function formatGBP(n) {
  return n.toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  });
}

/**
 * Dynamic Range Balancer
 * - Ensures a minimum curiosity gap (minGap)
 * - Caps runaway gaps (maxGap)
 * - Optional low floor so lows can’t drop unrealistically low
 *
 * Uses config.gap_cfg[band]: { fixed, dynPct, cap }
 * Optional: config.low_floor_pct (default 0.85) => low >= baseLow * low_floor_pct
 */
function applyRangeBalancer(config, band, baseLow, low, high) {
  const cfg = config.gap_cfg?.[band];
  if (!cfg) return { low, high };

  const fixed = Number(cfg.fixed ?? 0);
  const dynPct = Number(cfg.dynPct ?? 0);
  const cap = Number(cfg.cap ?? Infinity);

  // Optional: prevents negative adders pushing low unrealistically far down
  const compactLowFloorPct = {
    wc: 0.70,
    very_small: 0.72,
  };
  const defaultLowFloorPct = compactLowFloorPct[band] ?? 0.85;
  const lowFloorPct = Number(config.low_floor_pct ?? defaultLowFloorPct);
  const lowFloor = baseLow * lowFloorPct;

  let newLow = Number(low);
  let newHigh = Number(high);

  if (Number.isFinite(lowFloor) && newLow < lowFloor) {
    newLow = lowFloor;
  }

  const minGap = Math.max(fixed, Math.round(newLow * dynPct));
  const compactMaxGap = {
    wc: 2200,
    very_small: 3000,
  };
  const maxGap = Math.round(compactMaxGap[band] ? Math.min(cap, compactMaxGap[band]) : cap);

  // Ensure min gap (raise high only)
  if (newHigh - newLow < minGap) {
    newHigh = newLow + minGap;
  }

  // Cap extreme gaps (compress high)
  if (newHigh - newLow > maxGap) {
    newHigh = newLow + maxGap;
  }

  return { low: newLow, high: newHigh };
}

function isPremiumSelection(opt) {
  const marker = String(opt.marker || "");
  return (
    String(opt.sectionTitle || "").toLowerCase() !== "finish level" &&
    (marker.includes("£££") ||
      Number(opt.risk_points || 0) >= 3 ||
      opt.is_premium_anchor === true)
  );
}

function hasSelectedId(selectedOptions, ids) {
  return selectedOptions.some((opt) => ids.includes(opt.id));
}

function applyRoomSelectionGuard(config, band, selectedBySectionId) {
  if (band !== "wc") {
    return { selections: selectedBySectionId, flags: [] };
  }

  const selections = { ...selectedBySectionId };
  const flags = [];

  const bathSection = config.sections.find((section) => section.id === "bath");
  const showerSection = config.sections.find((section) => section.id === "shower");

  const safeBathId =
    bathSection?.options.find((option) => String(option.id).includes("no_bath"))?.id ||
    bathSection?.defaultOptionId ||
    null;
  const safeShowerId =
    showerSection?.options.find((option) => String(option.id).includes("no_shower"))?.id ||
    showerSection?.defaultOptionId ||
    null;

  if (safeBathId && selections.bath && selections.bath !== safeBathId) {
    selections.bath = safeBathId;
    flags.push("WC layout limited bath selection to no bath");
  }

  if (safeShowerId && selections.shower && selections.shower !== safeShowerId) {
    selections.shower = safeShowerId;
    flags.push("WC layout limited shower selection to no shower");
  }

  return { selections, flags };
}

function applyCoherenceAdjustments({ band, selectedOptions, pricedLow, pricedHigh, finishMult }) {
  const flags = [];
  const factorsById = new Map();

  function setFactor(optId, lowFactor, highFactor) {
    const prev = factorsById.get(optId) || { low: 1, high: 1 };
    factorsById.set(optId, {
      low: Math.min(prev.low, lowFactor),
      high: Math.min(prev.high, highFactor),
    });
  }

  if (isCompactBand(band)) {
    if (hasSelectedId(selectedOptions, ["bath__freestanding_bath_jacuzzi"])) {
      setFactor("bath__freestanding_bath_jacuzzi", 0.75, 0.60);
      flags.push("Compact room pricing adjusted for freestanding bath/jacuzzi");
    }

    if (hasSelectedId(selectedOptions, ["basin_vanity__double_vanity"])) {
      setFactor("basin_vanity__double_vanity", 0.80, 0.65);
      flags.push("Compact room pricing adjusted for double vanity");
    }

    if (hasSelectedId(selectedOptions, ["shower__walk_in_shower_wet_room_pump_if_needed"])) {
      setFactor("shower__walk_in_shower_wet_room_pump_if_needed", 0.85, 0.70);
      flags.push("Compact room pricing adjusted for wet room/pump");
    }
  }

  const hasHighLayoutOrStructure =
    hasSelectedId(selectedOptions, [
      "layout_change_level__moderate_changes",
      "layout_change_level__full_reconfiguration",
      "structural_changes__medium_structural",
      "structural_changes__significant_structural",
    ]);

  if (
    hasSelectedId(selectedOptions, ["toilet__saniflo_macerator"]) &&
    !hasHighLayoutOrStructure
  ) {
    setFactor("toilet__saniflo_macerator", 0.85, 0.60);
    flags.push("Saniflo/macerator pricing adjusted for simple layouts");
  }

  const premiumOptions = selectedOptions.filter(isPremiumSelection);
  premiumOptions.forEach((opt, index) => {
    const premiumNumber = index + 1;
    if (band === "wc") {
      if (premiumNumber <= 1) return;

      const factor = premiumNumber === 2 ? 0.65 : 0.35;
      setFactor(opt.id, factor, factor);
      return;
    }

    if (band === "very_small") {
      if (premiumNumber <= 2) return;

      const factor = premiumNumber === 3 ? 0.70 : 0.45;
      setFactor(opt.id, factor, factor);
      return;
    }

    if (premiumNumber <= 3) return;

    const factor = premiumNumber === 4 ? 0.75 : 0.55;
    setFactor(opt.id, factor, factor);
  });

  if (premiumOptions.length > 3) {
    flags.push(
      isCompactBand(band)
        ? "Compact room pricing balanced for premium selections"
        : "Premium selections balanced"
    );
  }

  let lowAdjustment = 0;
  let highAdjustment = 0;

  for (const opt of selectedOptions) {
    const factors = factorsById.get(opt.id);
    if (!factors) continue;

    const lowAdder = Math.max(0, Number(opt.adder_low || 0) * finishMult);
    const highAdder = Math.max(0, Number(opt.adder_high || 0) * finishMult);

    lowAdjustment += lowAdder * (1 - factors.low);
    highAdjustment += highAdder * (1 - factors.high);
  }

  return {
    low: pricedLow - lowAdjustment,
    high: pricedHigh - highAdjustment,
    flags,
    premium_count: premiumOptions.length,
  };
}

function applyCompactRoomLowBalance({ band, selectedOptions, baseLow, finishMult, low, high }) {
  if (!isCompactBand(band)) return { low, high };

  const hasMajorComplexity = hasSelectedId(selectedOptions, [
    "layout_change_level__full_reconfiguration",
    "structural_changes__significant_structural",
  ]);

  const basePricedLow = baseLow * finishMult;
  const lowGrowthFactor =
    band === "wc"
      ? (hasMajorComplexity ? 0.58 : 0.30)
      : (hasMajorComplexity ? 0.68 : 0.45);

  const lowFloorPct = band === "wc" ? 0.70 : 0.72;

  let balancedLow = basePricedLow;
  if (low >= basePricedLow) {
    balancedLow = basePricedLow + (low - basePricedLow) * lowGrowthFactor;
  } else {
    const reductionFactor =
      band === "wc"
        ? (hasMajorComplexity ? 0.20 : 0.45)
        : (hasMajorComplexity ? 0.12 : 0.30);
    balancedLow = Math.max(
      baseLow * lowFloorPct,
      basePricedLow - (basePricedLow - low) * reductionFactor
    );
  }

  const gap = Math.max(0, high - low);

  return {
    low: balancedLow,
    high: balancedLow + gap,
  };
}

// Kept for debug/reference if you ever want it again.
// It no longer affects pricing because finish is now purely chosen by the user.
function observedFinishFromSelections(config, selectedOptions) {
  const nonFinishOptions = selectedOptions.filter(
    (o) => String(o.sectionTitle || "").toLowerCase() !== "finish level"
  );

  const hasHardPremiumAnchor = nonFinishOptions.some((o) => o.is_premium_anchor === true);
  if (hasHardPremiumAnchor) return "premium";

  const pts = nonFinishOptions.reduce((sum, o) => sum + Number(o.finish_points || 0), 0);
  const thr = config.finish_points_thresholds || { mid: 6, premium: 10 };

  if (pts >= Number(thr.premium || 10)) return "premium";
  if (pts >= Number(thr.mid || 6)) return "mid";
  return "standard";
}

export function calculatePriceRange(config, selectedBySectionId) {
  const roomSizeSection = config.sections.find((s) => s.title === "Room size");
  const roomOptId = roomSizeSection ? selectedBySectionId[roomSizeSection.id] : null;
  if (!roomOptId) return null;

  // Determine size band by option label
  const roomOpt = roomSizeSection.options.find((o) => o.id === roomOptId);
  const label = (roomOpt?.label || "").toLowerCase();
  let band = null;
  if (label.includes("wc") || label.includes("w/c") || label.includes("cloakroom")) band = "wc";
  else if (label.includes("very small")) band = "very_small";
  else if (label.startsWith("small")) band = "small";
  else if (label.startsWith("medium")) band = "medium";
  else if (label.startsWith("large")) band = "large";
  if (!band) return null;

  const baseLow = Number(config.base_bands?.[band]?.low ?? 0);
  const baseHigh = Number(config.base_bands?.[band]?.high ?? 0);

  const roomGuard = applyRoomSelectionGuard(config, band, selectedBySectionId);
  const selectedSelections = roomGuard.selections;
  const guardFlags = roomGuard.flags;

  // Flatten selected options
  const selectedOptions = [];
  for (const sec of config.sections) {
    const optId = selectedSelections[sec.id];
    if (!optId) continue;
    const opt = sec.options.find((o) => o.id === optId);
    if (opt) selectedOptions.push({ ...opt, sectionKey: sec.sectionKey, sectionTitle: sec.title });
  }

  // A) Subtotals from base bands + adders
  let subtotalLow = baseLow;
  let subtotalHigh = baseHigh;
  for (const opt of selectedOptions) {
    subtotalLow += Number(opt.adder_low || 0);
    subtotalHigh += Number(opt.adder_high || 0);
  }

  // B) Finish = PURE percentage multiplier from the finish buttons (no overrides)
  const finishSection = config.sections.find((s) => s.title === "Finish level");
  const finishOptId = finishSection ? selectedSelections[finishSection.id] : null;

  // Detect finish by option id (bulletproof)
  let chosenFinish = "standard";
  if (finishOptId && finishSection) {
    const fOpt = finishSection.options.find((o) => o.id === finishOptId);
    const fid = String(fOpt?.id || "").toLowerCase();

    if (fid.includes("__premium")) chosenFinish = "premium";
    else if (fid.includes("__mid")) chosenFinish = "mid";
    else chosenFinish = "standard";
  }

  // Apply chosen finish only
  const finishUsed = chosenFinish;
  const finishMult = finishMultiplierForBand(config, band, finishUsed);

  const pricedLow = subtotalLow * finishMult;
  const pricedHigh = subtotalHigh * finishMult;

  const coherence = applyCoherenceAdjustments({
    band,
    selectedOptions,
    pricedLow,
    pricedHigh,
    finishMult,
  });

  const balanced = applyCompactRoomLowBalance({
    band,
    selectedOptions,
    baseLow,
    finishMult,
    low: coherence.low,
    high: coherence.high,
  });

  // (Debug only: keep observed finish calculated if you want to view later)
  const observedFinish = observedFinishFromSelections(config, selectedOptions);

  // D/E) Risk score with per-section cap => spread pct
  const riskByKey = {};
  for (const opt of selectedOptions) {
    const k = opt.sectionKey || "misc";
    riskByKey[k] = (riskByKey[k] || 0) + Number(opt.risk_points || 0);
  }

  const sectionCap = Number(config.risk_section_cap ?? 6);
  let riskScoreCapped = 0;
  for (const k of Object.keys(riskByKey)) {
    riskScoreCapped += Math.min(riskByKey[k], sectionCap);
  }

  const spreadPct = spreadPctFromRiskScore(riskScoreCapped);

  let highAfterSpread = Math.max(balanced.high, balanced.low * (1 + spreadPct));

  // F/G) Curiosity-gap minimum range
  const cfg = config.gap_cfg?.[band] || { fixed: 800, dynPct: 0.12, cap: 4500 };
  const minGap = Math.min(
    Number(cfg.cap),
    Math.max(Number(cfg.fixed), Number(cfg.dynPct) * balanced.low)
  );
  let highAfterGap = Math.max(highAfterSpread, balanced.low + minGap);

  // H) Believability cap
  const highCap = balanced.low * highCapMultiple(spreadPct);

  let lowFinal = balanced.low;
  let highFinal = Math.min(highAfterGap, highCap);

  // New balancer (caps runaway gaps + optional low floor)
  ({ low: lowFinal, high: highFinal } = applyRangeBalancer(
    config,
    band,
    baseLow,
    lowFinal,
    highFinal
  ));

  return {
    band,
    chosen_finish: chosenFinish,
    observed_finish: observedFinish, // debug-only now
    finish_used: finishUsed,
    risk_score_capped: riskScoreCapped,
    spread_pct: spreadPct,
    premium_count: coherence.premium_count,
    flags: Array.from(new Set([...guardFlags, ...coherence.flags])),
    final_low: roundToNearest(lowFinal, 50),
    final_high: roundToNearest(highFinal, 50),
    note_finish_bumped: false
  };
}
