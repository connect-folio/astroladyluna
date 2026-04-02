import { Resend } from "resend";

// Falls back to a dummy key so the module loads during build without crashing.
// Real key must be set in Vercel env vars before email features will work.
export const resend = new Resend(process.env.RESEND_API_KEY ?? "re_placeholder");
