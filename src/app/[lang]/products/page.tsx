import ProductCard from '../../components/ProductCard'
import { Product } from '../../types'

const translations = {
  en: {
    allProducts: 'All Products',
  },
  es: {
    allProducts: 'Todos los Productos',
  },
}

const defaultLang = 'en'

// This would typically come from an API or database
const products: Product[] = [
  { id: '1', name: 'Classic Sneakers', category: 'shoes', price: 79.99, image: '/placeholder.svg' },
  { id: '2', name: 'Denim Jeans', category: 'clothes', price: 59.99, image: '/placeholder.svg' },
  { id: '3', name: 'Leather Watch', category: 'accessories', price: 129.99, image: '/placeholder.svg' },
  { id: '4', name: 'Running Shoes', category: 'shoes', price: 89.99, image: '/placeholder.svg' },
  { id: '5', name: 'Cotton T-Shirt', category: 'clothes', price: 24.99, image: '/placeholder.svg' },
  { id: '6', name: 'Sunglasses', category: 'accessories', price: 79.99, image: '/placeholder.svg' },
]

interface PageProps {
  params: Promise<{ lang: string }>
}

export default async function ProductsPage({ params }: PageProps) {
  const { lang } = await params
  const t = translations[lang as keyof typeof translations] || translations[defaultLang]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-foreground">{t.allProducts}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} lang={lang} />
        ))}
      </div>
    </div>
  )
}

