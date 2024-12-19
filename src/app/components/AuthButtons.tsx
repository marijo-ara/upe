'use client'

import { useAuth } from '../contexts/AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { Button } from './ui/Button'
import { LoginModal } from './LoginModal'

const AuthButtons = () => {
  const { user } = useAuth()

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Error signing out', error)
    }
  }

  return (
    <div>
      {user ? (
        <Button onClick={handleLogout}>Logout</Button>
      ) : (
        <LoginModal />
      )}
    </div>
  )
}

export default AuthButtons

