"use client";

import { FormEvent, useMemo, useState } from "react";
import calculatorConfig from "@/lib/calculator/config.json";
import { calculatePriceRange, formatGBP } from "@/lib/calculator/engine";

type CalculatorOption = {
  id: string;
  label: string;
  desc?: string;
  marker?: string;
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
const roomSection = config.sections.find((section) => section.id === "room_size");
const finishSection = config.sections.find((section) => section.id === "finish_level");
const smallRoomId =
  roomSection?.options.find((option) => option.id.includes("small_3_5"))?.id ||
  roomSection?.options[0]?.id ||
  "";

function createInitialSelections() {
  const selections: Record<string, string> = {};

  for (const section of config.sections) {
    if (section.defaultOptionId) {
      selections[section.id] = section.defaultOptionId;
    }
  }

  if (smallRoomId) {
    selections.room_size = smallRoomId;
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

export function EstimateStarter() {
  const [selected, setSelected] = useState<Record<string, string>>(createInitialSelections);
  const [isExpanded, setIsExpanded] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const price = useMemo(() => calculatePriceRange(config, selected), [selected]);
  const detailedSections = config.sections.filter(
    (section) => section.id !== "room_size" && section.id !== "finish_level"
  );

  const rangeText = price
    ? `${formatGBP(price.final_low)} - ${formatGBP(price.final_high)}`
    : "Select a room size";

  function selectOption(sectionId: string, optionId: string, shouldExpand = false) {
    setSelected((current) => ({ ...current, [sectionId]: optionId }));
    if (shouldExpand) {
      setIsExpanded(true);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = new FormData(event.currentTarget);
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
      setMessage("Thank you. Your estimate request has been sent to Maycor.");
      event.currentTarget.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Could not send your request.");
    }
  }

  return (
    <section
      className={isExpanded ? "estimate-panel calculator-expanded" : "estimate-panel"}
      id="estimate"
      aria-labelledby="estimate-heading"
    >
      <div className="estimate-copy">
        <p className="eyebrow">Bathroom estimate starter</p>
        <h2 id="estimate-heading">See the range before you book the survey.</h2>
        <p>
          Start compact. Click any room or finish card and the full calculator opens
          so you can refine the range in more detail.
        </p>
      </div>

      <div className="estimate-builder">
        {roomSection ? (
          <div className="choice-group" aria-label="Choose room size">
            <span className="choice-title">Room size</span>
            <div className="choice-grid room-grid">
              {roomSection.options.map((option) => (
                <button
                  className={selected.room_size === option.id ? "choice-card active" : "choice-card"}
                  key={option.id}
                  type="button"
                  onClick={() => selectOption(roomSection.id, option.id, true)}
                >
                  <span>{option.label}</span>
                  {option.desc ? <small>{option.desc}</small> : null}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {finishSection ? (
          <div className="choice-group" aria-label="Choose finish level">
            <span className="choice-title">Finish level</span>
            <div className="choice-grid finish-grid">
              {finishSection.options.map((option) => (
                <button
                  className={
                    selected.finish_level === option.id ? "choice-card active" : "choice-card"
                  }
                  key={option.id}
                  type="button"
                  onClick={() => selectOption(finishSection.id, option.id, true)}
                >
                  <span>{option.label}</span>
                  {option.desc ? <small>{option.desc}</small> : null}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <div className="range-strip">
          <span>Estimated range</span>
          <strong>{rangeText}</strong>
          <small>Includes labour, materials, sanitaryware, fixtures, fittings and waste removal.</small>
        </div>

        {isExpanded ? (
          <div className="full-calculator" aria-label="Full bathroom calculator">
            <div className="full-calculator-header">
              <p className="eyebrow">Full calculator opened</p>
              <h3>Find out your renovation range in under 3 minutes.</h3>
              <p>
                Answer the key questions and watch your estimate update as the room
                becomes clearer.
              </p>
            </div>

            {detailedSections.map((section) => (
              <section className="detail-section" key={section.id}>
                <div className="detail-heading">
                  <h4>{section.title}</h4>
                  {section.helper ? <p>{section.helper}</p> : null}
                </div>
                <div className={`detail-options ${section.layout === "row" ? "row" : "tile"}`}>
                  {section.options.map((option) => (
                    <button
                      className={
                        selected[section.id] === option.id ? "detail-card active" : "detail-card"
                      }
                      key={option.id}
                      type="button"
                      onClick={() => selectOption(section.id, option.id)}
                    >
                      <span className="detail-card-top">
                        <strong>{option.label}</strong>
                        {markerLabel(option.marker) ? <em>{markerLabel(option.marker)}</em> : null}
                      </span>
                      {option.desc ? <small>{option.desc}</small> : null}
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : null}

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
            {status === "loading" ? "Sending..." : "Get full breakdown"}
          </button>
          {message ? <p className={`form-message ${status}`}>{message}</p> : null}
        </form>
      </div>
    </section>
  );
}
