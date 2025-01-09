'use client'

import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { Button } from "../components/ui/button"
import { Upload } from 'lucide-react'

interface ImageUploaderProps {
  onUpload: (file: File) => void
  onError: (message: string) => void
}

export function ImageUploader({ onUpload, onError }: ImageUploaderProps) {
  const { t } = useLanguage()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.type === "image/jpeg" || file.type === "image/png") {
        setSelectedFile(file)
        onUpload(file)
      } else {
        setSelectedFile(null)
        onError(t('invalidFileType'))
      }
    }
  }

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={handleFileChange}
        className="hidden"
        id="image-upload"
      />
      <label htmlFor="image-upload" className="cursor-pointer">
        <Button variant="outline" className="w-full">
          <Upload className="mr-2 h-4 w-4" />
          {selectedFile ? selectedFile.name : t('selectFile')}
        </Button>
      </label>
    </div>
  )
}

