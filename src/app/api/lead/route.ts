import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface LeadPayload {
  lead: {
    name: string;
    phone: string;
    email: string;
    postcode: string;
    start: string;
    budget: string;
    message: string;
    consent: boolean;
  };
  selections: Record<string, string>;
  pricing: { final_low: number; final_high: number } | null;
}

export async function POST(request: Request) {
  let payload: LeadPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { lead, selections, pricing } = payload;

  const priceRange = pricing
    ? `£${pricing.final_low.toLocaleString()} – £${pricing.final_high.toLocaleString()}`
    : "Not calculated";

  const selectionRows = Object.entries(selections)
    .filter(([key]) => key !== "Source")
    .map(([key, value]) => `<tr><td style="padding:4px 12px 4px 0;color:#666;">${key}</td><td style="padding:4px 0;"><strong>${value}</strong></td></tr>`)
    .join("");

  const adminHtml = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#222;">
      <h2 style="background:#1a1a1a;color:#fff;padding:20px 24px;margin:0;">New bathroom lead — Maycor</h2>
      <div style="padding:24px;">
        <h3 style="margin-top:0;">Contact details</h3>
        <table style="border-collapse:collapse;width:100%;">
          <tr><td style="padding:4px 12px 4px 0;color:#666;">Name</td><td style="padding:4px 0;"><strong>${lead.name}</strong></td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#666;">Phone</td><td style="padding:4px 0;"><strong><a href="tel:${lead.phone}">${lead.phone}</a></strong></td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#666;">Email</td><td style="padding:4px 0;"><strong><a href="mailto:${lead.email}">${lead.email}</a></strong></td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#666;">Postcode</td><td style="padding:4px 0;"><strong>${lead.postcode}</strong></td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#666;">Start</td><td style="padding:4px 0;"><strong>${lead.start}</strong></td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#666;">Budget</td><td style="padding:4px 0;"><strong>${lead.budget}</strong></td></tr>
        </table>
        ${lead.message ? `<p style="margin-top:16px;"><strong>Message:</strong><br>${lead.message}</p>` : ""}
        <hr style="margin:24px 0;border:none;border-top:1px solid #eee;">
        <h3>Estimate range</h3>
        <p style="font-size:24px;font-weight:bold;margin:0;">${priceRange}</p>
        <hr style="margin:24px 0;border:none;border-top:1px solid #eee;">
        <h3>Calculator selections</h3>
        <table style="border-collapse:collapse;width:100%;">
          ${selectionRows}
        </table>
      </div>
    </div>
  `;

  const clientHtml = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#222;">
      <h2 style="background:#1a1a1a;color:#fff;padding:20px 24px;margin:0;">Your bathroom estimate — Maycor</h2>
      <div style="padding:24px;">
        <p style="margin-top:0;">Hi ${lead.name},</p>
        <p>Thank you for submitting your bathroom estimate request. We have received it and will be in touch soon to discuss the next steps.</p>
        <hr style="margin:24px 0;border:none;border-top:1px solid #eee;">
        <h3 style="margin-top:0;">Your estimate range</h3>
        <p style="font-size:28px;font-weight:bold;margin:0 0 8px;">${priceRange}</p>
        <p style="color:#666;font-size:14px;margin:0;">Based on your selections below. A final scope is confirmed after a survey of your room.</p>
        <hr style="margin:24px 0;border:none;border-top:1px solid #eee;">
        <h3>Your selections</h3>
        <table style="border-collapse:collapse;width:100%;">
          ${selectionRows}
        </table>
        <hr style="margin:24px 0;border:none;border-top:1px solid #eee;">
        <p style="margin:0;color:#666;font-size:14px;">Maycor Building Contractors · <a href="https://maycor.co.uk" style="color:#666;">maycor.co.uk</a> · <a href="tel:+442080507057" style="color:#666;">020 8050 7057</a></p>
      </div>
    </div>
  `;

  try {
    await Promise.all([
      resend.emails.send({
        from: "Maycor Leads <leads@mail.maycor.co.uk>",
        to: "admin@maycor.co.uk",
        subject: `New bathroom lead – ${lead.name} – ${priceRange}`,
        html: adminHtml,
      }),
      resend.emails.send({
        from: "Maycor Building Contractors <leads@mail.maycor.co.uk>",
        to: lead.email,
        subject: `Your bathroom estimate – ${priceRange}`,
        html: clientHtml,
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Could not send your estimate request." },
      { status: 502 }
    );
  }
}
