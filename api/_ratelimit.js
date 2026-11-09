// Shared best-effort rate limiter (per-instance memory).
// Serverless instances are ephemeral, so this blunts casual abuse and
// runaway loops; it is NOT a distributed quota. Durable per-user quotas
// arrive with the accounts phase (database-backed).
const buckets = new Map();

function clientIp(req) {
  const h = req.headers || {};
  const xff = h["x-forwarded-for"] || h["X-Forwarded-For"] || "";
  const first = String(xff).split(",")[0].trim();
  return first || (req.socket && req.socket.remoteAddress) || "unknown";
}

export function rateLimit(req, ns, limit, windowMs) {
  const now = Date.now();
  const key = ns + ":" + clientIp(req);
  let b = buckets.get(key);
  if (!b || now - b.start >= windowMs) { b = { start: now, count: 0 }; buckets.set(key, b); }
  b.count += 1;
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) { if (now - v.start >= windowMs) buckets.delete(k); }
  }
  return { ok: b.count <= limit, retryAfter: Math.max(1, Math.ceil((b.start + windowMs - now) / 1000)) };
}

export function tooMany(res, retryAfter) {
  res.setHeader("Retry-After", String(retryAfter));
  return res.status(429).json({ code: "RATE_LIMITED" });
}
