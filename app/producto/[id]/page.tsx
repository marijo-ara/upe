'use client'

import { useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { Header } from '../../components/header'
import { Footer } from '../../components/footer'
import { useLanguage } from '../../contexts/LanguageContext'
import { products } from '../../data/products'
import { formatPrice } from '../../utils/currency'
import { formatDate } from '../../utils/date'
import { Button } from '../../components/ui/button'
import { useCart } from '../../contexts/CartContext'
import { ImageCarousel } from '../../components/image-carousel'
import { ProductReviews } from '../../components/product-reviews'
import Image from 'next/image'
import { Comment, Product } from '../../types'
import { toast } from 'react-hot-toast'

export default function ProductPage() {
  const params = useParams()
  const id = typeof params?.id === 'string' ? params.id : undefined
  const { t } = useLanguage()
  const { addToCart } = useCart()
  
  const product = products.find(p => p.id === id) as Product | undefined

  const [comments, setComments] = useState<Comment[]>(product?.comments || [])
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const validImages = useMemo(() => product?.images.filter(img => img && img.trim() !== '') || [], [product])

  if (!product) {
    return <div>{t('productNotFound')}</div>
  }

  const handleAddToCart = () => {
    setIsAddingToCart(true)
    try {
      addToCart({ id: product.id, name: product.name, price: product.price })
      toast.success(t('addedToCart'))
    } catch (error) {
      console.error('Error adding to cart:', error)
      toast.error(t('errorAddingToCart'))
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleAddComment = (content: string, rating: number) => {
    const newComment: Comment = {
      id: `${comments.length + 1}`,
      userId: 'currentUser',
      username: 'Usuario Actual',
      content,
      rating,
      createdAt: new Date(),
    }
    setComments([...comments, newComment])
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {validImages.length > 0 ? (
            <ImageCarousel images={validImages} alt={product.name} />
          ) : (
            <div className="relative w-full h-96">
              <Image
                src="/placeholder.svg"
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          )}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-xl font-semibold">{t('brand')}: {product.brand}</p>
            <p className="text-2xl font-bold text-primary">{formatPrice(product.price)}</p>
            <p className="text-lg line-through text-gray-500">{formatPrice(product.originalPrice)}</p>
            <p>{t('category')}: {t(product.category)}</p>
            {product.year && <p>{t('year')}: {product.year}</p>}
            <p>{t('seller')}: {product.seller}</p>
            <p>{t('registrationDate')}: {formatDate(product.registrationDate)}</p>
            <Button onClick={handleAddToCart} className="w-full bg-primary text-white hover:bg-opacity-90" disabled={isAddingToCart}>
              {isAddingToCart ? t('adding') : t('addToCart')}
            </Button>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">{t('productDescription')}</h2>
          <p>{product.description}</p>
        </div>
        <div className="mt-8">
          <ProductReviews comments={comments} onAddComment={handleAddComment} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

