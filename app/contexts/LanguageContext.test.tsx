import React from 'react'
import { render, act } from '@testing-library/react'
import { LanguageProvider, useLanguage } from './LanguageContext'

const TestComponent = () => {
  const { language, setLanguage, t } = useLanguage()
  return (
    <div>
      <p data-testid="language">{language}</p>
      <p data-testid="translated">{t('welcome')}</p>
      <button onClick={() => setLanguage('en')}>Change to English</button>
    </div>
  )
}

describe('LanguageContext', () => {
  it('provides the correct default language', () => {
    const { getByTestId } = render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )
    expect(getByTestId('language').textContent).toBe('es')
  })

  it('translates correctly', () => {
    const { getByTestId } = render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )
    expect(getByTestId('translated').textContent).toBe('Bienvenido a Glassfrog')
  })

  it('changes language correctly', () => {
    const { getByTestId, getByText } = render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    )
    act(() => {
      getByText('Change to English').click()
    })
    expect(getByTestId('language').textContent).toBe('en')
    expect(getByTestId('translated').textContent).toBe('Welcome to Glassfrog')
  })
})

