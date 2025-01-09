'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from './header'
import { Footer } from './footer'
import { useLanguage } from '../contexts/LanguageContext'
import { CheckCircle } from 'lucide-react'

export function PaymentConfirmation() {
  const { t } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4 flex flex-col items-center justify-center">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">{t('paymentConfirmed')}</h1>
          <p className="text-xl mb-8">{t('thankYouForPurchase')}</p>
          <p>{t('redirectingToHome')}</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

