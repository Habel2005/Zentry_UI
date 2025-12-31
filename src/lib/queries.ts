import { supabase } from "./supabase";

export async function fetchDashboardOverview() {
  if (!supabase) throw new Error("Supabase client is not initialized.");
  return supabase.from("admin_calls_overview").select("*").limit(1);
}

export async function fetchCallList(from: number, to: number) {
    if (!supabase) throw new Error("Supabase client is not initialized.");
  return supabase
    .from("admin_call_list")
    .select("*")
    .range(from, to);
}

export async function fetchCallDetail(callId: string) {
    if (!supabase) throw new Error("Supabase client is not initialized.");
  return supabase
    .from("admin_call_detail")
    .select("*")
    .eq("call_id", callId);
}
