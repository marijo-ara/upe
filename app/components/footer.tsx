import { useLanguage } from '../contexts/LanguageContext'

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground py-4 mt-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">{t('allRightsReserved')} &copy; {new Date().getFullYear()} Glassfrog</p>
      </div>
    </footer>
  )
}

