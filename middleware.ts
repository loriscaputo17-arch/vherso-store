import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const countryOverride = req.nextUrl.searchParams.get('country')
  const country = countryOverride || req.headers.get('x-vercel-ip-country') || 'IT'

  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-country', country)

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  })

  response.cookies.set('x-country', country, {
    path: '/',
    maxAge: 60 * 60 * 24,
    sameSite: 'lax',
  })

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|logo.png|fonts).*)'],
}