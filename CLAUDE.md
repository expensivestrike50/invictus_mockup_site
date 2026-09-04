# CLAUDE.md — Invofy

Guidance for AI edits to this project. Read before changing auth or sign-in UI.

## Layout

- Pages are PascalCase files at the top of `src/pages/` (`SignIn.tsx`, `Dashboard.tsx`, …).
  Routes are wired in `src/App.tsx`.
- Shared, brand-level components live in `src/components/base/`. Everything else is a
  domain component under `src/components/<area>/`, and shadcn primitives stay in
  `src/components/ui/`.
- Auth state comes from `src/contexts/AuthContext.tsx`; protected pages are wrapped in
  `ProtectedRoute` (`src/components/ProtectedRoute.tsx`).

## Don'ts

1. Don't hand-roll "Continue with Google/Apple" buttons — the ONE brand-compliant set is
   `SocialAuthButtons` (`src/components/base/social-auth-buttons.tsx`). Never restyle it
   with the theme color and never rebuild it inline on a page.
2. Don't call `supabase.auth.signInWithOAuth` — it throws `missing OAuth secret`. OAuth
   goes through the Lovable managed broker, which `SocialAuthButtons` already uses.
3. Don't edit `src/integrations/lovable/` — that is the generated OAuth broker.
4. Don't redirect OAuth or email confirmation to a bare `window.location.origin`, and
   don't point it at a protected route like `/dashboard` — always
   `${window.location.origin}/auth/callback`, which establishes the session and then
   forwards to `DEFAULT_AUTHED_ROUTE` (`src/lib/auth-routes.ts`).
5. Don't hardcode post-auth paths. Import `DEFAULT_AUTHED_ROUTE` / `SIGNED_OUT_ROUTE`
   from `src/lib/auth-routes.ts`.
6. Don't remove the `/auth/callback` route from `App.tsx` — `SocialAuthButtons`
   hardcodes that path, so without the route SSO 404s.

See `docs/design/auth.md` for the full auth contract.
