// Transactional email via Resend (Phase 9.9).
// Best-effort by design: returns true/false, NEVER throws — a mail failure
// must not break a payment webhook. From-address comes from MAIL_FROM env;
// until a sending domain is verified in Resend, the default is Resend's
// onboarding sender (delivers to the account owner only).
export async function sendEmail(to, subject, text) {
  const key = process.env.RESEND_API_KEY || "";
  if (!key || !to) return false;
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.MAIL_FROM || "YugLab <onboarding@resend.dev>",
        to: [to],
        subject,
        text,
      }),
    });
    return r.ok;
  } catch (e) {
    return false;
  }
}
