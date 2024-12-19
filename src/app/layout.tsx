import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Upe',
  description: 'Your one-stop shop for shoes, clothes, and accessories',
}

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <html lang={lang}>
      <body className={inter.className}>
        <Header lang={lang} />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer lang={lang} />
      </body>
    </html>
  )
}

