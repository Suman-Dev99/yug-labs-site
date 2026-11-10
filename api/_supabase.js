// Server-side Supabase helpers (Phase 9.6+).
// - sbUserFromJwt: verify a user's access token via the Auth API.
// - sbService: REST calls with the SERVICE-ROLE key (bypasses RLS —
//   server only, never expose this key or these results unchecked).
export function sbConfig() {
  return {
    url: process.env.SUPABASE_URL || "",
    anonKey: process.env.SUPABASE_ANON_KEY || "",
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  };
}

export async function sbUserFromJwt(jwt) {
  const { url, anonKey } = sbConfig();
  if (!url || !jwt) return null;
  try {
    const r = await fetch(url + "/auth/v1/user", {
      headers: { apikey: anonKey, Authorization: "Bearer " + jwt },
    });
    if (!r.ok) return null;
    const u = await r.json();
    return u && u.id ? { id: u.id, email: u.email || "" } : null;
  } catch (e) {
    return null;
  }
}

export async function sbService(path, opts) {
  const { url, serviceKey } = sbConfig();
  opts = opts || {};
  const r = await fetch(url + "/rest/v1/" + path, {
    method: opts.method || "GET",
    headers: {
      apikey: serviceKey,
      Authorization: "Bearer " + serviceKey,
      "Content-Type": "application/json",
      ...(opts.headers || {}),
    },
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
  });
  const t = await r.text();
  let j = null;
  try { j = t ? JSON.parse(t) : null; } catch (e) { /* keep null */ }
  return { ok: r.ok, status: r.status, j, t };
}
