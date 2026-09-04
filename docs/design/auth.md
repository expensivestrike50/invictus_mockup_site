# Auth

> **⚠️ Two rules that are shipped code, not suggestions:**
>
> - **SSO buttons:** render `<SocialAuthButtons>` from
>   `@/components/base/social-auth-buttons` (brand-compliant Google mark). Never
>   hand-roll "Continue with Google/Apple" and never restyle it with the theme color.
> - **Redirect:** always `${window.location.origin}/auth/callback` — never a bare origin
>   (which strands the user on the marketing landing) and never a protected route (which
>   races `ProtectedRoute` and bounces the user back to `/signin`). The same goes for
>   `emailRedirectTo`. Post-auth lands on `DEFAULT_AUTHED_ROUTE`
>   (`src/lib/auth-routes.ts`).

## The pieces

| File | Job |
|---|---|
| `src/components/base/social-auth-buttons.tsx` | The one SSO button set. Shared across templates — copy it, don't fork it. |
| `src/pages/AuthCallback.tsx` | `/auth/callback`. Turns whatever the broker returned (fragment tokens **or** a PKCE `code`) into a session, then forwards to `DEFAULT_AUTHED_ROUTE`. |
| `src/lib/auth-routes.ts` | `DEFAULT_AUTHED_ROUTE` (`/dashboard`) — the first authenticated screen, where every successful sign-in lands. `SIGNED_OUT_ROUTE` (`/signin`) — where we send someone with no session. |
| `src/contexts/AuthContext.tsx` | Session state, email sign-in/sign-up, anonymous demo sign-in. |
| `src/components/ProtectedRoute.tsx` | Sends signed-out visitors to `/signin`. |
| `src/integrations/lovable/index.ts` | Generated Lovable OAuth broker. **Never edit.** |

## OAuth

Google SSO is the only configured provider, so both auth pages pass
`providers={['google']}`. Do not render a button for a provider the project has not
configured — it can only ever error.

```tsx
<SocialAuthButtons mode="signin" providers={['google']} className="mb-6" />
```

The component does the broker call itself. Pages must not add their own OAuth handler
alongside it — two ways to start OAuth is exactly how the bare-origin redirect bug got
re-introduced last time.

```typescript
// ❌ bypasses the broker — throws "missing OAuth secret"
supabase.auth.signInWithOAuth({ provider: 'google' });

// ❌ bare origin — user lands on the marketing landing, not in the app
lovable.auth.signInWithOAuth('google', { redirect_uri: window.location.origin });

// ❌ protected route — races ProtectedRoute before the session exists
supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${origin}/dashboard` } });
```

## Password reset is the one exception

`resetPasswordForEmail` sends the user to `${window.location.origin}/reset-password`, not
`/auth/callback`. That is deliberate: `/auth/callback` signs the user straight in and
forwards them, giving them no chance to choose a new password. `ResetPassword.tsx`
listens for the `PASSWORD_RECOVERY` event (and the `type=recovery` hash) and shows the
new-password form.

## Route table

| Route | Access | Behavior |
|---|---|---|
| `/` | public | Marketing landing |
| `/signin`, `/signup` | public | Redirect to `/dashboard` if already signed in (anonymous demo users may still sign in) |
| `/reset-password` | public | Request a reset link, or set a new password when arriving from one |
| `/auth/callback` | public | Establishes the session from an OAuth or email-confirmation link, then forwards to `DEFAULT_AUTHED_ROUTE` |
| `/dashboard`, `/clients`, `/invoice`, `/invoice/:id` | **protected** | `ProtectedRoute` → `/signin` when signed out |

## Demo mode

"Try Demo Mode" on both auth pages calls `signInAnonymously()`, seeds sample clients and
invoices, and drops the visitor on `/dashboard`. It is a real anonymous Supabase session,
not a `/demo/*` route — so the account menu's leave affordance stays "Sign out".
