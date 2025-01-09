import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Registrar cada solicitud
  console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`)

  // Verificar si el usuario está intentando acceder a la página de perfil
  if (request.nextUrl.pathname.startsWith('/profile')) {
    // En una aplicación real, verificaríamos el token de autenticación aquí
    // Por ahora, simplemente verificamos si existe una cookie 'auth'
    const authCookie = request.cookies.get('auth')
    
    if (!authCookie) {
      // Si no hay cookie de autenticación, redirigir al inicio de sesión
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Para todas las demás rutas, permitir que la solicitud continúe
  return NextResponse.next()
}

// Configurar el middleware para que se ejecute solo en las rutas especificadas
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

