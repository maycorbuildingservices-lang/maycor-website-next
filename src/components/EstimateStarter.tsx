"use client";

import { FormEvent, PointerEvent, useEffect, useMemo, useRef, useState } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
import calculatorConfig from "@/lib/calculator/config.json";
import { calculatePriceRange, formatGBP } from "@/lib/calculator/engine";

type CalculatorOption = {
  id: string;
  label: string;
  desc?: string;
  marker?: string;
  risk_points?: number;
  finish_points?: number;
  is_premium_anchor?: boolean;
  adder_low?: number;
  adder_high?: number;
};

type CalculatorSection = {
  id: string;
  title: string;
  mainSection?: string;
  layout?: "tile" | "row";
  helper?: string;
  defaultOptionId?: string | null;
  options: CalculatorOption[];
};

type CalculatorConfig = {
  sections: CalculatorSection[];
};

const config = calculatorConfig as unknown as CalculatorConfig;
const storageKey = "maycor-bathroom-estimate-state";
const roomSection = config.sections.find((section) => section.id === "room_size");
const finishSection = config.sections.find((section) => section.id === "finish_level");
const wcRoomId =
  roomSection?.options.find((option) => option.id.includes("wc_cloakroom"))?.id ||
  roomSection?.options[0]?.id ||
  "";
const standardFinishId =
  finishSection?.options.find((option) => option.id.includes("__standard"))?.id ||
  finishSection?.options[0]?.id ||
  "";
const bathSection = config.sections.find((section) => section.id === "bath");
const showerSection = config.sections.find((section) => section.id === "shower");
const safeBathId =
  bathSection?.options.find((option) => option.id.includes("no_bath"))?.id ||
  bathSection?.defaultOptionId ||
  "";
const safeShowerId =
  showerSection?.options.find((option) => option.id.includes("no_shower"))?.id ||
  showerSection?.defaultOptionId ||
  "";
const wcRestrictedNotice = "Not usually selected in a WC layout.";

function optionMinimalScore(option: CalculatorOption) {
  return (
    Number(option.adder_low ?? 0) +
    Number(option.adder_high ?? 0) +
    Number(option.risk_points ?? 0) * 250 +
    Number(option.finish_points ?? 0) * 150 +
    (option.is_premium_anchor ? 500 : 0)
  );
}

function minimalOption(section: CalculatorSection) {
  return section.options.reduce<CalculatorOption | null>((best, option) => {
    if (!best) return option;
    return optionMinimalScore(option) < optionMinimalScore(best) ? option : best;
  }, null);
}

function createInitialSelections() {
  const selections: Record<string, string> = {};

  for (const section of config.sections) {
    const option = minimalOption(section);
    if (option) {
      selections[section.id] = option.id;
    }
  }

  if (wcRoomId) {
    selections.room_size = wcRoomId;
  }

  if (standardFinishId) {
    selections.finish_level = standardFinishId;
  }

  return selections;
}

function markerLabel(marker?: string) {
  if (!marker || marker === "None") return "";
  return marker;
}

function selectedLabel(section: CalculatorSection, selected: Record<string, string>) {
  const option = section.options.find((item) => item.id === selected[section.id]);
  return option?.label || "";
}

function choiceCardClass(isActive: boolean) {
  return isActive ? "choice-card active" : "choice-card";
}

function isWcRestrictedOption(sectionId: string, optionId: string) {
  if (sectionId === "bath") {
    return optionId !== safeBathId;
  }

  if (sectionId === "shower") {
    return optionId !== safeShowerId;
  }

  return false;
}

function sanitizeWcSelections(selections: Record<string, string>) {
  if (selections.room_size !== wcRoomId) {
    return selections;
  }

  const next = { ...selections };

  if (safeBathId) {
    next.bath = safeBathId;
  }

  if (safeShowerId) {
    next.shower = safeShowerId;
  }

  return next;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function restoreValidSelections(saved: unknown) {
  const selections = createInitialSelections();
  if (!isRecord(saved)) return selections;

  for (const section of config.sections) {
    const savedOptionId = saved[section.id];
    if (
      typeof savedOptionId === "string" &&
      section.options.some((option) => option.id === savedOptionId)
    ) {
      selections[section.id] = savedOptionId;
    }
  }

  return sanitizeWcSelections(selections);
}

function readSavedEstimateState() {
  if (typeof window === "undefined") return null;

  try {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) return null;

    const parsed: unknown = JSON.parse(saved);
    if (!isRecord(parsed)) return null;

    return {
      selected: restoreValidSelections(parsed.selected),
      isExpanded: typeof parsed.isExpanded === "boolean" ? parsed.isExpanded : false,
    };
  } catch {
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      // Ignore storage cleanup failures in restricted browser modes.
    }

    return null;
  }
}

