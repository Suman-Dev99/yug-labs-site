// Plan catalog — SERVER-SIDE single source of truth (Phase 9.5).
// FINAL pricing (D4, Suman — 10 Nov 2026): Free ₹0 (100 trial credits,
// preview-only), Starter ₹199/month offer (list ₹499 — 60% off),
// Pro ₹999/month, Studio ₹2,199/month. Amounts are in PAISE
// (Razorpay convention). Change prices HERE only — checkout and
// webhooks read from this file, never from the client.
export const PLANS_DRAFT = false;

export const PLANS = [
  { id: "free",    name: "Free",    pricePaise: 0,      periodDays: 0,  credits: 100,
    features: ["100 trial credits — 1–2 builds", "Live preview with watermark", "No download, copy or export"] },
  { id: "starter", name: "Starter", pricePaise: 19900, compareAtPaise: 49900, periodDays: 30, credits: 5000,
    features: ["Everything in Free, unlocked", "5,000 credits / month", "Download + ZIP + code export"] },
  { id: "pro",     name: "Pro",     pricePaise: 99900,  periodDays: 30, credits: 15000,
    features: ["Everything in Starter", "15,000 credits / month", "Version history"] },
  { id: "studio",  name: "Studio",  pricePaise: 219900, periodDays: 30, credits: 50000,
    features: ["Everything in Pro", "50,000 credits / month", "For teams and heavy use"] },
];

export function planById(id) {
  return PLANS.find((p) => p.id === id) || null;
}
