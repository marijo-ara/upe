import Link from 'next/link'
import { Button } from '../components/ui/Button'

const translations = {
  en: {
    welcome: 'Welcome to UPE',
    description: 'Discover the latest trends in shoes, clothes, and accessories',
    shopNow: 'Shop Now',
    featuredCategories: 'Featured Categories',
    shoes: 'Shoes',
    clothes: 'Clothes',
    accessories: 'Accessories',
    view: 'View',
  },
  es: {
    welcome: 'Bienvenido a UPE',
    description: 'Descubre las últimas tendencias en zapatos, ropa y accesorios',
    shopNow: 'Comprar Ahora',
    featuredCategories: 'Categorías Destacadas',
    shoes: 'Zapatos',
    clothes: 'Ropa',
    accessories: 'Accesorios',
    view: 'Ver',
  },
}

interface PageProps {
  params: Promise<{ lang: string }>
}

export default async function Home({ params }: PageProps) {
  const { lang } = await params
  const defaultLang = 'es'
  const t = translations[lang as keyof typeof translations] || translations[defaultLang]

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-foreground">{t.welcome}</h1>
        <p className="text-xl text-muted-foreground mb-8">{t.description}</p>
        <Button asChild>
          <Link href={`/${lang}/products`}>{t.shopNow}</Link>
        </Button>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">{t.featuredCategories}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['shoes', 'clothes', 'accessories'].map((category) => (
            <div key={category} className="bg-card p-6 rounded-lg text-center shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">{t[category as keyof typeof t]}</h3>
              <Button variant="outline" asChild>
                <Link href={`/${lang}/products/${category}`}>{t.view}</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

