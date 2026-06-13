/** Server-side helper to read the currently logged-in member.
 *
 *  Reads the Supabase session (via the cookie-backed SSR client), then
 *  the member's public.profiles row.  Falls back to the auth user's
 *  metadata if the profile row isn't readable yet (e.g. the migration
 *  hasn't been applied), so the UI degrades gracefully.
 *
 *  Returns null when nobody is logged in or Supabase isn't configured —
 *  callers (server components, the account page) treat null as "guest". */

import { createClient } from "@/lib/supabase/server";

export type Member = {
  id: string;
  name: string;
  mobile: string;
  username: string | null;
  email: string | null;
  createdAt: string | null;
};

export async function getCurrentUser(): Promise<Member | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile } = await supabase
      .from("profiles")
      .select("name, mobile, username, email, created_at")
      .eq("id", user.id)
      .maybeSingle();

    const meta = (user.user_metadata ?? {}) as Record<string, string | null>;

    return {
      id: user.id,
      name: profile?.name || meta.name || "",
      mobile: profile?.mobile || meta.mobile || "",
      username: profile?.username ?? meta.username ?? null,
      email: profile?.email ?? meta.email ?? null,
      createdAt: profile?.created_at ?? user.created_at ?? null,
    };
  } catch {
    return null;
  }
}
