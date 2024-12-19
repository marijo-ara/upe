import ProductCard from '../../../components/ProductCard'
import { Product } from '../../../types'

const translations = {
  en: {
    clothes: 'Clothes',
  },
  es: {
    clothes: 'Ropa',
  },
}

const defaultLang = 'en'

// This would typically come from an API or database
const products: Product[] = [
  { id: '2', name: 'Denim Jeans', category: 'clothes', price: 59.99, image: '/placeholder.svg' },
  { id: '6', name: 'Cotton T-Shirt', category: 'clothes', price: 24.99, image: '/placeholder.svg' },
  { id: '7', name: 'Winter Jacket', category: 'clothes', price: 149.99, image: '/placeholder.svg' },
]

interface PageProps {
  params: Promise<{ lang: string }>
}

export default async function ClothesPage({ params }: PageProps) {
  const { lang } = await params
  const t = translations[lang as keyof typeof translations] || translations[defaultLang]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-foreground">{t.clothes}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} lang={lang} />
        ))}
      </div>
    </div>
  )
}

