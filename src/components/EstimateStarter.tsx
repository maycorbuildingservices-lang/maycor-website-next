"use client";

import { FormEvent, useMemo, useState } from "react";

type RoomKey = "wc" | "verySmall" | "small" | "medium" | "large";
type FinishKey = "standard" | "mid" | "premium";

type Range = {
  low: number;
  high: number;
};

const roomOptions: Array<{ key: RoomKey; label: string; hint: string }> = [
  { key: "wc", label: "WC / Cloakroom", hint: "Toilet and basin only" },
  { key: "verySmall", label: "Very small", hint: "Compact 2-3 sqm bathroom" },
  { key: "small", label: "Small", hint: "Typical 3-5 sqm bathroom" },
  { key: "medium", label: "Medium", hint: "Family bathroom scale" },
  { key: "large", label: "Large", hint: "Large or high-detail room" },
];

const finishOptions: Array<{ key: FinishKey; label: string; hint: string }> = [
  { key: "standard", label: "Standard", hint: "Practical, clean finish" },
  { key: "mid", label: "Mid-range", hint: "Better brands and details" },
  { key: "premium", label: "Premium", hint: "Higher specification" },
];

const ranges: Record<RoomKey, Record<FinishKey, Range>> = {
  wc: {
    standard: { low: 3950, high: 6150 },
    mid: { low: 4250, high: 6450 },
    premium: { low: 4550, high: 6750 },
  },
  verySmall: {
    standard: { low: 5450, high: 8450 },
    mid: { low: 6100, high: 9100 },
    premium: { low: 6650, high: 9650 },
  },
  small: {
    standard: { low: 5950, high: 9550 },
    mid: { low: 6800, high: 10600 },
    premium: { low: 7300, high: 11100 },
  },
  medium: {
    standard: { low: 7550, high: 12250 },
    mid: { low: 8700, high: 13500 },
    premium: { low: 9450, high: 14250 },
  },
  large: {
    standard: { low: 9750, high: 15750 },
    mid: { low: 11300, high: 17300 },
    premium: { low: 12300, high: 18300 },
  },
};

function formatGBP(value: number) {
  return value.toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  });
}

export function EstimateStarter() {
  const [room, setRoom] = useState<RoomKey>("small");
  const [finish, setFinish] = useState<FinishKey>("standard");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const selectedRange = ranges[room][finish];
  const roomLabel = roomOptions.find((option) => option.key === room)?.label || "";
  const finishLabel = finishOptions.find((option) => option.key === finish)?.label || "";

  const rangeText = useMemo(
    () => `${formatGBP(selectedRange.low)} - ${formatGBP(selectedRange.high)}`,
    [selectedRange.high, selectedRange.low]
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = new FormData(event.currentTarget);
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
        "Room size": roomLabel,
        "Finish level": finishLabel,
      },
      pricing: {
        final_low: selectedRange.low,
        final_high: selectedRange.high,
      },
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
    <section className="estimate-panel" id="estimate" aria-labelledby="estimate-heading">
      <div className="estimate-copy">
        <p className="eyebrow">Bathroom estimate starter</p>
        <h2 id="estimate-heading">See the range before you book the survey.</h2>
        <p>
          Start with the two choices that shape the budget fastest. Then send your details
          for a fuller breakdown and a sensible next step.
        </p>
      </div>

      <div className="estimate-builder">
        <div className="choice-group" aria-label="Choose room size">
          <span className="choice-title">Room size</span>
          <div className="choice-grid room-grid">
            {roomOptions.map((option) => (
              <button
                className={option.key === room ? "choice-card active" : "choice-card"}
                key={option.key}
                type="button"
                onClick={() => setRoom(option.key)}
              >
                <span>{option.label}</span>
                <small>{option.hint}</small>
              </button>
            ))}
          </div>
        </div>

        <div className="choice-group" aria-label="Choose finish level">
          <span className="choice-title">Finish level</span>
          <div className="choice-grid finish-grid">
            {finishOptions.map((option) => (
              <button
                className={option.key === finish ? "choice-card active" : "choice-card"}
                key={option.key}
                type="button"
                onClick={() => setFinish(option.key)}
              >
                <span>{option.label}</span>
                <small>{option.hint}</small>
              </button>
            ))}
          </div>
        </div>

        <div className="range-strip">
          <span>Estimated range</span>
          <strong>{rangeText}</strong>
          <small>Includes labour, materials, sanitaryware, fixtures, fittings and waste removal.</small>
        </div>

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
          <button className="primary-button wide" type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Sending..." : "Get full breakdown"}
          </button>
          {message ? <p className={`form-message ${status}`}>{message}</p> : null}
        </form>
      </div>
    </section>
  );
}
