'use client'

import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import { Modal } from './ui/modal'

interface ProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { user } = useAuth()
  const { t } = useLanguage()

  if (!user) {
    return null
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('profile')}>
      <div className="space-y-4">
        <p><strong>{t('email')}:</strong> {user.email}</p>
        {user.displayName && <p><strong>{t('name')}:</strong> {user.displayName}</p>}
      </div>
    </Modal>
  )
}

