import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let email: string;
  try {
    const body = await request.json();
    email = body.email;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const audienceId = process.env.RESEND_NEWSLETTER_AUDIENCE_ID;
  if (!audienceId || audienceId === "your_audience_id_here") {
    return NextResponse.json({ success: true, alreadySubscribed: false });
  }

  try {
    await resend.contacts.create({ email, audienceId, unsubscribed: false });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.toLowerCase().includes("already") || message.toLowerCase().includes("exists")) {
      return NextResponse.json({ success: true, alreadySubscribed: true });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }

  try {
    await resend.emails.send({
      from: "Lady Luna <letters@astroladyluna.com>",
      to: email,
      subject: "Welcome to The Lady Luna Letter ◌",
      html: `<div style="background:#291225;color:#F6F4EC;font-family:Georgia,serif;padding:40px;max-width:600px;">
        <p style="font-size:11px;letter-spacing:0.3em;color:#EFBDB0;">LADY ◌ LUNA</p>
        <h1 style="font-size:28px;font-weight:400;">Your first letter is on its way.</h1>
        <p style="font-size:14px;line-height:1.8;color:#B1AED4;">4 issues free. Then $17/month — only if you want to.</p>
        <p style="font-size:13px;color:#8F6988;margin-top:32px;">— Camila, Lady Luna</p>
      </div>`,
    });
  } catch { /* email failure is non-fatal */ }

  return NextResponse.json({ success: true, alreadySubscribed: false });
}
