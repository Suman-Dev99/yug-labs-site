// Razorpay checkout — order creation (Phase 9.6).
// Rules: the user is identified ONLY from their Supabase JWT; the price
// comes ONLY from the server-side catalog (_plans.js); the order is
// recorded in `payments` BEFORE the client sees it, so the webhook can
// match it later. Entitlement is granted by the webhook (9.7), never here.
import { rateLimit, tooMany } from "./_ratelimit.js";
import { logEvent } from "./_log.js";
import { planById } from "./_plans.js";
import { sbUserFromJwt, sbService } from "./_supabase.js";

export default async function handler(req, res) {
  if (req.method !== "POST") { res.status(405).json({ code: "METHOD" }); return; }
  const rl = rateLimit(req, "checkout", 10, 60000);
  if (!rl.ok) return tooMany(res, rl.retryAfter);

  const keyId = process.env.RAZORPAY_KEY_ID || "";
  const keySecret = process.env.RAZORPAY_KEY_SECRET || "";
  if (!keyId || !keySecret) { res.status(503).json({ code: "PAYMENTS_NOT_CONFIGURED" }); return; }

  const auth = String((req.headers && (req.headers.authorization || req.headers.Authorization)) || "");
  const jwt = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  const user = await sbUserFromJwt(jwt);
  if (!user) { res.status(401).json({ code: "LOGIN_REQUIRED" }); return; }

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = null; } }
  const plan = planById(body && body.planId);
  if (!plan || plan.pricePaise <= 0) { res.status(400).json({ code: "BAD_PLAN" }); return; }

  // Create the Razorpay order.
  let order;
  try {
    const r = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from(keyId + ":" + keySecret).toString("base64"),
      },
      body: JSON.stringify({
        amount: plan.pricePaise,
        currency: "INR",
        receipt: "yl_" + user.id.slice(0, 8) + "_" + Date.now(),
        notes: { user_id: user.id, plan: plan.id },
      }),
    });
    order = await r.json();
    if (!r.ok || !order || !order.id) throw new Error("razorpay " + r.status);
  } catch (e) {
    logEvent("checkout", "ORDER_FAILED", { plan: plan.id });
    res.status(502).json({ code: "ORDER_FAILED" });
    return;
  }

  // Record it (idempotency anchor for the webhook).
  const rec = await sbService("payments", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: { user_id: user.id, razorpay_order_id: order.id, amount: plan.pricePaise, currency: "INR", status: "created" },
  });
  if (!rec.ok) {
    logEvent("checkout", "RECORD_FAILED", { plan: plan.id, status: rec.status });
    res.status(502).json({ code: "RECORD_FAILED" });
    return;
  }

  logEvent("checkout", "ORDER_CREATED", { plan: plan.id });
  res.status(200).json({ orderId: order.id, amount: plan.pricePaise, currency: "INR", keyId, plan: plan.id });
}
