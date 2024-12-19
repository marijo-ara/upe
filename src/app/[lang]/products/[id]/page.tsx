import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Button } from '../../../components/ui/Button'
import { Product } from '../../../types'

const translations = {
  en: {
    category: 'Category',
    addToCart: 'Add to Cart',
    notFound: 'Product not found',
  },
  es: {
    category: 'Categoría',
    addToCart: 'Añadir al Carrito',
    notFound: 'Producto no encontrado',
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
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params
  const lang = defaultLang // In a real app, you'd get this from the URL or context

  const t = translations[lang as keyof typeof translations] || translations[defaultLang]

  const product = products.find(p => p.id === id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
          <p className="text-2xl font-semibold text-primary">${product.price.toFixed(2)}</p>
          <p className="text-muted-foreground capitalize">{t.category}: {product.category}</p>
          <Button>{t.addToCart}</Button>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }))
}

