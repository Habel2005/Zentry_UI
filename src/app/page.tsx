
'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function Home() {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    redirect('/dashboard');
  } else {
    redirect('/login');
  }
}
