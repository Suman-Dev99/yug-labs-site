// YugLab Code Studio — code runner. Code executes on a free public sandbox
// engine (Judge0 CE) — never on this server. No key needed; nothing stored.
import { rateLimit, tooMany } from "./_ratelimit.js";

const ENGINE = "https://ce.judge0.com";
const LANG_IDS = { "python": 71, "javascript": 63, "typescript": 74, "java": 62, "c++": 54, "c": 50, "go": 60, "rust": 73, "php": 68, "ruby": 72, "kotlin": 78, "swift": 83, "csharp": 51, "sql": 82, "bash": 46, "r": 80, "lua": 64 };

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ code: "METHOD_NOT_ALLOWED" });
  const rl = rateLimit(req, "run", 30, 60000);
  if (!rl.ok) return tooMany(res, rl.retryAfter);
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const lang = String(body.language || "");
    const code = String(body.code || "");
    if (!(lang in LANG_IDS)) return res.status(400).json({ code: "LANG_NOT_SUPPORTED" });
    if (!code.trim()) return res.status(400).json({ code: "NO_CODE" });
    if (code.length > 20000) return res.status(400).json({ code: "CODE_TOO_LONG" });
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 25000);
    const ex = await fetch(ENGINE + "/submissions?base64_encoded=false&wait=true", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language_id: LANG_IDS[lang], source_code: code, stdin: String(body.stdin || "").slice(0, 4000) }),
      signal: ctl.signal
    });
    clearTimeout(t);
    if (!ex.ok) return res.status(502).json({ code: "ENGINE_" + ex.status });
    const j = await ex.json();
    const accepted = j.status && j.status.id === 3;
    return res.status(200).json({
      stdout: j.stdout || "",
      stderr: (j.compile_output || "") + (j.stderr || "") + (j.message || ""),
      exit: accepted ? 0 : (j.status ? j.status.id : -1),
      status: j.status ? j.status.description : "",
      time: j.time || ""
    });
  } catch (e) {
    return res.status(502).json({ code: "RUN_ERROR" });
  }
}
