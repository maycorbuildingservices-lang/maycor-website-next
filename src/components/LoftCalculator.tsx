"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import config from "@/lib/loft-calculator/config.json";
import { calculatePriceRange, formatGBP } from "@/lib/loft-calculator/engine";
import type { CalculatorConfig, PriceResult } from "@/lib/loft-calculator/engine";

const cfg = config as CalculatorConfig;

const STORAGE_KEY = "loft-calc-st-albans-v1";

function buildDefaults(): Record<string, string> {
  const defaults: Record<string, string> = {};
  for (const sec of cfg.sections) {
    if (sec.defaultOptionId) {
      defaults[sec.id] = sec.defaultOptionId;
    }
  }
  return defaults;
}

function loadFromStorage(): Record<string, string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...buildDefaults(), ...JSON.parse(raw) };
  } catch {
    // ignore
  }
  return buildDefaults();
}

function saveToStorage(sel: Record<string, string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sel));
  } catch {
    // ignore
  }
}

function buildSelectionLabels(sel: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const sec of cfg.sections) {
    const optId = sel[sec.id];
    if (!optId) continue;
    const opt = sec.options.find((o) => o.id === optId);
    if (opt) out[sec.title] = opt.label;
  }
  return out;
}

// Group sections by mainSection, skip loft_type and finish_level (handled compactly)
const COMPACT_SECTION_IDS = new Set(["loft_type", "finish_level"]);

function groupedSections() {
  const groups: Record<string, typeof cfg.sections> = {};
  for (const sec of cfg.sections) {
    if (COMPACT_SECTION_IDS.has(sec.id)) continue;
    if (!groups[sec.mainSection]) groups[sec.mainSection] = [];
    groups[sec.mainSection].push(sec);
  }
  return groups;
}

interface LeadForm {
  name: string;
  phone: string;
  email: string;
  postcode: string;
  start: string;
  budget: string;
  message: string;
  consent: boolean;
}

const EMPTY_FORM: LeadForm = {
  name: "",
  phone: "",
  email: "",
  postcode: "",
  start: "",
  budget: "",
  message: "",
  consent: false,
};

