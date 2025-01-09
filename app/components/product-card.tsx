'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { useLanguage } from '../contexts/LanguageContext'
import { useCart } from '../contexts/CartContext'
import { formatPrice } from '../utils/currency'

interface ProductCardProps {
  id: string
  name: string
  brand: string
  price: number
  originalPrice: number
  images: string[]
  category: 'shoes' | 'clothing' | 'accessories' | 'electronics'
  year?: number
}

export function ProductCard({ id, name, brand, price, originalPrice, images, category, year }: ProductCardProps) {
  const { t } = useLanguage();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, name, price });
  };

  const savings = originalPrice - price;
  const savingsPercentage = Math.round((savings / originalPrice) * 100);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg md:text-xl">
          <Link href={`/producto/${id}`} className="hover:underline">
            {name}
          </Link>
        </CardTitle>
        <p className="text-sm text-primary-foreground">{brand}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
          <Image
            src={images[0] || "/placeholder.svg"}
            alt={name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
          <p className="font-bold text-lg">{formatPrice(price)}</p>
          <p className="text-sm line-through text-gray-500">{formatPrice(originalPrice)}</p>
        </div>
        <p className="text-sm text-green-600 mb-2">
          {t('savings')}: {formatPrice(savings)} ({savingsPercentage}% off)
        </p>
        <div className="text-sm text-gray-600">
          <p>{t('category')}: {t(category)}</p>
          {category === 'shoes' && year && <p>{t('year')}: {year}</p>}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-primary text-primary-foreground hover:bg-opacity-90"
          onClick={handleAddToCart}
        >
          {t('addToCart')}
        </Button>
      </CardFooter>
    </Card>
  )
}

