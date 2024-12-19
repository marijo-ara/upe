import ProductCard from '../../../components/ProductCard'
import { Product } from '../../../types'

const translations = {
  en: {
    accessories: 'Accessories',
  },
  es: {
    accessories: 'Accesorios',
  },
}

const defaultLang = 'en'

// This would typically come from an API or database
const products: Product[] = [
  { id: '3', name: 'Leather Watch', category: 'accessories', price: 129.99, image: '/placeholder.svg' },
  { id: '8', name: 'Sunglasses', category: 'accessories', price: 79.99, image: '/placeholder.svg' },
  { id: '9', name: 'Leather Belt', category: 'accessories', price: 39.99, image: '/placeholder.svg' },
]

interface PageProps {
  params: Promise<{ lang: string }>
}

export default async function AccessoriesPage({ params }: PageProps) {
  const { lang } = await params
  const t = translations[lang as keyof typeof translations] || translations[defaultLang]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-foreground">{t.accessories}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} lang={lang} />
        ))}
      </div>
    </div>
  )
}

