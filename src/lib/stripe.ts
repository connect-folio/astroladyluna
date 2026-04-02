import Stripe from "stripe";

// Falls back to a dummy key so the module loads during build without crashing.
// Real key must be set in Vercel env vars before payment features will work.
export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY ?? "sk_test_placeholder",
  { apiVersion: "2026-03-25.dahlia" }
);

export function getStripe(): Stripe {
  return stripe;
}
