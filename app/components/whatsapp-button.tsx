'use client'

import { PhoneIcon as WhatsappIcon } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

export function WhatsAppButton() {
  const { t } = useLanguage()
  const phoneNumber = '50684492197' // Número de WhatsApp del vendedor
  const message = encodeURIComponent(t('whatsappDefaultMessage'))

  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
      aria-label={t('contactViaWhatsApp')}
    >
      <WhatsappIcon className="w-6 h-6" />
    </button>
  )
}

