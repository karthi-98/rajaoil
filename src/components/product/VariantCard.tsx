'use client'

import Image from 'next/image'
import { useCartContext } from '@/contexts/CartContext'
import { Minus, Plus, ShoppingCart } from 'lucide-react'

interface VariantCardProps {
  productId: string
  brand: string
  variantName: string
  price: string
  image: string
  offer?: string
}

export default function VariantCard({
  productId,
  brand,
  variantName,
  price,
  image,
  offer
}: VariantCardProps) {
  const { items, addItem, updateQuantity } = useCartContext()

  // Create unique ID for this variant
  const variantId = `${productId}-${variantName.replace(/\s+/g, '-').toLowerCase()}`

  // Check if this variant is in cart
  const cartItem = items.find(item => item.id === variantId)
  const quantity = cartItem?.quantity || 0

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Capitalize first letter of each word
  const capitalizeWords = (str: string) => {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  const displayName = capitalizeWords(brand.replace(/-/g, ' '))
  const numericPrice = parseFloat(price)

  const handleAddToCart = () => {
    addItem({
      id: variantId,
      productId,
      brand,
      name: variantName,
      price: numericPrice,
      image,
      offer
    }, 1)
  }

  const handleIncrement = () => {
    updateQuantity(variantId, quantity + 1)
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(variantId, quantity - 1)
    } else {
      updateQuantity(variantId, 0) // This will remove the item
    }
  }

  return (
    <div className="group flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Product Image */}
      <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
        <Image
          src={image || '/placeholder-product.jpg'}
          alt={`${displayName} - ${variantName}`}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Offer badge */}
        {offer && (
          <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {offer}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1 p-4">
        {/* Variant Name (Package Size) */}
        <h3 className="font-bold text-gray-900 text-xl mb-1 group-hover:text-primary transition-colors" style={{ fontFamily: 'var(--font-montserrat)' }}>
          {variantName}
        </h3>

        {/* Brand Name */}
        <span className="inline-block bg-gray-100 text-gray-600 text-[10px] font-medium px-1.5 py-0.5 rounded mb-3 w-fit">
          {displayName}
        </span>

        {/* Price */}
        <div className="mb-4">
          <span className="text-primary font-bold text-xl">
            {formatPrice(numericPrice)}
          </span>
        </div>

        {/* Add to Cart / Quantity Controls */}
        {quantity === 0 ? (
          <button
            onClick={handleAddToCart}
            className="w-full bg-primary text-white rounded-lg font-semibold py-3 text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center justify-between bg-gray-100 rounded-lg p-1">
            <button
              onClick={handleDecrement}
              className="w-10 h-10 flex items-center justify-center bg-white rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors shadow-sm"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-bold text-lg text-gray-900 min-w-[40px] text-center">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="w-10 h-10 flex items-center justify-center bg-white rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
