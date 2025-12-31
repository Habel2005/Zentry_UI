
import { supabase } from "./supabase";

export async function fetchDashboardOverview() {
  if (!supabase) throw new Error("Supabase client is not initialized.");
  return supabase.from("admin_calls_overview").select("*").limit(1);
}

interface FetchCallListParams {
    page: number;
    pageSize: number;
    status?: string;
    language?: string;
}

export async function fetchCallList({ page, pageSize, status, language }: FetchCallListParams) {
    if (!supabase) throw new Error("Supabase client is not initialized.");

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
        .from("admin_call_list")
        .select("*", { count: "exact" })
        .range(from, to)
        .order('call_start_time', { ascending: false });

    if (status) {
        query = query.eq('call_status', status);
    }
    if (language) {
        query = query.eq('language_detected', language);
    }

    return query;
}

export async function fetchCallDetail(callId: string) {
    if (!supabase) throw new Error("Supabase client is not initialized.");
  return supabase
    .from("admin_call_detail")
    .select("*")
    .eq("call_id", callId);
}
