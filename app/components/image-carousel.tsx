'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "../components/ui/button"

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const validImages = useMemo(() => images.filter(img => img && img.trim() !== ''), [images]);

  if (validImages.length === 0) {
    return (
      <div className="relative w-full h-96">
        <Image
          src="/placeholder.svg"
          alt={alt}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
    );
  }

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % validImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + validImages.length) % validImages.length);
  };

  return (
    <div className="relative w-full h-96">
      <Image
        src={validImages[currentIndex]}
        alt={`${alt} - Imagen ${currentIndex + 1}`}
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      />
      {validImages.length > 1 && (
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <Button onClick={prevImage} variant="outline" size="icon" className="rounded-full bg-white/80 text-gray-800">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button onClick={nextImage} variant="outline" size="icon" className="rounded-full bg-white/80 text-gray-800">
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      )}
      {validImages.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {validImages.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

