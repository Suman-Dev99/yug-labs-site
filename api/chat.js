// Yug AI — chat endpoint. The provider key lives ONLY in server env vars
// (YUG_AI_KEY / YUG_AI_ENDPOINT / YUG_AI_MODEL) and never reaches the browser.
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ code: "METHOD_NOT_ALLOWED" });
  const key = process.env.YUG_AI_KEY;
  const endpoint = process.env.YUG_AI_ENDPOINT;
  const model = process.env.YUG_AI_MODEL;
  if (!key || !endpoint || !model) return res.status(503).json({ code: "YUG_AI_NOT_CONFIGURED" });
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const messages = Array.isArray(body.messages) ? body.messages.slice(-12) : [];
    if (!messages.length) return res.status(400).json({ code: "NO_MESSAGES" });
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + key },
      body: JSON.stringify({ model, messages, temperature: 0.6, top_p: 0.95, max_tokens: Math.min(body.max_tokens || 900, 1500) })
    });
    if (!upstream.ok) return res.status(502).json({ code: "UPSTREAM_" + upstream.status });
    const j = await upstream.json();
    const m = j.choices && j.choices[0] && j.choices[0].message;
    return res.status(200).json({ content: (m && m.content) || "" });
  } catch (e) {
    return res.status(502).json({ code: "UPSTREAM_ERROR" });
  }
}
