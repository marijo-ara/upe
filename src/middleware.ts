import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const locales = ['es', 'en']; // Idiomas soportados
const defaultLocale = 'es';

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  const detectedLocale = acceptLanguage?.split(',')[0].split('-')[0] || '';
  return locales.includes(detectedLocale) ? detectedLocale : defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Verificar si la ruta ya incluye un prefijo de idioma
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next(); // Continuar sin redirigir
  }

  const locale = getLocale(request);

  // Redirigir a la ruta con el prefijo del idioma
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};