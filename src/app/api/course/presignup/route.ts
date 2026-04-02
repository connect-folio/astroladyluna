import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";

const EARLY_BIRD_DEADLINE = new Date("2026-05-15T00:00:00Z");

function earlyBirdHtml(name: string) {
  return `
<div style="background:#291225;color:#F6F4EC;font-family:Georgia,serif;padding:40px;max-width:600px;margin:0 auto;">
  <p style="font-size:11px;letter-spacing:0.3em;color:#EFBDB0;text-transform:uppercase;margin:0 0 32px;">LADY ◌ LUNA</p>
  <h1 style="font-size:28px;font-weight:400;margin:0 0 20px;line-height:1.3;">You're in early, ${name} ✦</h1>
  <p style="font-size:14px;line-height:1.8;color:#B1AED4;margin:0 0 24px;">
    You've secured an early-bird spot for <strong style="color:#EFBDB0;">Astrología Profunda</strong> — 
    our live astrology course launching June 1, 2026.
  </p>
  <p style="font-size:14px;line-height:1.8;color:#B1AED4;margin:0 0 24px;">
    As an early supporter, you'll receive the lowest price when enrollment opens, 
    plus first access to live session dates.
  </p>
  <p style="font-size:14px;line-height:1.8;color:#B1AED4;margin:0 0 32px;">
    In the meantime, if you'd like to get a feel for how I work with charts, 
    you're welcome to book a one-on-one session:
  </p>
  <a href="https://calendly.com/astroladyluna-info/quick-c"
     style="display:inline-block;background:#EFBDB0;color:#291225;font-family:Georgia,serif;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;padding:14px 28px;">
    Quick Connect Session →
  </a>
  <p style="font-size:13px;color:#8F6988;margin:40px 0 0;">— Camila, Lady Luna</p>
</div>
`;
}

function regularPresignupHtml(name: string) {
  return `
<div style="background:#291225;color:#F6F4EC;font-family:Georgia,serif;padding:40px;max-width:600px;margin:0 auto;">
  <p style="font-size:11px;letter-spacing:0.3em;color:#EFBDB0;text-transform:uppercase;margin:0 0 32px;">LADY ◌ LUNA</p>
  <h1 style="font-size:28px;font-weight:400;margin:0 0 20px;line-height:1.3;">Spot reserved, ${name} ✦</h1>
  <p style="font-size:14px;line-height:1.8;color:#B1AED4;margin:0 0 24px;">
    You're on the waitlist for <strong style="color:#EFBDB0;">Astrología Profunda</strong> — 
    launching June 1, 2026.
  </p>
  <p style="font-size:14px;line-height:1.8;color:#B1AED4;margin:0 0 32px;">
    I'll send you all the details — pricing, schedule, and how to enroll — 
    as soon as the course opens. You'll hear from me first.
  </p>
  <p style="font-size:13px;color:#8F6988;margin:0;">— Camila, Lady Luna</p>
</div>
`;
}

export async function POST(request: NextRequest) {
  let name: string, email: string;

  try {
    const body = await request.json();
    name = body.name;
    email = body.email;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!name || !email) {
    return NextResponse.json({ error: "name and email are required" }, { status: 400 });
  }

  const early_bird = new Date() < EARLY_BIRD_DEADLINE;
  const audienceId = process.env.RESEND_COURSE_AUDIENCE_ID;

  if (audienceId && audienceId !== "your_course_audience_id_here") {
    try {
      await resend.contacts.create({
        email,
        firstName: name,
        audienceId,
        unsubscribed: false,
      });
    } catch {
      // Ignore duplicate contact errors
    }

    try {
      await resend.emails.send({
        from: "Lady Luna <hola@astroladyluna.com>",
        to: email,
        subject: early_bird
          ? "You're in early — Astrología Profunda ✦"
          : "Your spot is reserved — Astrología Profunda ✦",
        html: early_bird ? earlyBirdHtml(name) : regularPresignupHtml(name),
      });
    } catch {
      // Email failure should not block the response
    }
  }

  return NextResponse.json({ success: true, early_bird });
}
