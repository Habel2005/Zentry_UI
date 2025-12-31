
'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function Home() {
  // Check if Supabase env vars are set. If not, redirect to login which will show an error.
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey || !supabaseUrl.includes('supabase.co')) {
    redirect('/login');
  }

  const supabase = createClient();
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    redirect('/dashboard');
  } else {
    redirect('/login');
  }
}
