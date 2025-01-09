'use client'

import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import { Modal } from './ui/modal'
import { Button } from '../components/ui/button'
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Checkbox } from "../components/ui/checkbox"
import { ChromeIcon as Google, Facebook, Mail } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { t } = useLanguage()
  const { loginWithGoogle, loginWithFacebook, loginWithEmail, registerWithEmail } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [isSeller, setIsSeller] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isRegistering) {
        await registerWithEmail(email, password, isSeller, isAdmin)
        toast.success(t('registrationSuccessful'))
      } else {
        await loginWithEmail(email, password)
        toast.success(t('loginSuccessful'))
      }
      onClose()
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isRegistering ? t('register') : t('login')}>
      <div className="space-y-4">
        {!isRegistering && (
          <>
            <Button onClick={() => { loginWithGoogle(); onClose(); }} className="w-full flex items-center justify-center text-sm md:text-base">
              <Google className="mr-2 h-4 w-4" />
              {t('loginWithGoogle')}
            </Button>
            <Button onClick={() => { loginWithFacebook(); onClose(); }} className="w-full flex items-center justify-center text-sm md:text-base">
              <Facebook className="mr-2 h-4 w-4" />
              {t('loginWithFacebook')}
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  {t('orLoginWithEmail')}
                </span>
              </div>
            </div>
          </>
        )}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm md:text-base">{t('email')}</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm md:text-base">{t('password')}</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>
          {isRegistering && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isSeller"
                  checked={isSeller}
                  onCheckedChange={(checked) => setIsSeller(checked as boolean)}
                />
                <Label htmlFor="isSeller">{t('registerAsSeller')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isAdmin"
                  checked={isAdmin}
                  onCheckedChange={(checked) => setIsAdmin(checked as boolean)}
                />
                <Label htmlFor="isAdmin">{t('registerAsAdmin')}</Label>
              </div>
            </div>
          )}
          <Button type="submit" className="w-full flex items-center justify-center text-sm md:text-base">
            <Mail className="mr-2 h-4 w-4" />
            {isRegistering ? t('register') : t('login')}
          </Button>
        </form>
        <Button
          variant="link"
          onClick={() => setIsRegistering(!isRegistering)}
          className="w-full text-sm md:text-base"
        >
          {isRegistering ? t('alreadyHaveAccount') : t('dontHaveAccount')}
        </Button>
      </div>
    </Modal>
  )
}

