# Phase 3: Authentication and administrator authorization

## What this phase adds

- `/login/`: email/password sign-in using Supabase Auth.
- `/admin/`: a small protected landing page that confirms administrator access and provides sign-out. The content editor is Phase 4.
- `admin-status`: a Supabase Edge Function that requires a valid Supabase JWT and checks the current Auth user against the server-side administrator ID and email allowlist.
- Shared browser auth helpers and a public Supabase URL/key configuration file.

The HTML routes are public static files. The Edge Function and future Row Level Security policies protect data and privileged operations; hiding a route is not treated as security.

## Files

| File | Purpose |
|---|---|
| `login/index.html`, `login/login.js` | Accessible sign-in form and authorization check. |
| `admin/index.html`, `admin/admin.js` | Protected phase landing page and sign-out. |
| `assets/css/auth.css` | Login/dashboard entry styling using the existing site's CSS variables. |
| `assets/js/supabase-config.js` | Public project URL and publishable key only. |
| `assets/js/auth-client.js` | Creates the Supabase browser client and checks admin status. |
| `supabase/config.toml` | Keeps JWT verification enabled for the function. |
| `supabase/functions/admin-status/index.ts` | Validates current Auth identity and allowlist server-side. |

## Required configuration

1. In `assets/js/supabase-config.js`, set the Supabase project URL and publishable key (or legacy anon key). These are browser-visible values; never use a secret/service-role key here.
2. In the hosted Supabase project's Auth settings, disable public sign-ups. Keep the existing administrator account. `auth.enable_signup = false` in `supabase/config.toml` also applies this policy to the local Supabase stack; changing this file alone does not update hosted project settings.
3. In Supabase Edge Function Secrets, set `ADMIN_USER_ID` and `ADMIN_EMAIL` to the existing, confirmed administrator account. Use the account's Auth user UUID and exact email, normalized to lowercase. Do not add these values to repository files.
4. Deploy `admin-status` with JWT verification enabled. The function also checks the current Auth user and returns only a generic denial for non-admin accounts.
5. Confirm the configured redirect allowlist includes `https://abrahamogbanje.github.io/admin/` if the project's Auth settings require that target. Local previews should use `http://localhost:8000` or `http://127.0.0.1:8000`.

The function expects Supabase's standard injected `SUPABASE_URL` and publishable-key environment values. Its own allowlist values use the names `ADMIN_USER_ID` and `ADMIN_EMAIL`; Supabase reserves the `SUPABASE_` prefix for platform variables.

## How sign-in works

1. The form calls `signInWithPassword` over HTTPS.
2. Supabase Auth establishes a browser session and refreshes it through the Supabase client.
3. The browser invokes `admin-status` with the session JWT.
4. Supabase's function gateway rejects invalid/expired JWTs before the handler runs.
5. The function requests the current Auth user and compares both user ID and confirmed email to backend secrets.
6. Only an allowlisted account reaches `/admin/`. Sign-out clears the Supabase session.

The function also checks the browser origin for CORS. CORS is an additional browser restriction, not the authorization check; the JWT and allowlist remain required.

## Local preview

From the repository root, run:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/login/`. GitHub Pages routes are available at `/login/` and `/admin/` because each is a directory with an `index.html` file.

For a real sign-in test, the public config and deployed Edge Function secrets must first be configured. Without those values, login shows a configuration message and cannot authenticate.

## Security limitations and next work

- GitHub Pages serves admin HTML and JavaScript publicly. Only backend operations and future drafts are protected.
- GitHub Pages does not consume this repository's `_headers` file. The login pages use a Content Security Policy meta tag, but GitHub Pages cannot provide every response-header defense through repository files.
- The CDN-hosted Supabase client is version-pinned. The login pages allow that CDN and the project's Supabase API domain in CSP.
- Phase 4 must add Row Level Security for drafts and staged uploads before exposing those operations.
- Phase 6 must add the GitHub App publisher. The private key and installation configuration belong in Supabase secrets, never in this repository.
