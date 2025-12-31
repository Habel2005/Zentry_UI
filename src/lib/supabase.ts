import { createClient } from "@supabase/supabase-js";

let supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL;
let supabase_key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// A simple check to see if the URL is a placeholder
const isInvalidUrl = (url?: string) => !url || !url.includes('supabase.co');

let supabaseInstance: ReturnType<typeof createClient> | null = null;

if (!isInvalidUrl(supabase_url) && supabase_key) {
    supabaseInstance = createClient(supabase_url!, supabase_key!);
}

export const supabase = supabaseInstance;
