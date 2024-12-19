import Link from 'next/link'
import { Button } from './components/ui/Button'

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Fashion Store</h1>
        <p className="text-xl text-gray-600 mb-8">Discover the latest trends in shoes, clothes, and accessories</p>
        <Button asChild>
          <Link href="/products">Shop Now</Link>
        </Button>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Shoes', 'Clothes', 'Accessories'].map((category) => (
            <div key={category} className="bg-gray-100 p-6 rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-2">{category}</h3>
              <Button variant="outline" asChild>
                <Link href={`/products/${category.toLowerCase()}`}>View {category}</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

