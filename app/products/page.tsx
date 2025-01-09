'use client'

import { Header } from '../components/header'
import { ProductCard } from '../components/product-card'
import { useLanguage } from '../contexts/LanguageContext'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Footer } from '../components/footer'
import { products } from '../data/products'
import { TranslationKey } from '../i18n/translations'

export default function ProductsPage() {
  const { t } = useLanguage()

  const categories: TranslationKey[] = ['all', 'shoes', 'clothing', 'accessories', 'electronics']

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">{t('allProducts')}</h1>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {t(category)}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products
                  .filter((product) => category === 'all' || product.category === category)
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      brand={product.brand}
                      price={product.price}
                      originalPrice={product.originalPrice}
                      images={product.images}
                      category={product.category}
                      year={product.year}
                    />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}

