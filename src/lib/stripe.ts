import Stripe from "stripe";

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key === "sk_test_placeholder") {
    throw new Error("Stripe not configured");
  }
  return new Stripe(key, {
    apiVersion: "2026-03-25.dahlia",
  });
}
