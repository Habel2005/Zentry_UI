
import { createClient } from "@supabase/supabase-js";

const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabase_key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isInvalidConfig = !supabase_url || !supabase_key || !supabase_url.includes('supabase.co');

// We initialize the client even if the config is invalid.
// The checks in the UI will prevent calls from being made with bad credentials.
export const supabase = createClient(
  supabase_url || 'http://localhost:54321', // Provide a dummy URL if not set
  supabase_key || 'dummy-key'
);

// We export the invalidity flag to be used in UI components.
export const isSupabaseConfigured = !isInvalidConfig;
