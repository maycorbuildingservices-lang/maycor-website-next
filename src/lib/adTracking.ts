/**
 * gclid-based offline conversion tracking helpers.
 *
 * Why this exists (2026-09-22): the `whatsapp_click` GA4/Ads conversion action fires on the
 * WhatsApp button CLICK alone, not on a real message being sent — Smart Bidding was optimizing
 * toward a false signal for 14 days. This module captures the visitor's gclid on landing and
 * tags every WhatsApp click with it, logging each click to a small server-side log Victor can
 * review. Once Victor manually confirms (via WhatsApp Business / calls) which clicks turned
 * into real conversations, the matching gclids get uploaded to Google Ads as offline
 * conversions via `Maycor Agents/upload_offline_conversions.py` — accurate, human-verified
 * conversion data, decoupled from the on-page auto-fire event. See
 * `Maycor Campaign/README.md` (2026-09-22 entry) for the full picture.
 *
 * This is deliberately NOT used to feed Smart Bidding — the campaign now runs on Maximize
 * Clicks, which ignores conversion data entirely. This exists for Victor's own
 * decision-making clarity and for a real, human-verified offline conversion import.
 */

const GCLID_STORAGE_KEY = "maycor_gclid";
const GCLID_TS_STORAGE_KEY = "maycor_gclid_ts";
const GCLID_COOKIE_NAME = "maycor_gclid";
// 90 days matches Google Ads' offline conversion import lookback window convention.
const GCLID_MAX_AGE_DAYS = 90;

function setCookie(name: string, value: string, days: number): void {
  if (typeof document === "undefined") return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * Call once on page load (mounted in the root layout via <GclidCapture />). Reads `?gclid=`
 * from the URL if present and persists it to both a cookie and localStorage so it survives
 * across pages/sessions for up to 90 days. If no gclid is present (e.g. organic visit), this
 * intentionally does nothing and leaves any previously-stored gclid untouched — a later
 * organic-looking page view within the same session shouldn't erase a real paid click's gclid.
 */
export function captureGclid(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const gclid = params.get("gclid");
    if (!gclid) return;
    const now = new Date().toISOString();
    window.localStorage.setItem(GCLID_STORAGE_KEY, gclid);
    window.localStorage.setItem(GCLID_TS_STORAGE_KEY, now);
    setCookie(GCLID_COOKIE_NAME, gclid, GCLID_MAX_AGE_DAYS);
  } catch {
    // localStorage/cookies can throw in private/locked-down browsing modes — tracking is
    // best-effort only and must never block the page from working.
  }
}

export function getStoredGclid(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return getCookie(GCLID_COOKIE_NAME) || window.localStorage.getItem(GCLID_STORAGE_KEY);
  } catch {
    return null;
  }
}

// No 0/O, 1/I/L, 5/S, 8/B — codes are read back off a phone screen by a human.
const REF_ALPHABET = "ACDEFGHJKMNPQRTUVWXY234679";

/** A short reference code, e.g. "M7K2", that ties a WhatsApp conversation to the click that
 * started it (added 2026-09-28). */
export function makeWhatsAppRef(): string {
  let ref = "";
  for (let i = 0; i < 4; i++) ref += REF_ALPHABET[Math.floor(Math.random() * REF_ALPHABET.length)];
  return ref;
}

/** wa.me link with a pre-filled message that carries the reference code. Practitioners report
 * ~99% of people leave the code in, so each real conversation can be matched to its gclid in
 * `whatsapp_click_log.json` before being uploaded as a confirmed-lead offline conversion. */
export function whatsAppHrefWithRef(ref: string, message = "Hi Maycor, I'd like a bathroom estimate"): string {
  return `https://wa.me/447843746835?text=${encodeURIComponent(`${message} (ref ${ref})`)}`;
}

/**
 * Click handler for a tracked WhatsApp link: generates a ref code, rewrites the link's href to
 * carry it in the pre-filled message (the browser follows the href after the handler runs), and
 * logs the click with the same ref. Best-effort — if anything fails the plain link still opens.
 */
export function openTrackedWhatsApp(event: { currentTarget: HTMLAnchorElement }, location: string, message?: string): void {
  try {
    const ref = makeWhatsAppRef();
    event.currentTarget.href = whatsAppHrefWithRef(ref, message);
    logWhatsAppClick(location, ref);
  } catch {
    logWhatsAppClick(location);
  }
}

/**
 * Fire-and-forget log of a WhatsApp button click, tagged with whatever gclid (if any) is on
 * file for this visitor and the ref code sent in the pre-filled message. `location` identifies
 * which button was clicked (e.g. "header", "sticky-bar") so Victor can see which entry point
 * people actually use. Never throws and never blocks/delays the WhatsApp link itself — logging
 * failure should never cost a real WhatsApp click.
 */
export function logWhatsAppClick(location: string, ref: string | null = null): void {
  if (typeof window === "undefined") return;
  try {
    const gclid = getStoredGclid();
    const payload = JSON.stringify({
      gclid,
      ref,
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
      location,
    });
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon("/api/log-whatsapp-click", blob);
    } else {
      fetch("/api/log-whatsapp-click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // best-effort only — a logging failure must never block or delay the WhatsApp click.
  }
}
