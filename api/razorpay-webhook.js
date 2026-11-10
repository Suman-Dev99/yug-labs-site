// Razorpay webhook (Phase 9.7). The ONLY place entitlements are granted.
// Discipline:
//  1. HMAC-SHA256 signature over the RAW body, timing-safe compare.
//  2. Never trust the payload's amounts — re-fetch the payment (and the
//     order, for plan/user notes) from Razorpay's API.
//  3. Idempotent: payments.razorpay_order_id is UNIQUE; terminal states
//     (paid/refunded) never regress; a duplicate webhook is a no-op 200.
//  4. Amount must match the recorded order amount, else no entitlement.
import crypto from "node:crypto";
import { logEvent } from "./_log.js";
import { planById } from "./_plans.js";
import { sbService } from "./_supabase.js";
import { sendEmail } from "./_email.js";

export const config = { api: { bodyParser: false } };

function readRaw(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function rzp(path) {
  const keyId = process.env.RAZORPAY_KEY_ID || "";
  const keySecret = process.env.RAZORPAY_KEY_SECRET || "";
  return fetch("https://api.razorpay.com" + path, {
    headers: { Authorization: "Basic " + Buffer.from(keyId + ":" + keySecret).toString("base64") },
  }).then(async (r) => {
    if (!r.ok) throw new Error("razorpay " + r.status);
    return r.json();
  });
}

async function grantEntitlement(row, plan) {
  const now = Date.now();
  const cur = await sbService("entitlements?user_id=eq." + row.user_id + "&select=current_period_end,status");
  let base = now;
  if (cur.ok && Array.isArray(cur.j) && cur.j[0] && cur.j[0].status === "active") {
    const end = Date.parse(cur.j[0].current_period_end || "");
    if (end > now) base = end; // renewal stacks on the remaining period
  }
  const newEnd = new Date(base + plan.periodDays * 86400000).toISOString();
  const up = await sbService("entitlements", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: { user_id: row.user_id, plan: plan.id, status: "active", current_period_end: newEnd, updated_at: new Date().toISOString() },
  });
  return up.ok;
}


async function notify(row, subject, text) {
  try {
    const p = await sbService("profiles?id=eq." + row.user_id + "&select=email");
    const email = p.ok && Array.isArray(p.j) && p.j[0] && p.j[0].email;
    if (email) await sendEmail(email, subject, text);
  } catch (e) { /* mail is best-effort */ }
}

export default async function handler(req, res) {
  if (req.method !== "POST") { res.status(405).json({ code: "METHOD" }); return; }
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET || "";
  if (!secret) { res.status(503).json({ code: "WEBHOOK_NOT_CONFIGURED" }); return; }

  const raw = await readRaw(req);
  const sig = String((req.headers && req.headers["x-razorpay-signature"]) || "");
  const expected = crypto.createHmac("sha256", secret).update(raw).digest("hex");
  const a = Buffer.from(sig), b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    logEvent("webhook", "BAD_SIGNATURE", {});
    res.status(400).json({ code: "BAD_SIGNATURE" });
    return;
  }

  let evt;
  try { evt = JSON.parse(raw.toString("utf8")); } catch (e) { res.status(400).json({ code: "BAD_JSON" }); return; }
  const event = evt && evt.event;
  const payEntity = evt && evt.payload && evt.payload.payment && evt.payload.payment.entity;
  const refundEntity = evt && evt.payload && evt.payload.refund && evt.payload.refund.entity;

  try {
    if (event === "payment.captured" || event === "payment.failed") {
      const payment = await rzp("/v1/payments/" + payEntity.id); // re-fetch, never trust payload
      const rows = await sbService("payments?razorpay_order_id=eq." + payment.order_id + "&select=*");
      const row = rows.ok && Array.isArray(rows.j) && rows.j[0];
      if (!row) { logEvent("webhook", "ORDER_NOT_FOUND", { event }); res.status(200).json({ ok: true }); return; }
      if (row.status === "paid" || row.status === "refunded") { res.status(200).json({ ok: true, dup: true }); return; }
      if (event === "payment.failed") {
        await sbService("payments?id=eq." + row.id, { method: "PATCH", headers: { Prefer: "return=minimal" }, body: { status: "failed", razorpay_payment_id: payment.id, updated_at: new Date().toISOString() } });
        logEvent("webhook", "PAYMENT_FAILED", {});
        res.status(200).json({ ok: true });
        return;
      }
      // captured: amount must match the recorded order exactly
      if (payment.amount !== row.amount || payment.status !== "captured") {
        logEvent("webhook", "AMOUNT_MISMATCH", { event });
        res.status(200).json({ ok: true });
        return;
      }
      const order = await rzp("/v1/orders/" + payment.order_id);
      const plan = planById(order && order.notes && order.notes.plan);
      if (!plan || !row.user_id || (order.notes && order.notes.user_id && order.notes.user_id !== row.user_id)) {
        logEvent("webhook", "PLAN_OR_USER_MISMATCH", { event });
        res.status(200).json({ ok: true });
        return;
      }
      await sbService("payments?id=eq." + row.id, { method: "PATCH", headers: { Prefer: "return=minimal" }, body: { status: "paid", razorpay_payment_id: payment.id, updated_at: new Date().toISOString() } });
      const granted = await grantEntitlement(row, plan);
      logEvent("webhook", granted ? "ENTITLEMENT_GRANTED" : "GRANT_FAILED", { plan: plan.id });
      if (granted) await notify(row, "Your YugLab " + plan.name + " plan is active", "Hi,\n\nYour payment was successful and your YugLab " + plan.name + " plan is now active for 30 days.\nOpen the Lab and keep building: https://yuglab.online/lab-app\n\n— YugLab");
      res.status(200).json({ ok: true });
      return;
    }

    if (event === "refund.processed" && refundEntity) {
      const payment = await rzp("/v1/payments/" + refundEntity.payment_id);
      const rows = await sbService("payments?razorpay_order_id=eq." + payment.order_id + "&select=*");
      const row = rows.ok && Array.isArray(rows.j) && rows.j[0];
      if (row && row.status === "paid") {
        await sbService("payments?id=eq." + row.id, { method: "PATCH", headers: { Prefer: "return=minimal" }, body: { status: "refunded", updated_at: new Date().toISOString() } });
        await sbService("entitlements?user_id=eq." + row.user_id, { method: "PATCH", headers: { Prefer: "return=minimal" }, body: { status: "refunded", current_period_end: new Date().toISOString(), updated_at: new Date().toISOString() } });
        logEvent("webhook", "REFUND_PROCESSED", {});
        await notify(row, "Your YugLab refund is processed", "Hi,\n\nYour refund has been processed and your paid plan has ended. Your projects stay saved in your account.\n\n— YugLab");
      }
      res.status(200).json({ ok: true });
      return;
    }

    logEvent("webhook", "EVENT_IGNORED", { event: String(event || "") });
    res.status(200).json({ ok: true });
  } catch (e) {
    logEvent("webhook", "HANDLER_ERROR", {});
    res.status(500).json({ code: "HANDLER_ERROR" });
  }
}
