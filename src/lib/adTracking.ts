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

/**
 * Fire-and-forget log of a WhatsApp button click, tagged with whatever gclid (if any) is on
 * file for this visitor. `location` identifies which button was clicked (e.g. "header",
 * "sticky-bar") so Victor can see which entry point people actually use. Never throws and
 * never blocks/delays the WhatsApp link itself — logging failure should never cost a real
 * WhatsApp click.
 */
export function logWhatsAppClick(location: string): void {
  if (typeof window === "undefined") return;
  try {
    const gclid = getStoredGclid();
    const payload = JSON.stringify({
      gclid,
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
