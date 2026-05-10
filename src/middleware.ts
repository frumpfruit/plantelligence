import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check for session cookie
  const session = request.cookies.get('session')

  // Public paths that don't require authentication
  const isPublicPath = request.nextUrl.pathname === '/login'

  // If there's no session and the user is trying to access a protected route
  if (!session && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If there's a session and the user is trying to access the login page
  if (session && isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - images (public images)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
  ],
}
