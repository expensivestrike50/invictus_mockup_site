import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { DEFAULT_AUTHED_ROUTE, SIGNED_OUT_ROUTE } from "@/lib/auth-routes";

/**
 * /auth/callback — where every OAuth (Google/Apple) and email-confirmation link lands.
 *
 * This is the fix for the recurring "signed in but bounced back to /sign-in (or the
 * marketing homepage)" bug. The Lovable OAuth broker can return the session two ways:
 *   1. fragment tokens  — `#access_token=…&refresh_token=…` (implicit / web_message)
 *   2. a PKCE `code`     — `?code=…` (when the supabase client uses flowType: 'pkce')
 * A callback that only handles ONE of these strands the user whenever the client is
 * configured for the other. So we establish the session from WHICHEVER arrived, then
 * land the user INSIDE the app — never `/`. Only after a genuine "no session either
 * way" do we fall back to the sign-in screen.
 *
 * See docs/design/auth.md.
 */
const AuthCallback = () => {
  const navigate = useNavigate();
  const ran = useRef(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (ran.current) return; // StrictMode double-invoke / re-render guard
    ran.current = true;

    (async () => {
      const url = new URL(window.location.href);
      const hash = new URLSearchParams(url.hash.replace(/^#/, ""));
      const accessToken = hash.get("access_token");
      const refreshToken = hash.get("refresh_token");
      const code = url.searchParams.get("code");

      try {
        if (accessToken && refreshToken) {
          // Broker returned tokens directly (implicit / web_message flow).
          await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
        } else if (code) {
          // Broker returned a PKCE authorization code — exchange it for a session.
          await supabase.auth.exchangeCodeForSession(url.href);
        }
        // If neither is present, the client's detectSessionInUrl may already have
        // consumed the URL — getSession() below is the source of truth either way.
      } catch {
        // Swallow and let the session check decide; a thrown exchange still often
        // leaves a valid session behind, and if not we surface a retry below.
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        navigate(DEFAULT_AUTHED_ROUTE, { replace: true });
      } else {
        setFailed(true);
      }
    })();
  }, [navigate]);

  if (failed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-sm text-muted-foreground">
          We couldn&apos;t finish signing you in. Please try again.
        </p>
        <button
          onClick={() => navigate(SIGNED_OUT_ROUTE, { replace: true })}
          className="text-sm font-medium underline underline-offset-4"
        >
          Back to sign in
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent opacity-40" />
    </div>
  );
};

export default AuthCallback;
