'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { useCart } from '../contexts/CartContext'
import { useLanguage } from '../contexts/LanguageContext'
import { formatPrice } from '../utils/currency'
import { PaymentConfirmation } from '../components/payment-confirmation'

export default function Checkout() {
  const { getCartTotal, clearCart } = useCart()
  const { t } = useLanguage()
  //const router = useRouter()
  const [isPaymentComplete, setIsPaymentComplete] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Simulate payment process
    setTimeout(() => {
      setIsPaymentComplete(true)
      clearCart()
    }, 2000)
  }

  if (isPaymentComplete) {
    return <PaymentConfirmation />
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">{t('checkout')}</h1>
        <div className="max-w-md mx-auto mb-8">
          <h2 className="text-xl font-bold mb-4">{t('orderSummary')}</h2>
          <div className="flex justify-between items-center">
            <p>{t('total')}</p>
            <p className="font-bold">{formatPrice(getCartTotal())}</p>
          </div>
        </div>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">{t('fullName')}</Label>
              <Input id="name" placeholder={t('fullNamePlaceholder')} required />
            </div>
            <div>
              <Label htmlFor="email">{t('email')}</Label>
              <Input id="email" type="email" placeholder={t('emailPlaceholder')} required />
            </div>
            <div>
              <Label htmlFor="address">{t('address')}</Label>
              <Input id="address" placeholder={t('addressPlaceholder')} required />
            </div>
            <div>
              <Label htmlFor="card">{t('creditCardNumber')}</Label>
              <Input id="card" placeholder={t('creditCardPlaceholder')} required />
            </div>
            <Button type="submit" className="w-full">{t('placeOrder')}</Button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  )
}

