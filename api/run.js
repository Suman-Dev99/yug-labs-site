// YugLab Code Studio — code runner. Code executes on a free public sandbox
// engine (never on this server). No key needed; nothing is stored.
const ENGINE = "https://emkc.org/api/v2/piston";
const LANGS = ["python", "javascript", "typescript", "java", "c++", "c", "go", "rust"];
let cache = null;

async function versionFor(lang) {
  if (!cache) {
    const r = await fetch(ENGINE + "/runtimes");
    cache = await r.json();
  }
  const hits = cache.filter((x) => x.language === lang);
  return hits.length ? hits[0].version : null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ code: "METHOD_NOT_ALLOWED" });
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const lang = String(body.language || "");
    const code = String(body.code || "");
    if (!LANGS.includes(lang)) return res.status(400).json({ code: "LANG_NOT_SUPPORTED" });
    if (!code.trim()) return res.status(400).json({ code: "NO_CODE" });
    if (code.length > 20000) return res.status(400).json({ code: "CODE_TOO_LONG" });
    const version = await versionFor(lang);
    if (!version) return res.status(502).json({ code: "RUNTIME_UNAVAILABLE" });
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 25000);
    const ex = await fetch(ENGINE + "/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language: lang, version, files: [{ content: code }], run_timeout: 10000, compile_timeout: 15000 }),
      signal: ctl.signal
    });
    clearTimeout(t);
    if (!ex.ok) return res.status(502).json({ code: "ENGINE_" + ex.status });
    const j = await ex.json();
    const run = j.run || {};
    const compile = j.compile || {};
    return res.status(200).json({
      version,
      stdout: run.stdout || "",
      stderr: (compile.stderr || "") + (run.stderr || ""),
      exit: run.code != null ? run.code : (compile.code != null ? compile.code : -1)
    });
  } catch (e) {
    return res.status(502).json({ code: "RUN_ERROR" });
  }
}
