// Yug AI — health check. Reports only whether the backend AI is configured.
// No secrets, no provider details ever leave the server.
export default function handler(req, res) {
  res.status(200).json({ ok: true, ai: !!process.env.YUG_AI_KEY });
}
