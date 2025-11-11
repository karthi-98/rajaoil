'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProductImageSliderProps {
  images: string[]
  productName: string
}

export default function ProductImageSlider({
  images,
  productName,
}: ProductImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 4000) // Change image every 4 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, images.length])

  // Pause auto-play on manual interaction
  const handleManualChange = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)

    // Resume auto-play after 10 seconds of no interaction
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToPrevious = () => {
    handleManualChange(currentIndex === 0 ? images.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    handleManualChange((currentIndex + 1) % images.length)
  }

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">No images available</span>
      </div>
    )
  }

  return (
    <div className="w-full space-y-4">
      {/* Main Image Display */}
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
        <Image
          src={images[currentIndex]}
          alt={`${productName} - Image ${currentIndex + 1}`}
          fill
          className="object-cover transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={currentIndex === 0}
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 md:gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleManualChange(index)}
              className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all duration-200 ${
                currentIndex === index
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="100px"
              />
              {currentIndex === index && (
                <div className="absolute inset-0 bg-primary/10" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
