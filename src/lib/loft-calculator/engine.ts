// Loft Conversion Price Engine (pure functions)

export interface ConfigOption {
  id: string;
  band?: string;
  label: string;
  desc: string;
  marker: string;
  risk_points: number;
  adder_low: number;
  adder_high: number;
}

export interface ConfigSection {
  id: string;
  title: string;
  mainSection: string;
  sectionKey: string;
  layout: "tile" | "row";
  helper: string;
  options: ConfigOption[];
  defaultOptionId: string;
}

export interface GapCfgEntry {
  fixed: number;
  dynPct: number;
  cap: number;
}

export interface CalculatorConfig {
  meta: {
    name: string;
    version: string;
    admin_email: string;
    reply_to: string;
    sending_domain: string;
  };
  base_bands: Record<string, { low: number; high: number }>;
  finish_multipliers: Record<string, number>;
  risk_section_cap: number;
  gap_cfg: Record<string, GapCfgEntry>;
  sections: ConfigSection[];
}

export interface PriceResult {
  band: string;
  chosen_finish: string;
  risk_score_capped: number;
  spread_pct: number;
  flags: string[];
  final_low: number;
  final_high: number;
}

function roundToNearest(val: number, step = 500): number {
  return Math.round(val / step) * step;
}

export function spreadPctFromRiskScore(riskScore: number): number {
  if (riskScore <= 3) return 0.16;
  if (riskScore <= 7) return 0.22;
  if (riskScore <= 12) return 0.28;
  if (riskScore <= 17) return 0.35;
  if (riskScore <= 22) return 0.42;
  return 0.50;
}

export function formatGBP(n: number): string {
  return n.toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  });
}

export function calculatePriceRange(
  config: CalculatorConfig,
  selectedBySectionId: Record<string, string>
): PriceResult | null {
  // Band is set by the loft_type section
  const typeSection = config.sections.find((s) => s.id === "loft_type");
  if (!typeSection) return null;

  const typeOptId = selectedBySectionId[typeSection.id];
  if (!typeOptId) return null;

  const typeOpt = typeSection.options.find((o) => o.id === typeOptId);
  const band = typeOpt?.band;
  if (!band) return null;

  const baseLow = Number(config.base_bands?.[band]?.low ?? 0);
  const baseHigh = Number(config.base_bands?.[band]?.high ?? 0);
  if (!baseLow) return null;

  // Collect all selected options
  const selectedOptions: (ConfigOption & { sectionKey: string; sectionTitle: string })[] = [];
  for (const sec of config.sections) {
    const optId = selectedBySectionId[sec.id];
    if (!optId) continue;
    const opt = sec.options.find((o) => o.id === optId);
    if (opt) selectedOptions.push({ ...opt, sectionKey: sec.sectionKey, sectionTitle: sec.title });
  }

  // Base + adders
  let subtotalLow = baseLow;
  let subtotalHigh = baseHigh;
  for (const opt of selectedOptions) {
    subtotalLow += Number(opt.adder_low || 0);
    subtotalHigh += Number(opt.adder_high || 0);
  }

  // Finish multiplier
  const finishSection = config.sections.find((s) => s.id === "finish_level");
  const finishOptId = finishSection ? selectedBySectionId[finishSection.id] : null;
  let chosenFinish = "standard";
  if (finishOptId && finishSection) {
    const fOpt = finishSection.options.find((o) => o.id === finishOptId);
    const fid = String(fOpt?.id || "").toLowerCase();
    if (fid.includes("__premium")) chosenFinish = "premium";
    else if (fid.includes("__mid")) chosenFinish = "mid";
    else chosenFinish = "standard";
  }

  const finishMult = Number(config.finish_multipliers?.[chosenFinish] ?? 1.0);
  let pricedLow = subtotalLow * finishMult;
  let pricedHigh = subtotalHigh * finishMult;

  // Risk scoring (capped per sectionKey)
  const riskByKey: Record<string, number> = {};
  for (const opt of selectedOptions) {
    const k = opt.sectionKey || "misc";
    riskByKey[k] = (riskByKey[k] || 0) + Number(opt.risk_points || 0);
  }
  const sectionCap = Number(config.risk_section_cap ?? 5);
  let riskScoreCapped = 0;
  for (const k of Object.keys(riskByKey)) {
    riskScoreCapped += Math.min(riskByKey[k], sectionCap);
  }

  const spreadPct = spreadPctFromRiskScore(riskScoreCapped);
  const highAfterSpread = Math.max(pricedHigh, pricedLow * (1 + spreadPct));

  // Minimum curiosity gap
  const gapCfg = config.gap_cfg?.[band] || { fixed: 12000, dynPct: 0.16, cap: 40000 };
  const minGap = Math.min(
    Number(gapCfg.cap),
    Math.max(Number(gapCfg.fixed), Number(gapCfg.dynPct) * pricedLow)
  );
  const highAfterGap = Math.max(highAfterSpread, pricedLow + minGap);

  // Believability cap — high cannot exceed 1.65× low
  const highCap = pricedLow * 1.65;
  const lowFinal = pricedLow;
  const highFinal = Math.min(highAfterGap, highCap);

  return {
    band,
    chosen_finish: chosenFinish,
    risk_score_capped: riskScoreCapped,
    spread_pct: spreadPct,
    flags: [],
    final_low: roundToNearest(lowFinal, 500),
    final_high: roundToNearest(highFinal, 500),
  };
}
