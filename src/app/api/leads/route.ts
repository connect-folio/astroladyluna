import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";

function leadsEmailHtml(firstName: string) {
  return `
<div style="background:#291225;color:#F6F4EC;font-family:Georgia,serif;padding:40px;max-width:600px;margin:0 auto;">
  <p style="font-size:11px;letter-spacing:0.3em;color:#EFBDB0;text-transform:uppercase;margin:0 0 32px;">LADY ◌ LUNA</p>
  <h1 style="font-size:28px;font-weight:400;margin:0 0 20px;line-height:1.3;">Hola, ${firstName} ✦</h1>
  <p style="font-size:14px;line-height:1.8;color:#B1AED4;margin:0 0 24px;">
    I received your message. I'm looking forward to sitting with your chart together.
  </p>
  <p style="font-size:14px;line-height:1.8;color:#B1AED4;margin:0 0 8px;">
    Your introductory rate is <strong style="color:#F6F4EC;">$88</strong> for a one-hour reading.
    Choose the session that feels right and book directly below:
  </p>
  <div style="margin:32px 0;display:flex;flex-direction:column;gap:12px;">
    <a href="https://calendly.com/astroladyluna-info/quick-c"
       style="display:inline-block;background:#EFBDB0;color:#291225;font-family:Georgia,serif;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;padding:14px 28px;margin-bottom:12px;">
      Quick Connect — 30 min
    </a>
    <br/>
    <a href="https://calendly.com/astroladyluna-info/30min"
       style="display:inline-block;background:transparent;color:#EFBDB0;border:1px solid #EFBDB0;font-family:Georgia,serif;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;padding:14px 28px;">
      Full Reading — 60 min
    </a>
  </div>
  <p style="font-size:13px;color:#8F6988;margin:0;">— Camila, Lady Luna</p>
</div>
`;
}

export async function POST(request: NextRequest) {
  let first_name: string, last_name: string, email: string;

  try {
    const body = await request.json();
    first_name = body.first_name;
    last_name = body.last_name;
    email = body.email;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!first_name || !last_name || !email) {
    return NextResponse.json({ error: "first_name, last_name, and email are required" }, { status: 400 });
  }

  const audienceId = process.env.RESEND_LEADS_AUDIENCE_ID;

  if (audienceId && audienceId !== "your_leads_audience_id_here") {
    try {
      await resend.contacts.create({
        email,
        firstName: first_name,
        lastName: last_name,
        audienceId,
        unsubscribed: false,
      });
    } catch {
      // Ignore duplicate contact errors — we still want to send the email
    }

    try {
      await resend.emails.send({
        from: "Lady Luna <hola@astroladyluna.com>",
        to: email,
        subject: "Your Lady Luna session — booking links inside ✦",
        html: leadsEmailHtml(first_name),
      });
    } catch {
      // Email failure should not block the response
    }
  }

  // Always return isFirstTimer: true (honor system v1)
  return NextResponse.json({ isFirstTimer: true });
}
