'use client'

import { useState } from 'react'
import { Button } from "./ui/Button"
import { useRouter } from 'next/navigation'
import { Rocket, Chrome } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog"
import { Input } from "./ui/Input"
import { Label } from "./ui/Label"
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, googleProvider } from '../lib/firebase'

export function LoginModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      router.push('/dashboard')
    } catch (error) {
      setError('Error al iniciar sesión con Google. Por favor, intenta de nuevo.')
      console.error(error)
    }
  }


  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      router.push('/dashboard')
    } catch (error) {
      setError('Error de autenticación. Por favor, intenta de nuevo.')
      console.error(error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white shadow-lg rounded-md justify-center items-center">
        <DialogHeader>
          <DialogTitle className="w-full flex items-center justify-center space-x-2" >{isSignUp ? 'Registrarse en UPE' : 'Entrar a UPE'}</DialogTitle>
          <DialogDescription>
          {isSignUp ? 'Crea tu cuenta para iniciar tus compras' : 'Entra a tu cuenta para finalizar tus compras'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
        <div className="mt-4">
        {isSignUp ? <p></p> :
         <Button 
              variant="outline" 
              className="w-full flex items-center justify-center space-x-2" 
              onClick={handleGoogleLogin}
            >
              <Chrome className="w-5 h-5" />
              <span>Iniciar sesión con Google</span>
            </Button>
              
        }
         </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
            {isSignUp ? <p></p> :
        <span>
        Or continue with
      </span>           
        }         
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
          </div>
        
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <DialogFooter>
 
            <Button type="submit" className="w-full">
              {isSignUp ? 'Regístrarse' : 'Iniciar sesión'}
            </Button>
        
        </DialogFooter>
        <p className="text-center">
            {isSignUp ? '¿Ya tienes una cuenta?' : '¿No tienes una cuenta?'}
            <button
              className="text-blue-500 hover:underline ml-1"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? 'Inicia sesión' : 'Regístrate'}
            </button>
          </p>
      </DialogContent>
    </Dialog>
  )
}

