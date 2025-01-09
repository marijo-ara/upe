import '../styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { LanguageProvider } from './contexts/LanguageContext'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { Toaster } from 'react-hot-toast'
import { WhatsAppButton } from './components/whatsapp-button'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Glassfrog',
  description: 'Tu tienda en línea para productos de marca',
  manifest: '/manifest.json',
  themeColor: '#1a3a6e',
  viewport: 'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
  icons: [
    { rel: 'apple-touch-icon', url: '/icons/sun-icon-192x192.png' },
    { rel: 'shortcut icon', url: '/icons/sun-icon-32x32.png' }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <meta name="application-name" content="Glassfrog" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Glassfrog" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#1a3a6e" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/sun-icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/sun-icon-16x16.png" />
        <link rel="mask-icon" href="/icons/sun-icon-mask.svg" color="#1a3a6e" />
      </head>
      <body className={`${inter.className} bg-background text-text`}>
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              {children}
              <Toaster />
              <WhatsAppButton />
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}

