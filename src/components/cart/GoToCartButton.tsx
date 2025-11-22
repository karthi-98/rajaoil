'use client'

import { useEffect, useRef, useState } from 'react'
import { useCartContext } from '@/contexts/CartContext'
import { ShoppingCart, ArrowRight } from 'lucide-react'
import gsap from 'gsap'

export default function GoToCartButton() {
  const { itemCount, total, openCart } = useCartContext()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  useEffect(() => {
    if (itemCount > 0 && !isVisible) {
      // Show the button
      setShouldRender(true)
      setIsVisible(true)
    } else if (itemCount === 0 && isVisible) {
      // Hide the button
      setIsVisible(false)
    }
  }, [itemCount, isVisible])

  useEffect(() => {
    if (!containerRef.current) return

    if (isVisible) {
      // Animate in from bottom
      gsap.fromTo(
        containerRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power3.out',
        }
      )
    } else if (shouldRender) {
      // Animate out to bottom
      gsap.to(containerRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => {
          setShouldRender(false)
        },
      })
    }
  }, [isVisible, shouldRender])

  if (!shouldRender) return null

  return (
    <div
      ref={containerRef}
      className="fixed bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-white via-white to-transparent pt-8"
    >
      <div className="max-w-7xl mx-auto">
        <button
          onClick={openCart}
          className="w-full bg-primary text-white rounded-xl py-4 px-6 font-semibold shadow-lg hover:bg-primary/90 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-white text-primary text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            </div>
            <span className="text-base">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} in cart
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">{formatPrice(total)}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>
    </div>
  )
}
