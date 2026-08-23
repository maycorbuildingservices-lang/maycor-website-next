import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface DentalLeadPayload {
  lead: {
    name: string;
    phone: string;
    email: string;
    practiceName: string;
    surgeries: string;
    projectType: string;
    message: string;
    consent: boolean;
  };
}

export async function POST(request: Request) {
  let payload: DentalLeadPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { lead } = payload;

  const adminHtml = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#222;">
      <h2 style="background:#1a1a1a;color:#fff;padding:20px 24px;margin:0;">New dental practice lead — Maycor</h2>
      <div style="padding:24px;">
        <h3 style="margin-top:0;">Contact details</h3>
        <table style="border-collapse:collapse;width:100%;">
          <tr><td style="padding:4px 12px 4px 0;color:#666;">Name</td><td style="padding:4px 0;"><strong>${lead.name}</strong></td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#666;">Phone</td><td style="padding:4px 0;"><strong><a href="tel:${lead.phone}">${lead.phone}</a></strong></td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#666;">Email</td><td style="padding:4px 0;"><strong><a href="mailto:${lead.email}">${lead.email}</a></strong></td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#666;">Practice name</td><td style="padding:4px 0;"><strong>${lead.practiceName}</strong></td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#666;">Surgeries</td><td style="padding:4px 0;"><strong>${lead.surgeries}</strong></td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#666;">Project type</td><td style="padding:4px 0;"><strong>${lead.projectType}</strong></td></tr>
        </table>
        ${lead.message ? `<p style="margin-top:16px;"><strong>Message:</strong><br>${lead.message}</p>` : ""}
      </div>
    </div>
  `;

  const clientHtml = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#222;">
      <h2 style="background:#1a1a1a;color:#fff;padding:20px 24px;margin:0;">Your enquiry — Maycor Dental Practice Refurbishment</h2>
      <div style="padding:24px;">
        <p style="margin-top:0;">Hi ${lead.name},</p>
        <p>Thank you for your enquiry about ${lead.practiceName}. We have received the details below and will be in touch soon to arrange a feasibility survey.</p>
        <hr style="margin:24px 0;border:none;border-top:1px solid #eee;">
        <table style="border-collapse:collapse;width:100%;">
          <tr><td style="padding:4px 12px 4px 0;color:#666;">Surgeries</td><td style="padding:4px 0;"><strong>${lead.surgeries}</strong></td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#666;">Project type</td><td style="padding:4px 0;"><strong>${lead.projectType}</strong></td></tr>
        </table>
        <hr style="margin:24px 0;border:none;border-top:1px solid #eee;">
        <p style="margin:0;color:#666;font-size:14px;line-height:1.8;">
          Maycor Building Contractors<br>
          <a href="https://maycor.co.uk" style="color:#666;">maycor.co.uk</a><br>
          <a href="mailto:admin@maycor.co.uk" style="color:#666;">admin@maycor.co.uk</a>
        </p>
      </div>
    </div>
  `;

  try {
    await Promise.all([
      resend.emails.send({
        from: "Maycor Leads <leads@mail.maycor.co.uk>",
        to: "admin@maycor.co.uk",
        subject: `New dental practice lead – ${lead.practiceName} – ${lead.name}`,
        html: adminHtml,
      }),
      resend.emails.send({
        from: "Maycor Building Contractors <leads@mail.maycor.co.uk>",
        to: lead.email,
        subject: `Your enquiry – Maycor Dental Practice Refurbishment`,
        html: clientHtml,
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Could not send your enquiry." },
      { status: 502 }
    );
  }
}
