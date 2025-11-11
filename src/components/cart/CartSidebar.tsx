'use client'

import { useEffect, useRef } from 'react'
import { X, Plus, Minus, Trash2 } from 'lucide-react'
import { gsap } from 'gsap'
import { useCartContext } from '@/contexts/CartContext'
import Image from 'next/image'
import Link from 'next/link'

export default function CartSidebar() {
  const { items, itemCount, total, isOpen, closeCart, updateQuantity, removeItem } = useCartContext()
  const sidebarRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Format product name from ID
  const formatProductName = (productId: string) => {
    return productId
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  useEffect(() => {
    const sidebar = sidebarRef.current
    const overlay = overlayRef.current

    if (!sidebar || !overlay) return

    if (isOpen) {
      // Set initial state
      gsap.set(overlay, { display: 'block', opacity: 0 })
      gsap.set(sidebar, { x: '100%' })

      // Animate in
      gsap.to(overlay, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      })

      gsap.to(sidebar, {
        x: '0%',
        duration: 0.4,
        ease: 'power3.out',
      })
    } else {
      // Animate out
      gsap.to(sidebar, {
        x: '100%',
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
    }
  }, [isOpen])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/50 z-40 hidden"
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-50 flex flex-col translate-x-full"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-black">
            Shopping Cart ({itemCount})
          </h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X className="h-5 w-5 text-black" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-10 h-10 text-gray-400"
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
              <p className="text-gray-500 text-lg font-medium">Your cart is empty</p>
              <p className="text-gray-400 text-sm mt-2">Add items to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {/* Product Image */}
                  <div className="relative w-20 h-20 bg-white rounded-md overflow-hidden flex-shrink-0">
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
                    <h3 className="font-medium text-black text-sm truncate">
                      {formatProductName(item.productId)}
                    </h3>
                    <p className="text-gray-600 text-xs truncate">
                      {item.name}
                    </p>
                    <p className="text-primary font-semibold text-sm mt-1">
                      {formatPrice(item.price)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-white rounded transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4 text-gray-600" />
                      </button>
                      <span className="text-sm font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-white rounded transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 hover:bg-red-50 rounded-full transition-colors self-start"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-4 space-y-4">
            {/* Total */}
            <div className="flex items-center justify-between text-lg font-bold">
              <span className="text-black">Total:</span>
              <span className="text-primary">{formatPrice(total)}</span>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
            >
              Proceed to Checkout
            </Link>

            {/* Continue Shopping */}
            <button
              onClick={closeCart}
              className="w-full text-sm text-gray-600 hover:text-black font-medium transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
