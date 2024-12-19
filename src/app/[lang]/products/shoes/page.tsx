import ProductCard from '../../../components/ProductCard'
import { Product } from '../../../types'

const translations = {
  en: {
    shoes: 'Shoes',
  },
  es: {
    shoes: 'Zapatos',
  },
}

const defaultLang = 'en'

// This would typically come from an API or database
const products: Product[] = [
  { id: '1', name: 'Classic Sneakers', category: 'shoes', price: 79.99, image: '/placeholder.svg' },
  { id: '4', name: 'Running Shoes', category: 'shoes', price: 89.99, image: '/placeholder.svg' },
  { id: '5', name: 'Leather Boots', category: 'shoes', price: 129.99, image: '/placeholder.svg' },
]

interface PageProps {
  params: Promise<{ lang: string }>
}

export default async function ShoesPage({ params }: PageProps) {
  const { lang } = await params
  const t = translations[lang as keyof typeof translations] || translations[defaultLang]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground">{t.shoes}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} lang={lang} />
        ))}
      </div>
    </div>
  )
}

