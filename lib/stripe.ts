import Stripe from "stripe";

/**
 * Stripe is optional in the MVP. When STRIPE_SECRET_KEY is unset, checkout runs
 * in "demo mode": orders are marked paid immediately so the download flow can
 * be exercised end-to-end without real payment credentials.
 */
export function stripeEnabled(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

let client: Stripe | null = null;

export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  if (!client) {
    client = new Stripe(process.env.STRIPE_SECRET_KEY, {
      // Use the SDK's pinned API version to avoid coupling to a specific date.
      typescript: true,
    });
  }
  return client;
}
