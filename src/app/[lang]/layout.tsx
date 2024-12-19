
import '../globals.css'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { AuthProvider } from '../contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'es' ? 'UPE - Tu tienda de moda' : 'UPE - Your fashion store',
    description: lang === 'es' 
      ? 'Descubre las últimas tendencias en zapatos, ropa y accesorios' 
      : 'Discover the latest trends in shoes, clothes, and accessories',
  }
}

export default async function LangLayout({ children, params }: LayoutProps) {
  let lang: string
  try {
    ({ lang } = await params)
  } catch (error) {
    console.error('Error resolving language parameter:', error)
    lang = 'es' // Default to English if there's an error
  }

  return (
    <html lang={lang}>
    <body className={inter.className}>
      <AuthProvider>
        <Header lang={lang} />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer lang={lang} />
      </AuthProvider>
    </body>
  </html>
)
}

