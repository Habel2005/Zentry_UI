
import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    // If supabase is not configured, we can't do anything.
    if (!supabaseUrl || !supabaseKey || !supabaseUrl.includes('supabase.co')) {
        return NextResponse.next();
    }
    
    let response = NextResponse.next({
        request: {
          headers: request.headers,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get(name: string) {
              return request.cookies.get(name)?.value
            },
            set(name: string, value: string, options: CookieOptions) {
              response.cookies.set({
                name,
                value,
                ...options,
              })
            },
            remove(name: string, options: CookieOptions) {
              response.cookies.set({
                name,
                value: '',
                ...options,
              })
            },
          },
        }
    )

    const {
        data: { session },
    } = await supabase.auth.getSession()

    const { pathname } = request.nextUrl

    const protectedRoutes = [
      '/dashboard',
      '/calls',
      '/callers',
      '/admission-baseline',
    ];

    const isProtected = protectedRoutes.some(route =>
      pathname.startsWith(route)
    );

    if (isProtected && !session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return response;
}

export const config = {
    matcher: [
        /*
        * Match all request paths except for the ones starting with:
        * - _next/static (static files)
        * - _next/image (image optimization files)
        * - favicon.ico (favicon file)
        * - auth (Supabase auth routes)
        * - api (API routes)
        */
        '/((?!_next/static|_next/image|favicon.ico|auth|api).*)',
    ],
}
