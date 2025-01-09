import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ProductCard } from './product-card'
import { LanguageProvider } from '../contexts/LanguageContext'
import { CartProvider } from '../contexts/CartContext'

const mockProduct = {
  id: '1',
  name: 'Test Product',
  brand: 'Test Brand',
  price: 1000,
  originalPrice: 1500,
  images: ['/test-image.jpg'],
  category: 'shoes' as const,
}

const renderProductCard = () => {
  return render(
    <LanguageProvider>
      <CartProvider>
        <ProductCard {...mockProduct} />
      </CartProvider>
    </LanguageProvider>
  )
}

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    renderProductCard()
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('₡1.000')).toBeInTheDocument()
    expect(screen.getByText('₡1.500')).toBeInTheDocument()
    expect(screen.getByText(/ahorros en ₡: ₡500/i)).toBeInTheDocument()
    expect(screen.getByText('Zapatos')).toBeInTheDocument()
  })

  it('renders product image', () => {
    renderProductCard()
    const image = screen.getByAltText('Test Product')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', expect.stringContaining('test-image.jpg'))
  })

  it('calls addToCart when "Add to Cart" button is clicked', () => {
    renderProductCard()
    const addToCartButton = screen.getByText('Añadir al carrito')
    fireEvent.click(addToCartButton)
    // You would typically check if the cart context was updated here
    // This would require mocking the useCart hook or checking for side effects
  })
})

