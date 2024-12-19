const Footer = ({ lang }: { lang: string }) => {
  const translations = {
    en: {
      copyright: 'All rights reserved.',
    },
    es: {
      copyright: 'Todos los derechos reservados.',
    },
  }

  const defaultLang = 'es'
  const t = translations[lang as keyof typeof translations] || translations[defaultLang]

  const currentYear = new Date().getFullYear()
  const copyright = `© ${currentYear} UPE. ${t.copyright}`

  return (
    <footer className="bg-muted mt-12">
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-muted-foreground">{copyright}</p>
      </div>
    </footer>
  )
}

export default Footer

