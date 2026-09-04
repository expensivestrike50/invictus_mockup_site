/**
 * The single source of truth for post-auth navigation.
 *
 * After sign-in, sign-up confirmation, or an OAuth callback the user lands HERE — the
 * app's first authenticated screen — never `/` (the marketing landing).
 * See docs/design/auth.md.
 */
export const DEFAULT_AUTHED_ROUTE = "/dashboard";

/**
 * The auth screen. Where we send someone who has no session — e.g. an OAuth callback
 * that could not establish one. Never a dead protected route.
 */
export const SIGNED_OUT_ROUTE = "/signin";
