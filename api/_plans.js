// Plan catalog — SERVER-SIDE single source of truth (Phase 9.5).
// DRAFT pricing: Suman's D4 decision is still pending (master plan suggestion
// 499 / 999 / 2,499 INR). Amounts are in PAISE (Razorpay convention).
// Change prices HERE only — checkout and webhooks read from this file,
// never from the client.
export const PLANS_DRAFT = true;

export const PLANS = [
  { id: "free",    name: "Free",    pricePaise: 0,      periodDays: 0,  credits: 1000,
    features: ["Lab access", "Cloud project sync", "All 5 build types"] },
  { id: "starter", name: "Starter", pricePaise: 49900,  periodDays: 30, credits: 5000,
    features: ["Everything in Free", "5,000 credits / month", "Priority builds"] },
  { id: "pro",     name: "Pro",     pricePaise: 99900,  periodDays: 30, credits: 15000,
    features: ["Everything in Starter", "15,000 credits / month", "Version history"] },
  { id: "studio",  name: "Studio",  pricePaise: 249900, periodDays: 30, credits: 50000,
    features: ["Everything in Pro", "50,000 credits / month", "For teams and heavy use"] },
];

export function planById(id) {
  return PLANS.find((p) => p.id === id) || null;
}
