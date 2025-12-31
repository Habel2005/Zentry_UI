
const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabase_key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isInvalidConfig = !supabase_url || !supabase_key || !supabase_url.includes('supabase.co');

// We initialize the client even if the config is invalid.
// The checks in the UI will prevent calls from being made with bad credentials.
import { createBrowserClient } from '@supabase/ssr'

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// We export the invalidity flag to be used in UI components.
export const isSupabaseConfigured = !isInvalidConfig;
