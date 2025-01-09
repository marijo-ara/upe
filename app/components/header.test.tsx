import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Header } from './header'
import { LanguageProvider } from '../contexts/LanguageContext'
import { AuthProvider } from '../contexts/AuthContext'
import { CartProvider } from '../contexts/CartContext'

// Mock the next/link component
jest.mock('next/link', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return children
  }
})

// Mock the firebase auth
jest.mock('../lib/firebase', () => ({
  auth: {
    onAuthStateChanged: jest.fn(),
  },
  db: {},
}))

const renderHeader = () => {
  return render(
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <Header />
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  )
}

describe('Header', () => {
  it('renders without crashing', () => {
    renderHeader()
    expect(screen.getByText('Glassfrog')).toBeInTheDocument()
  })

  it('displays correct navigation items', () => {
    renderHeader()
    expect(screen.getByText('es')).toBeInTheDocument()
    expect(screen.getByText(/carrito/i)).toBeInTheDocument()
  })

  it('changes language when language button is clicked', () => {
    renderHeader()
    const languageButton = screen.getByText('es')
    fireEvent.click(languageButton)
    expect(screen.getByText('en')).toBeInTheDocument()
  })

  it('opens cart modal when cart button is clicked', () => {
    renderHeader()
    const cartButton = screen.getByText(/carrito/i)
    fireEvent.click(cartButton)
    expect(screen.getByText('Tu carrito está vacío')).toBeInTheDocument()
  })
})

