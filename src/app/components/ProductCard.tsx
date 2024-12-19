import Image from 'next/image'
import Link from 'next/link'
import { Product } from '../types'

type ProductCardProps = {
  product: Product
  lang: string
}

const ProductCard = ({ product, lang }: ProductCardProps) => {
  return (
    <Link href={`/${lang}/products/${product.id}`} className="group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">${product.price.toFixed(2)}</p>
    </Link>
  )
}

export default ProductCard

