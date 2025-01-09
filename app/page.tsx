'use client'
import { Header } from './components/header'
import { Footer } from './components/footer'
import { Button } from './components/ui/button'
import { ShoppingBag, Shirt, FootprintsIcon as Shoe, Watch, Globe, Laptop } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from './contexts/LanguageContext'
import { Logo } from './components/logo'
import { useAuth } from './contexts/AuthContext'

export default function Home() {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="container mx-auto py-8 px-4 flex-grow">
        <section className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary flex items-center justify-center">
            <Logo className="mr-2 h-10 w-10" />
            {t('welcome')}
          </h1>
          <div className="flex items-center justify-center mb-6">
            <Globe className="w-8 h-8 text-primary mr-2" />
            <p className="text-xl font-semibold">{t('virtualStoreDescription')}</p>
          </div>
          {user && (
            <div className="mb-6">
              <p className="text-lg font-semibold">{t('welcomeUser', { name: user.displayName || user.email || '' })}</p>
              <p className="text-md">{t('yourRole')}: {t(user.role || 'buyer')}</p>
            </div>
          )}
          {user?.role === 'admin' && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">{t('adminDashboard')}</h2>
              <Link href="/admin">
                <Button className="bg-primary text-white hover:bg-opacity-90">
                  {t('goToAdminDashboard')}
                </Button>
              </Link>
            </div>
          )}
          {user?.role === 'seller' && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">{t('sellerDashboard')}</h2>
              <Link href="/seller">
                <Button className="bg-primary text-white hover:bg-opacity-90">
                  {t('goToSellerDashboard')}
                </Button>
              </Link>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="flex flex-col items-center">
              <Shoe className="w-16 h-16 text-primary mb-4" />
              <h2 className="text-2xl font-semibold mb-2">{t('shoes')}</h2>
              <p>{t('shoesDescription')}</p>
            </div>
            <div className="flex flex-col items-center">
              <Shirt className="w-16 h-16 text-primary mb-4" />
              <h2 className="text-2xl font-semibold mb-2">{t('clothing')}</h2>
              <p>{t('clothingDescription')}</p>
            </div>
            <div className="flex flex-col items-center">
              <Watch className="w-16 h-16 text-primary mb-4" />
              <h2 className="text-2xl font-semibold mb-2">{t('accessories')}</h2>
              <p>{t('accessoriesDescription')}</p>
            </div>
            <div className="flex flex-col items-center">
              <Laptop className="w-16 h-16 text-primary mb-4" />
              <h2 className="text-2xl font-semibold mb-2">{t('electronics')}</h2>
              <p>{t('electronicsDescription')}</p>
            </div>
          </div>
          <Link href="/products">
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-opacity-90 w-full sm:w-auto text-lg py-6 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
              <ShoppingBag className="mr-3 h-6 w-6" />
              {t('buy')}
            </Button>
          </Link>
        </section>

        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <div className="card-header flex items-center">
                <span className="text-2xl font-bold mr-2">₡</span>
                <h3 className="text-xl font-semibold">{t('lowerPrices')}</h3>
              </div>
              <div className="card-body">
                <p className="text-gray-600">{t('lowerPricesDesc')}</p>
              </div>
            </div>
            <div className="card">
              <div className="card-header flex items-center">
                <span className="text-2xl font-bold mr-2">📦</span>
                <h3 className="text-xl font-semibold">{t('costaRicanPostOffice')}</h3>
              </div>
              <div className="card-body">
                <p className="text-gray-600">{t('costaRicanPostOfficeDesc')}</p>
              </div>
            </div>
            <div className="card">
              <div className="card-header flex items-center">
                <span className="text-2xl font-bold mr-2">📞</span>
                <h3 className="text-xl font-semibold">{t('directContact')}</h3>
              </div>
              <div className="card-body">
                <p className="text-gray-600">{t('directContactDesc')}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary text-primary-foreground p-4 md:p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('howItWorks')}</h2>
          <ol className="list-decimal list-inside space-y-2 md:space-y-4 text-sm md:text-base">
            <li>{t('step1')}</li>
            <li>{t('step2')}</li>
            <li>{t('step3')}</li>
            <li>{t('step4')}</li>
            <li>{t('step5')}</li>
          </ol>
        </section>
      </main>
      <Footer />
    </div>
  )
}

