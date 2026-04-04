import type { SupabaseClient } from "@supabase/supabase-js";

export const GOOGLE_WAITLIST_STORAGE_KEY = "kilo-google-waitlist-pending";

export async function signInWithGoogle(
  supabase: SupabaseClient,
  redirectTo: string
) {
  return supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
    },
  });
}
