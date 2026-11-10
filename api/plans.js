// Public plan catalog (Phase 9.5). Prices live ONLY in _plans.js (server).
// Pricing is FINAL (D4, 10 Nov 2026) — PLANS_DRAFT is false.
import { rateLimit, tooMany } from "./_ratelimit.js";
import { logEvent } from "./_log.js";
import { PLANS, PLANS_DRAFT } from "./_plans.js";

export default async function handler(req, res) {
  if (req.method !== "GET") { res.status(405).json({ code: "METHOD" }); return; }
  const rl = rateLimit(req, "plans", 60, 60000);
  if (!rl.ok) return tooMany(res, rl.retryAfter);
  logEvent("plans", "PLANS_SERVED", { draft: PLANS_DRAFT });
  res.status(200).json({ currency: "INR", draft: PLANS_DRAFT, plans: PLANS });
}
