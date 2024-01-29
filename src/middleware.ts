import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  const validRoutes = ['/', '/routes', '/clients']
  const currentRoute = request.nextUrl?.pathname

  const isRouteWithId = currentRoute?.startsWith('/route/') && currentRoute.split('/').length === 3

  if (isRouteWithId) {
    const routeId = currentRoute.split('/')[2]

    if (!routeId) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

  if (!validRoutes.includes(currentRoute)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
