import { type NextRequest, NextResponse } from 'next/server'

// DEV MODE: Set to true to bypass auth checks (for local preview without Supabase)
const DEV_BYPASS_AUTH = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://your-project.supabase.co'

// Routes that require authentication
const PROTECTED_ROUTES = ['/empresa', '/trabalhador', '/admin']

// Routes that authenticated users should not access
const AUTH_ROUTES = ['/login', '/cadastro']

// Role-based route restrictions
const ROLE_ROUTES: Record<string, string[]> = {
  empresa: ['/empresa'],
  trabalhador: ['/trabalhador'],
  admin: ['/admin'],
}

export async function middleware(request: NextRequest) {
  // Bypass all auth when Supabase is not configured
  if (DEV_BYPASS_AUTH) {
    return NextResponse.next()
  }

  const { updateSession } = await import('@/lib/supabase/middleware')
  const { supabaseResponse, user, supabase } = await updateSession(request)
  const { pathname } = request.nextUrl

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  )
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route))

  // Redirect unauthenticated users away from protected routes
  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // Redirect authenticated users away from auth routes
  if (isAuthRoute && user) {
    // Get user role to redirect to the correct dashboard
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    const url = request.nextUrl.clone()
    const role = profile?.role as string | undefined

    if (role === 'empresa') {
      url.pathname = '/empresa/dashboard'
    } else if (role === 'trabalhador') {
      url.pathname = '/trabalhador/dashboard'
    } else if (role === 'admin') {
      url.pathname = '/admin/dashboard'
    } else {
      url.pathname = '/'
    }

    return NextResponse.redirect(url)
  }

  // Role-based access control for protected routes
  if (isProtectedRoute && user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    const role = profile?.role as string | undefined

    if (role) {
      const allowedRoutes = ROLE_ROUTES[role] || []
      const hasAccess = allowedRoutes.some((route) =>
        pathname.startsWith(route)
      )

      // Admin has access to everything
      if (role === 'admin') {
        return supabaseResponse
      }

      if (!hasAccess) {
        const url = request.nextUrl.clone()
        url.pathname = `/${role}/dashboard`
        return NextResponse.redirect(url)
      }
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon)
     * - public folder files (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
