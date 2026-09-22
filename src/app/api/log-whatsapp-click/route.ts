import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ClickPayload {
  gclid: string | null;
  timestamp: string;
  page: string;
  location: string;
}

/**
 * Logs a WhatsApp button click for later offline-conversion review. Vercel serverless
 * functions have no persistent filesystem, so this can't write a local JSON/CSV file directly
 * from here — instead it emails a single, machine-parseable log line to the same Gmail inbox
 * the rest of the Maycor Agents automation already uses. `Maycor Agents/sync_whatsapp_click_log.py`
 * reads that inbox and appends new entries into a local, reviewable JSON log at
 * `Maycor Campaign/whatsapp_click_log.json`. See that script and
 * `Maycor Agents/upload_offline_conversions.py` for the rest of the pipeline.
 *
 * Deliberately fire-and-forget from the client (sendBeacon/fetch keepalive) — this route must
 * never block or delay the actual WhatsApp link, so failures here are logged, not surfaced.
 */
export async function POST(request: Request) {
  let payload: ClickPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { gclid, timestamp, page, location } = payload;

  // Fixed, greppable marker line so the sync script's regex never has to touch email HTML.
  const logLine = `WHATSAPP_CLICK_LOG_V1 ${JSON.stringify({ gclid: gclid || null, timestamp, page, location })}`;

  try {
    await resend.emails.send({
      from: "Maycor Tracking <leads@mail.maycor.co.uk>",
      to: "maycorbuildingservices@gmail.com",
      subject: `WhatsApp click${gclid ? " (paid, has gclid)" : " (no gclid — likely organic/direct)"}`,
      text: `${logLine}\n\nPage: ${page}\nButton: ${location}\nTime: ${timestamp}\ngclid: ${gclid || "(none)"}\n`,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("log-whatsapp-click: failed to send log email", err);
    // Still 200 — this is a best-effort log, not a critical path for the visitor.
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
