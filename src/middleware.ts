import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const locales = ['en', 'es']
const defaultLocale = 'en'

function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language')
  return acceptLanguage?.split(',')[0].split('-')[0] || defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Check if the pathname already includes a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (!pathnameHasLocale) {
    const locale = getLocale(request)
    // Special case for the root path
    if (pathname === '/') {
      return NextResponse.redirect(new URL(`/${locale}`, request.url))
    }
    // For all other paths, add the locale prefix
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

