'use client'

import { useEffect, useRef } from 'react'
import { X, Plus, Minus, Trash2 } from 'lucide-react'
import { gsap } from 'gsap'
import { useCartContext } from '@/contexts/CartContext'
import Image from 'next/image'
import Link from 'next/link'

interface MobileCartSheetProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileCartSheet({ isOpen, onClose }: MobileCartSheetProps) {
  const { items, itemCount, total, updateQuantity, removeItem } = useCartContext()
  const sheetRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Format product name from ID
  const formatProductName = (productId: string) => {
    return productId
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  useEffect(() => {
    const sheet = sheetRef.current
    const overlay = overlayRef.current

    if (!sheet || !overlay) return

    if (isOpen) {
      // Set initial state
      gsap.set(overlay, { display: 'block', opacity: 0 })
      gsap.set(sheet, { y: '100%' })

      // Animate in
      gsap.to(overlay, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      })

      gsap.to(sheet, {
        y: '0%',
        duration: 0.4,
        ease: 'power3.out',
      })

      // Prevent body scroll
      document.body.style.overflow = 'hidden'
    } else {
      // Animate out
      gsap.to(sheet, {
        y: '100%',
        duration: 0.3,
        ease: 'power3.in',
      })

      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(overlay, { display: 'none' })
        },
      })

      // Restore body scroll
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/50 z-40 hidden"
        onClick={onClose}
      />

      {/* Mobile Cart Sheet */}
      <div
        ref={sheetRef}
        className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl z-50 rounded-t-2xl flex flex-col translate-y-full"
        style={{ maxHeight: '70vh' }}
      >
        {/* Header - Handle Bar */}
        <div className="flex flex-col items-center justify-center pt-3 pb-2 border-b border-gray-200">
          {/* Drag Handle Bar */}
          <div className="w-12 h-1 bg-gray-300 rounded-full mb-2" />

          {/* Title */}
          <div className="w-full flex items-center justify-between px-4 py-2">
            <h2 className="text-lg font-bold text-black">
              Shopping Cart ({itemCount})
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X className="h-5 w-5 text-black" />
            </button>
          </div>
        </div>

        {/* Cart Items - Scrollable */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 text-sm font-medium">Your cart is empty</p>
              <p className="text-gray-400 text-xs mt-2">Add items to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {/* Product Image */}
                  <div className="relative w-16 h-16 bg-white rounded-md overflow-hidden flex-shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No image</span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-black text-xs truncate">
                      {formatProductName(item.productId)}
                    </h3>
                    <p className="text-gray-600 text-xs truncate">
                      {item.name}
                    </p>
                    <p className="text-primary font-semibold text-xs mt-1">
                      {formatPrice(item.price)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1 mt-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-white rounded transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3 text-gray-600" />
                      </button>
                      <span className="text-xs font-medium w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-white rounded transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 hover:bg-red-50 rounded-full transition-colors self-start"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Sticky */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 px-4 py-3 space-y-3 bg-white">
            {/* Total */}
            <div className="flex items-center justify-between text-base font-bold">
              <span className="text-black">Total:</span>
              <span className="text-primary">{formatPrice(total)}</span>
            </div>

            {/* Proceed to Checkout Button */}
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center text-sm"
            >
              Proceed to Checkout
            </Link>

            {/* Continue Shopping */}
            <button
              onClick={onClose}
              className="w-full text-xs text-gray-600 hover:text-black font-medium transition-colors py-2"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
