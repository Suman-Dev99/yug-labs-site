// Yug AI — chat endpoint. The provider key lives ONLY in server env vars
// (YUG_AI_KEY / YUG_AI_ENDPOINT / YUG_AI_MODEL) and never reaches the browser.
import { rateLimit, tooMany } from "./_ratelimit.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ code: "METHOD_NOT_ALLOWED" });
  const rl = rateLimit(req, "chat", 20, 60000);
  if (!rl.ok) return tooMany(res, rl.retryAfter);
  const key = process.env.YUG_AI_KEY;
  const endpoint = process.env.YUG_AI_ENDPOINT;
  const model = process.env.YUG_AI_MODEL;
  if (!key || !endpoint || !model) return res.status(503).json({ code: "YUG_AI_NOT_CONFIGURED" });
  try {
    if (typeof req.body === "string" && req.body.length > 100000) return res.status(413).json({ code: "PAYLOAD_TOO_LARGE" });
    let body;
    try { body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {}); }
    catch (e) { return res.status(400).json({ code: "INVALID_JSON" }); }
    const messages = (Array.isArray(body.messages) ? body.messages : []).slice(-12)
      .filter((m) => m && typeof m === "object")
      .map((m) => ({
        role: m.role === "assistant" ? "assistant" : (m.role === "system" ? "system" : "user"),
        content: String(m.content || "").slice(0, 8000)
      }));
    if (!messages.length) return res.status(400).json({ code: "NO_MESSAGES" });
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 45000);
    let upstream;
    try {
      upstream = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + key },
        body: JSON.stringify({ model, messages, temperature: 0.6, top_p: 0.95, max_tokens: Math.min(body.max_tokens || 900, 1500) }),
        signal: ctl.signal
      });
    } catch (e) {
      if (e && e.name === "AbortError") return res.status(504).json({ code: "UPSTREAM_TIMEOUT" });
      throw e;
    } finally {
      clearTimeout(timer);
    }
    if (!upstream.ok) return res.status(502).json({ code: "UPSTREAM_ERROR" });
    const j = await upstream.json();
    const m = j.choices && j.choices[0] && j.choices[0].message;
    return res.status(200).json({ content: (m && m.content) || "" });
  } catch (e) {
    return res.status(502).json({ code: "UPSTREAM_ERROR" });
  }
}
