'use client'

import { useLanguage } from '../contexts/LanguageContext'
import { Button } from '../components/ui/button'
import { WifiOff } from 'lucide-react'

export default function OfflinePage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center">
        <WifiOff className="mx-auto h-12 w-12 text-gray-400" />
        <h1 className="mt-4 text-2xl font-bold">Sin conexión</h1>
        <p className="mt-2 text-gray-600">
          Parece que no tienes conexión a internet. Verifica tu conexión e intenta nuevamente.
        </p>
        <Button
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Reintentar
        </Button>
      </div>
    </div>
  )
}

