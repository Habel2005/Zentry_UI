
import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function middleware(request: NextRequest) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    // If supabase is not configured, we can't do anything.
    if (!supabaseUrl || !supabaseKey || !supabaseUrl.includes('supabase.co')) {
        return NextResponse.next();
    }
    
    const supabase = createClient(request)

    // Refresh session if expired - required for Server Components
    const {
        data: { session },
    } = await supabase.auth.getSession()

    const { pathname } = request.nextUrl

    // If the user is not logged in and is trying to access a protected route,
    // redirect them to the login page.
    if (!session && pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // If the user is logged in and tries to access the login page,
    // redirect them to the dashboard.
    if (session && pathname === '/login') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
        * Match all request paths except for the ones starting with:
        * - _next/static (static files)
        * - _next/image (image optimization files)
        * - favicon.ico (favicon file)
        */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}
