// Structured audit logging (Phase 2.7). Vercel captures function stdout.
// RULES: log only event codes + safe meta (language, status, duration).
// NEVER log message text, code text, stdin, IPs, or any secret.
export function logEvent(ns, code, meta) {
  try {
    console.log(JSON.stringify({ t: new Date().toISOString(), ns, code, ...(meta || {}) }));
  } catch (e) { /* logging must never break the request */ }
}
