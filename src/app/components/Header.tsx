'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCart } from 'lucide-react'
import { Button } from './ui/Button'
import AuthButtons from './AuthButtons'

const locales = ['en', 'es']

const translations = {
  en: {
    home: 'Home',
    allProducts: 'All Products',
    shoes: 'Shoes',
    clothes: 'Clothes',
    accessories: 'Accessories',
  },
  es: {
    home: 'Inicio',
    allProducts: 'Todos los Productos',
    shoes: 'Zapatos',
    clothes: 'Ropa',
    accessories: 'Accesorios',
  },
}

const Header = ({ lang }: { lang: string }) => {
  const pathname = usePathname()
  const defaultLang = 'en'
  const t = translations[lang as keyof typeof translations] || translations[defaultLang]

  const switchLanguage = (newLang: string) => {
    const currentPathname = pathname.replace(`/${lang}`, '')
    return `/${newLang}${currentPathname}`
  }

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href={`/${lang}`} className="flex items-center">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
            <rect width="40" height="40" rx="8" fill="#4A5568"/>
            <path d="M10 15H30M10 20H30M10 25H30" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-2xl font-bold text-foreground">UPE</span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href={`/${lang}/products`} className="text-muted-foreground hover:text-foreground">{t.allProducts}</Link></li>
            <li><Link href={`/${lang}/products/shoes`} className="text-muted-foreground hover:text-foreground">{t.shoes}</Link></li>
            <li><Link href={`/${lang}/products/clothes`} className="text-muted-foreground hover:text-foreground">{t.clothes}</Link></li>
            <li><Link href={`/${lang}/products/accessories`} className="text-muted-foreground hover:text-foreground">{t.accessories}</Link></li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <Link href={`/${lang}/cart`} className="text-muted-foreground hover:text-foreground">
            <ShoppingCart className="h-6 w-6" />
          </Link>
          <AuthButtons />
          <div className="flex space-x-2">
            {locales.map((locale) => (
              <Button
                key={locale}
                variant={locale === lang ? 'default' : 'outline'}
                size="sm"
                asChild
              >
                <Link href={switchLanguage(locale)}>{locale.toUpperCase()}</Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