export function LoftCalculator() {
  const [selections, setSelections] = useState<Record<string, string>>(buildDefaults);
  const [expanded, setExpanded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<LeadForm>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [formMsg, setFormMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelections(loadFromStorage());
  }, []);

  useEffect(() => {
    saveToStorage(selections);
  }, [selections]);

  const pricing: PriceResult | null = calculatePriceRange(cfg, selections);

  const select = useCallback((sectionId: string, optionId: string) => {
    setSelections((prev) => ({ ...prev, [sectionId]: optionId }));
  }, []);

  const loftTypeSection = cfg.sections.find((s) => s.id === "loft_type")!;
  const finishSection = cfg.sections.find((s) => s.id === "finish_level")!;
  const groups = groupedSections();

  const handleShowForm = () => {
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const value = target.type === "checkbox" ? (target as HTMLInputElement).checked : target.value;
    setForm((prev) => ({ ...prev, [target.name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) {
      setFormMsg({ type: "error", text: "Please tick the consent box to continue." });
      return;
    }
    setSubmitting(true);
    setFormMsg(null);
    try {
      const res = await fetch("/api/loft-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead: form,
          selections: buildSelectionLabels(selections),
          pricing,
        }),
      });
      if (res.ok) {
        setFormMsg({
          type: "success",
          text: "Thank you — Victor will be in touch within a few hours.",
        });
        setForm(EMPTY_FORM);
      } else {
        setFormMsg({ type: "error", text: "Something went wrong. Please call us directly." });
      }
    } catch {
      setFormMsg({ type: "error", text: "Something went wrong. Please call us directly." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className={`estimate-panel${expanded ? " calculator-expanded" : ""}`} id="estimate">
        <div className="estimate-copy">
          <p className="eyebrow">Free Online Estimate</p>
          <h2>
            Get your <em style={{ fontStyle: "normal" }}>instant estimate</em>
          </h2>
          <p>
            Select your conversion type and finish — see a realistic price range before you speak to
            anyone.
          </p>
        </div>

        <div className="estimate-builder">
          <div className="calc-title">
            <h3>Loft conversion cost calculator</h3>
            <p>St Albans &amp; Harpenden — 2026 prices</p>
          </div>

          <span className="choice-title">Conversion type</span>
          <div className="type-grid">
            {loftTypeSection.options.map((opt) => (
              <button
                key={opt.id}
                className={`choice-card${selections[loftTypeSection.id] === opt.id ? " active" : ""}`}
                onClick={() => select(loftTypeSection.id, opt.id)}
                type="button"
              >
                <span>{opt.label}</span>
                <small>{opt.marker}</small>
              </button>
            ))}
          </div>

          <span className="choice-title" style={{ display: "block", marginTop: 16 }}>
            Finish level
          </span>
          <div className="finish-grid">
            {finishSection.options.map((opt) => (
              <button
                key={opt.id}
                className={`choice-card${selections[finishSection.id] === opt.id ? " active" : ""}`}
                onClick={() => select(finishSection.id, opt.id)}
                type="button"
              >
                <span>{opt.label}</span>
                <small>{opt.marker}</small>
              </button>
            ))}
          </div>

          {pricing && (
            <div className="range-strip">
              <span>Estimated cost range (excl. VAT)</span>
              <strong>
                {formatGBP(pricing.final_low)} – {formatGBP(pricing.final_high)}
              </strong>
              <small>Indicative estimate. Includes labour and materials. Excludes VAT (20%).</small>
              {!expanded && (
                <button
                  className="range-expand-button"
                  onClick={() => setExpanded(true)}
                  type="button"
                >
                  Refine estimate ↓
                </button>
              )}
            </div>
          )}

          {expanded && (
            <div className="full-calculator">
              {Object.entries(groups).map(([groupName, sections]) => (
                <div key={groupName}>
                  <div className="section-group-header">
                    <span>{groupName}</span>
                  </div>
                  {sections.map((sec) => (
                    <div className="detail-section" key={sec.id}>
                      <div className="detail-heading">
                        <h4>{sec.title}</h4>
                        <p>{sec.helper}</p>
                      </div>
                      <div className={`detail-options ${sec.layout === "tile" ? "tile" : "row"}`}>
                        {sec.options.map((opt) => (
                          <button
                            key={opt.id}
                            className={`detail-card${selections[sec.id] === opt.id ? " active" : ""}`}
                            onClick={() => select(sec.id, opt.id)}
                            type="button"
                          >
                            <div className="detail-card-top">
                              <strong>{opt.label}</strong>
                              <em>{opt.marker}</em>
                            </div>
                            <small>{opt.desc}</small>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              {!showForm && (
                <div className="breakdown-gate">
                  <div>
                    <span>Get your detailed estimate</span>
                    <p>
                      Enter your details and we will send you a full cost breakdown along with next
                      steps.
                    </p>
                  </div>
                  <button className="primary-button" onClick={handleShowForm} type="button">
                    Get my estimate →
                  </button>
                </div>
              )}
            </div>
          )}

          {showForm && (
            <div ref={formRef}>
              <form className="lead-form" onSubmit={handleSubmit} noValidate>
                <label>
                  Name *
                  <input name="name" value={form.name} onChange={handleFormChange} required placeholder="Your full name" />
                </label>
                <label>
                  Phone *
                  <input name="phone" value={form.phone} onChange={handleFormChange} required type="tel" placeholder="07xxx xxxxxx" />
                </label>
                <label>
                  Email *
                  <input name="email" value={form.email} onChange={handleFormChange} required type="email" placeholder="you@example.com" />
                </label>
                <label>
                  Postcode *
                  <input name="postcode" value={form.postcode} onChange={handleFormChange} required placeholder="AL1 1AB" />
                </label>
                <label>
                  When do you want to start?
                  <select name="start" value={form.start} onChange={handleFormChange}>
                    <option value="">Select…</option>
                    <option>As soon as possible</option>
                    <option>Within 3 months</option>
                    <option>3–6 months</option>
                    <option>6–12 months</option>
                    <option>Planning / researching</option>
                  </select>
                </label>
                <label>
                  Budget
                  <select name="budget" value={form.budget} onChange={handleFormChange}>
                    <option value="">Select…</option>
                    <option>Under £30k</option>
                    <option>£30k–£60k</option>
                    <option>£60k–£100k</option>
                    <option>£100k–£150k</option>
                    <option>£150k+</option>
                  </select>
                </label>
                <label className="wide">
                  Message (optional)
                  <textarea name="message" value={form.message} onChange={handleFormChange} rows={3} placeholder="Tell us a bit about your project…" />
                </label>
                <div className="wide consent-row">
                  <input type="checkbox" name="consent" id="loft-calc-consent" checked={form.consent} onChange={handleFormChange} />
                  <label htmlFor="loft-calc-consent" style={{ fontWeight: 400, fontSize: 13 }}>
                    I agree to Maycor contacting me about my enquiry. We will never share your details.
                  </label>
                </div>
                {formMsg && <p className={`form-message ${formMsg.type}`}>{formMsg.text}</p>}
                <button className="primary-button wide" type="submit" disabled={submitting} style={{ marginTop: 4 }}>
                  {submitting ? "Sending…" : "Send my estimate →"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {pricing && (
        <div className="sticky-estimate-bar">
          <div>
            <span>Your loft estimate</span>
            <strong>
              {formatGBP(pricing.final_low)} – {formatGBP(pricing.final_high)}
            </strong>
            <small>Excl. VAT · Indicative</small>
          </div>
          <div className="sticky-actions">
            <a
              href="https://wa.me/447843746835?text=Hi%2C%20I%27d%20like%20a%20loft%20conversion%20estimate"
              className="sticky-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            <a href="#estimate">Refine →</a>
            <button onClick={handleShowForm} type="button">
              Get estimate
            </button>
          </div>
        </div>
      )}
    </>
  );
}
