'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])

  if (loading) {
    return <div>{t('loading')}</div>
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">{t('profile')}</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <p><strong>{t('email')}:</strong> {user.email}</p>
          {user.displayName && <p><strong>{t('name')}:</strong> {user.displayName}</p>}
        </div>
      </main>
      <Footer />
    </div>
  )
}

