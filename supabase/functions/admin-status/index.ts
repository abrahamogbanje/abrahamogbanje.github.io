const allowedOrigins = new Set([
  "https://abrahamogbanje.github.io",
  "http://localhost:8000",
  "http://127.0.0.1:8000"
]);

function responseHeaders(origin: string | null): Headers {
  const headers = new Headers({
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
    "Vary": "Origin"
  });
  if (origin && allowedOrigins.has(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Headers", "authorization, apikey, content-type, x-client-info");
    headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  }
  return headers;
}

function jsonResponse(body: Record<string, unknown>, status: number, origin: string | null): Response {
  return new Response(JSON.stringify(body), { status, headers: responseHeaders(origin) });
}

function getPublishableKey(): string | null {
  const keys = Deno.env.get("SUPABASE_PUBLISHABLE_KEYS");
  if (keys) {
    try {
      const parsed = JSON.parse(keys) as Record<string, string>;
      if (parsed.default) return parsed.default;
    } catch (_error) {
      return null;
    }
  }
  return Deno.env.get("SUPABASE_ANON_KEY") || null;
}

Deno.serve(async (request: Request) => {
  const origin = request.headers.get("Origin");
  if (origin && !allowedOrigins.has(origin)) {
    return jsonResponse({ authorized: false, error: "origin_not_allowed" }, 403, null);
  }
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: responseHeaders(origin) });
  }
  if (request.method !== "POST") {
    return jsonResponse({ authorized: false, error: "method_not_allowed" }, 405, origin);
  }

  const authorization = request.headers.get("Authorization");
  const bearer = authorization && /^Bearer\s+\S+$/i.test(authorization);
  if (!bearer) {
    return jsonResponse({ authorized: false, error: "unauthorized" }, 401, origin);
  }

  const projectUrl = Deno.env.get("SUPABASE_URL");
  const publishableKey = getPublishableKey();
  const adminUserId = Deno.env.get("ADMIN_USER_ID")?.trim().toLowerCase();
  const adminEmail = Deno.env.get("ADMIN_EMAIL")?.trim().toLowerCase();
  if (!projectUrl || !publishableKey || !adminUserId || !adminEmail) {
    console.error("admin-status is missing required server configuration");
    return jsonResponse({ authorized: false, error: "authorization_not_configured" }, 503, origin);
  }

  try {
    // The gateway verifies the Supabase JWT (verify_jwt=true). This Auth request
    // obtains the current user record so authorization uses current account data.
    const userResponse = await fetch(`${projectUrl.replace(/\/$/, "")}/auth/v1/user`, {
      headers: {
        "Authorization": authorization,
        "apikey": publishableKey
      }
    });
    if (!userResponse.ok) {
      return jsonResponse({ authorized: false, error: "unauthorized" }, 401, origin);
    }

    const user = await userResponse.json();
    const email = typeof user.email === "string" ? user.email.trim().toLowerCase() : "";
    const confirmed = Boolean(user.email_confirmed_at || user.confirmed_at);
    if (user.id !== adminUserId || email !== adminEmail || !confirmed) {
      return jsonResponse({ authorized: false, error: "not_authorized" }, 403, origin);
    }

    return jsonResponse({ authorized: true, email }, 200, origin);
  } catch (_error) {
    console.error("admin-status could not verify the Supabase user");
    return jsonResponse({ authorized: false, error: "authorization_unavailable" }, 503, origin);
  }
});