function persistEstimateState(selected: Record<string, string>, isExpanded: boolean) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(
      storageKey,
      JSON.stringify({
        selected,
        isExpanded,
        updatedAt: new Date().toISOString(),
      })
    );
  } catch {
    // Browsers can block local storage in private or restricted modes.
  }
}

type SectionRenderItem =
  | { kind: "header"; title: string }
  | { kind: "section"; data: CalculatorSection };

const sectionRenderItems = ((): SectionRenderItem[] => {
  const items: SectionRenderItem[] = [];
  let lastMainSection = "";
  for (const section of config.sections) {
    if (section.id === "room_size" || section.id === "finish_level") continue;
    if (section.mainSection && section.mainSection !== lastMainSection) {
      items.push({ kind: "header", title: section.mainSection });
      lastMainSection = section.mainSection;
    }
    items.push({ kind: "section", data: section as CalculatorSection });
  }
  return items;
})();

export function EstimateStarter() {
  const [selected, setSelected] = useState<Record<string, string>>(createInitialSelections);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [blockedCardKey, setBlockedCardKey] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [hasRestoredSavedState, setHasRestoredSavedState] = useState(false);
  const lastTouchActivation = useRef(0);

  const price = useMemo(() => calculatePriceRange(config, selected), [selected]);

  const rangeText = price
    ? `${formatGBP(price.final_low)} - ${formatGBP(price.final_high)}`
    : "Estimate ready";

  useEffect(() => {
    const restoreTimer = window.setTimeout(() => {
      const saved = readSavedEstimateState();
      if (saved) {
        setSelected(saved.selected);
        setIsExpanded(saved.isExpanded);
      }

      setHasRestoredSavedState(true);
    }, 0);

    return () => window.clearTimeout(restoreTimer);
  }, []);

  useEffect(() => {
    if (!blockedCardKey) return;

    const clearTimer = window.setTimeout(() => setBlockedCardKey(null), 1400);
    return () => window.clearTimeout(clearTimer);
  }, [blockedCardKey]);

  useEffect(() => {
    if (!hasRestoredSavedState) return;

    persistEstimateState(selected, isExpanded);
  }, [hasRestoredSavedState, isExpanded, selected]);

  function selectOption(sectionId: string, optionId: string, shouldExpand = false) {
    const isWcLayout = selected.room_size === wcRoomId;
    if (isWcLayout && isWcRestrictedOption(sectionId, optionId)) {
      setBlockedCardKey(`${sectionId}:${optionId}`);
      return;
    }

    setSelected((current) => {
      const next = { ...current, [sectionId]: optionId };

      if (sectionId === "room_size" && optionId === wcRoomId) {
        return sanitizeWcSelections(next);
      }

      return next;
    });
    if (shouldExpand) {
      setIsExpanded(true);
    }
  }

  function collapseCalculator() {
    persistEstimateState(selected, false);
    setIsExpanded(false);
    setShowLeadForm(false);
    setBlockedCardKey(null);
    window.requestAnimationFrame(() => {
      document.getElementById("estimate")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function expandCalculator() {
    setIsExpanded(true);
  }

  function tapBridge(action: () => void) {
    return {
      onPointerUp(event: PointerEvent<HTMLButtonElement | HTMLAnchorElement>) {
        if (event.pointerType !== "touch") return;
        lastTouchActivation.current = Date.now();
        action();
      },
      onClick() {
        if (Date.now() - lastTouchActivation.current < 700) return;
        action();
      },
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const formEl = event.currentTarget;
    const form = new FormData(formEl);
    const selections = Object.fromEntries(
      config.sections.map((section) => [section.title, selectedLabel(section, selected)])
    );

    const payload = {
      lead: {
        name: String(form.get("name") || "").trim(),
        phone: String(form.get("phone") || "").trim(),
        email: String(form.get("email") || "").trim(),
        postcode: String(form.get("postcode") || "").trim(),
        start: String(form.get("start") || "").trim(),
        budget: String(form.get("budget") || "").trim(),
        message: String(form.get("message") || "").trim(),
        consent: Boolean(form.get("consent")),
      },
      selections: {
        Source: "Next.js bathroom renovations landing page",
        ...selections,
      },
      pricing: price,
    };

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error || "Could not send your request.");

      setStatus("success");
      setMessage("Thank you for submitting your estimate request. We will be in touch soon.");
      formEl.reset();
      if (typeof window.gtag === "function") {
        window.gtag("event", "generate_lead", { currency: "GBP" });
      }
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Could not send your request.");
    }
  }

  return (
    <>
      <section
        className={isExpanded ? "estimate-panel calculator-expanded" : "estimate-panel calculator-compact"}
        id="estimate"
        aria-labelledby="estimate-heading"
      >
        <div className="estimate-copy">
          <p className="eyebrow">Bathroom estimate starter</p>
          <h2 id="estimate-heading">
            <span className="estimate-highlight">Get your bathroom cost in under 3 minutes.</span>
          </h2>
        </div>

        <div className="estimate-builder">
        {isExpanded ? (
          <div className="calculator-prompt">
            <div className="calculator-prompt-copy">
              <h3>Find out your bathroom renovation cost in under 3 minutes.</h3>
              <p>
                Answer the key questions and watch your estimate update as the room
                becomes clearer.
              </p>
            </div>
          </div>
        ) : null}

        {roomSection ? (
          <div className="choice-group" aria-label="Choose room size">
            <span className="choice-title">Room size</span>
            {isExpanded ? (
              <div className="choice-grid room-grid">
                  {roomSection.options.map((option) => (
                    <button
                      className={choiceCardClass(selected.room_size === option.id)}
                      key={option.id}
                      type="button"
                      {...tapBridge(() => selectOption(roomSection.id, option.id))}
                    >
                    <span>{option.label}</span>
                    {option.desc ? <small>{option.desc}</small> : null}
                  </button>
                ))}
              </div>
            ) : (
              <div className="room-choice-stack">
                <div className="choice-grid room-grid room-grid-top">
                  {roomSection.options.slice(0, 3).map((option) => (
                    <button
                      className={choiceCardClass(selected.room_size === option.id)}
                      key={option.id}
                      type="button"
                      {...tapBridge(() => selectOption(roomSection.id, option.id))}
                    >
                      <span>{option.label}</span>
                      {option.desc ? <small>{option.desc}</small> : null}
                    </button>
                  ))}
                </div>
                <div className="choice-grid room-grid room-grid-bottom">
                  {roomSection.options.slice(3).map((option) => (
                    <button
                      className={choiceCardClass(selected.room_size === option.id)}
                      key={option.id}
                      type="button"
                      {...tapBridge(() => selectOption(roomSection.id, option.id))}
                    >
                      <span>{option.label}</span>
                      {option.desc ? <small>{option.desc}</small> : null}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : null}

        {finishSection ? (
          <div className="choice-group" aria-label="Choose finish level">
            <span className="choice-title">Finish level</span>
            <div className="choice-grid finish-grid">
              {finishSection.options.map((option) => (
                <button
                  className={choiceCardClass(selected.finish_level === option.id)}
                  key={option.id}
                  type="button"
                  {...tapBridge(() => selectOption(finishSection.id, option.id))}
                >
                  <span>{option.label}</span>
                  {option.desc ? <small>{option.desc}</small> : null}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {!isExpanded ? (
          <div className="range-strip">
            <button className="range-expand-button" type="button" {...tapBridge(expandCalculator)}>
              Expand calculator
            </button>
            <span>Estimated range</span>
            <strong>{rangeText}</strong>
            <small>Includes labour, materials, sanitaryware, fixtures, fittings and waste removal.</small>
          </div>
        ) : null}

        {isExpanded ? (
          <div className="full-calculator" aria-label="Full bathroom calculator">
            {sectionRenderItems.map((item) =>
              item.kind === "header" ? (
                <div className="section-group-header" key={`header-${item.title}`}>
                  <span>{item.title}</span>
                </div>
              ) : (
                <section className="detail-section" key={item.data.id} data-section-id={item.data.id}>
                  <div className="detail-heading">
                    <h4>{item.data.title}</h4>
                    {item.data.helper ? <p>{item.data.helper}</p> : null}
                  </div>
                  <div className={`detail-options ${item.data.layout === "row" ? "row" : "tile"}`}>
                    {item.data.options.map((option) => {
                      const wcFlash = blockedCardKey === `${item.data.id}:${option.id}`;

                      return (
                        <button
                          className={
                            [
                              selected[item.data.id] === option.id ? "detail-card active" : "detail-card",
                              wcFlash ? "wc-locked--flash" : "",
                            ]
                              .filter(Boolean)
                              .join(" ")
                          }
                          key={option.id}
                          type="button"
                          {...tapBridge(() => selectOption(item.data.id, option.id))}
                        >
                          <span className="detail-card-top">
                            <strong>{option.label}</strong>
                            {markerLabel(option.marker) ? <em>{markerLabel(option.marker)}</em> : null}
                          </span>
                          {option.desc ? <small>{option.desc}</small> : null}
                          {wcFlash ? <span className="wc-lock-overlay">{wcRestrictedNotice}</span> : null}
                        </button>
                      );
                    })}
                  </div>
                </section>
              )
            )}

            <div className="breakdown-gate">
              <div>
                <span>Ready for the full breakdown?</span>
                <p>Next step: enter your details and Maycor can send the estimate breakdown.</p>
              </div>
              <button
                className="primary-button"
                type="button"
                aria-expanded={showLeadForm}
                {...tapBridge(() => setShowLeadForm((current) => !current))}
              >
                {showLeadForm ? "Hide Details Form" : "Get Full Breakdown"}
              </button>
            </div>
          </div>
        ) : null}

        {showLeadForm ? (
          <form className="lead-form" onSubmit={handleSubmit}>
            <label>
              Full name*
              <input name="name" autoComplete="name" required />
            </label>
            <label>
              Phone*
              <input name="phone" autoComplete="tel" required />
            </label>
            <label>
              Email*
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              Postcode*
              <input name="postcode" autoComplete="postal-code" required />
            </label>
            <label>
              Preferred start*
              <select name="start" required defaultValue="">
                <option value="" disabled>
                  Select
                </option>
                <option>ASAP</option>
                <option>1-2 months</option>
                <option>3+ months</option>
                <option>Just planning</option>
              </select>
            </label>
            <label>
              Budget comfort*
              <select name="budget" required defaultValue="">
                <option value="" disabled>
                  Select
                </option>
                <option>Under £8k</option>
                <option>£8-12k</option>
                <option>£12-18k</option>
                <option>£18-25k</option>
                <option>£25k+</option>
              </select>
            </label>
            <label className="wide">
              Notes
              <textarea name="message" rows={3} placeholder="Tell us what you want to change." />
            </label>
            <label className="wide consent-row">
              <input name="consent" type="checkbox" required /> I agree to be contacted about my
              bathroom estimate.
            </label>
            <button className="primary-button wide" type="submit" disabled={!price || status === "loading"}>
              {status === "loading" ? "Sending..." : "Email me the full breakdown"}
            </button>
            {message ? <p className={`form-message ${status}`}>{message}</p> : null}
          </form>
        ) : null}
        </div>
      </section>

      <div className="sticky-estimate-bar" aria-live="polite">
        <div>
          <span>Estimated range</span>
          <strong>{rangeText}</strong>
          <small>Includes labour, materials, sanitaryware, fixtures, fittings and waste removal.</small>
        </div>
        <div className="sticky-actions">
          <a href="https://wa.me/447843746835" target="_blank" rel="noreferrer" className="sticky-whatsapp">WhatsApp us</a>
          <a href="#estimate">Adjust My Estimate</a>
          {isExpanded ? (
            <button type="button" {...tapBridge(collapseCalculator)}>
              Compact calculator
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}
