'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, LogIn, LogOut, User } from 'lucide-react'
import { Button } from "../components/ui/button"
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import { LoginModal } from './login-modal'
import { CartModal } from './cart-modal'
import { Logo } from './logo'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const { items } = useCart();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-primary text-primary-foreground py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center text-2xl font-bold">
          <Logo className="w-6 h-6 mr-2" />
          Glassfrog
        </Link>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            aria-label={t('changeLanguage')}
            className="text-primary-foreground hover:text-secondary uppercase"
          >
            {language}
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => setIsCartModalOpen(true)} 
            className="bg-secondary text-secondary-foreground hover:bg-opacity-90"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {t('cart')} ({cartItemsCount})
          </Button>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="bg-secondary text-secondary-foreground hover:bg-opacity-90">
                  <User className="mr-2 h-4 w-4" />
                  {user.displayName || user.email}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  {t('logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="secondary" 
              onClick={handleLoginClick} 
              className="bg-secondary text-secondary-foreground hover:bg-opacity-90"
            >
              <LogIn className="mr-2 h-4 w-4" />
              {t('login')}
            </Button>
          )}
        </div>
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <CartModal isOpen={isCartModalOpen} onClose={() => setIsCartModalOpen(false)} />
    </header>
  )
}

