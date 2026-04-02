import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const welcomeHtml = `
<div style="background:#291225;color:#F6F4EC;font-family:Georgia,serif;padding:40px;max-width:600px;margin:0 auto;">
  <p style="font-size:11px;letter-spacing:0.3em;color:#EFBDB0;text-transform:uppercase;margin:0 0 32px;">LADY ◌ LUNA</p>
  <h1 style="font-size:28px;font-weight:400;margin:0 0 20px;line-height:1.3;">Your first letter is on its way.</h1>
  <p style="font-size:14px;line-height:1.8;color:#B1AED4;margin:0 0 24px;">
    You'll receive 4 issues completely free. After that, you'll be invited to continue 
    at $17/month — only if you want to.
  </p>
  <p style="font-size:14px;line-height:1.8;color:#B1AED4;margin:0 0 32px;">
    Every letter arrives on Sunday morning with a reading of the week ahead: what the 
    planets are doing, what it means for you, and one practical thing to do with that energy.
  </p>
  <p style="font-size:13px;color:#8F6988;margin:0;">— Camila, Lady Luna</p>
</div>
`;

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
    // Resend not yet configured — return success so the UI works during dev
    return NextResponse.json({ success: true, alreadySubscribed: false });
  }

  try {
    await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    // Resend returns an error if contact already exists
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
      html: welcomeHtml,
    });
  } catch {
    // Email failure should not block the success response
  }

  return NextResponse.json({ success: true, alreadySubscribed: false });
}
