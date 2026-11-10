// Public client config (Phase 9.3). Returns ONLY public-safe values:
// the Supabase project URL and the publishable (anon) key. The anon key is
// designed for browser use — Row Level Security is the actual protection.
// The service-role key is NEVER returned here.
import { rateLimit, tooMany } from "./_ratelimit.js";
import { logEvent } from "./_log.js";

export default async function handler(req, res) {
  if (req.method !== "GET") { res.status(405).json({ code: "METHOD" }); return; }
  const rl = rateLimit(req, "config", 60, 60000);
  if (!rl.ok) return tooMany(res, rl.retryAfter);
  const supabaseUrl = process.env.SUPABASE_URL || "";
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";
  logEvent("config", "CONFIG_SERVED", { configured: !!(supabaseUrl && supabaseAnonKey) });
  res.status(200).json({ supabaseUrl, supabaseAnonKey });
}
