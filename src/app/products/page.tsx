import ProductCard from '../components/ProductCard'
import { Product } from '../types'

// This would typically come from an API or database
const products: Product[] = [
  { id: '1', name: 'Classic Sneakers', category: 'shoes', price: 79.99, image: '/placeholder.svg' },
  { id: '2', name: 'Denim Jeans', category: 'clothes', price: 59.99, image: '/placeholder.svg' },
  { id: '3', name: 'Leather Watch', category: 'accessories', price: 129.99, image: '/placeholder.svg' },
  // Add more products as needed
]

export default function ProductsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard lang="ES" key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

