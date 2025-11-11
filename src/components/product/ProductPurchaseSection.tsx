'use client'

import { useState } from 'react'
import { ShoppingCart, Check, Minus, Plus, X } from 'lucide-react'
import { useCartContext } from '@/contexts/CartContext'
import Link from 'next/link'
import { toast } from 'sonner'
import type { Product, ProductType } from '@/lib/types'

interface ProductPurchaseSectionProps {
  product: Product
}

interface SelectedVariant extends ProductType {
  quantity: number
}

export function ProductPurchaseSection({ product }: ProductPurchaseSectionProps) {
  const { addItem } = useCartContext()
  const [selectedVariants, setSelectedVariants] = useState<SelectedVariant[]>([])
  const [isAdding, setIsAdding] = useState(false)

  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(numPrice)
  }

  const isVariantSelected = (variant: ProductType) => {
    return selectedVariants.some((v) => v.name === variant.name)
  }

  const toggleVariant = (variant: ProductType) => {
    setSelectedVariants((prev) => {
      const exists = prev.find((v) => v.name === variant.name)
      if (exists) {
        // Remove variant
        return prev.filter((v) => v.name !== variant.name)
      } else {
        // Add variant with quantity 1
        return [...prev, { ...variant, quantity: 1 }]
      }
    })
  }

  const updateVariantQuantity = (variantName: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setSelectedVariants((prev) =>
      prev.map((v) =>
        v.name === variantName ? { ...v, quantity: newQuantity } : v
      )
    )
  }

  const removeVariant = (variantName: string) => {
    setSelectedVariants((prev) => prev.filter((v) => v.name !== variantName))
  }

  const handleAddToCart = async () => {
    if (selectedVariants.length === 0) {
      toast.error('Please select at least one size')
      return
    }

    setIsAdding(true)
    try {
      // Add each selected variant with its quantity
      selectedVariants.forEach((variant) => {
        addItem(
          {
            id: `${product.id}-${variant.name}`,
            productId: product.id,
            brand: product.brand,
            name: variant.name,
            price: parseFloat(variant.price),
            image: variant.image || product.mainImage,
          },
          variant.quantity
        )
      })

      // Show success toast
      toast.success(`${totalItems} item${totalItems > 1 ? 's' : ''} added to cart successfully!`)

      // Keep success state visible and don't reset
      // User can either navigate to cart or continue shopping
    } catch (error) {
      console.error('Error adding to cart:', error)
      toast.error('Failed to add items to cart. Please try again.')
      setIsAdding(false)
    }
  }

  const handleContinueShopping = () => {
    setIsAdding(false)
    setSelectedVariants([])
  }

  const totalPrice = selectedVariants.reduce(
    (sum, variant) => sum + parseFloat(variant.price) * variant.quantity,
    0
  )

  const totalItems = selectedVariants.reduce((sum, variant) => sum + variant.quantity, 0)

  return (
    <div className="lg:sticky lg:top-8">
      {/* Price Range */}
      <div className="mb-6">
        <p className="text-3xl font-bold text-gray-900">
          {product.types.length > 0 && formatPrice(Math.min(...product.types.map(t => parseFloat(t.price))))}
          {product.types.length > 1 && (
            <span className="text-xl text-gray-500">
              {' '}- {formatPrice(Math.max(...product.types.map(t => parseFloat(t.price))))}
            </span>
          )}
        </p>
        <p className="text-sm text-gray-500 mt-1">Tax included. Shipping calculated at checkout.</p>
      </div>

      {/* Size Selection with Inline Quantity */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Select Size{selectedVariants.length > 0 && 's'}
          <span className="text-gray-500 font-normal ml-2">(You can select multiple)</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {product.types.map((variant) => {
            const isSelected = isVariantSelected(variant)
            const selectedVariant = selectedVariants.find((v) => v.name === variant.name)

            return (
              <div
                key={variant.name}
                className={`relative p-4 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200'
                }`}
              >
                <button
                  onClick={() => toggleVariant(variant)}
                  className="w-full text-left"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-gray-900">{variant.name}</span>
                    {isSelected && (
                      <Check className="w-5 h-5 text-gray-900" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {formatPrice(variant.price)}
                  </p>
                </button>

                {/* Inline Quantity Controls - Show when selected */}
                {isSelected && selectedVariant && (
                  <div className="mt-3 pt-3 border-t border-gray-300">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600 font-medium">Quantity:</span>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              updateVariantQuantity(variant.name, selectedVariant.quantity - 1)
                            }}
                            className="p-1.5 hover:bg-gray-100 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 py-1 text-sm font-medium min-w-[30px] text-center">
                            {selectedVariant.quantity}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              updateVariantQuantity(variant.name, selectedVariant.quantity + 1)
                            }}
                            className="p-1.5 hover:bg-gray-100 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            removeVariant(variant.name)
                          }}
                          className="p-1.5 hover:bg-red-50 rounded-md transition-colors"
                          aria-label="Remove item"
                        >
                          <X className="w-3.5 h-3.5 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Total Summary - Show when items selected */}
      {selectedVariants.length > 0 && (
        <div className="mb-6 p-4 bg-gray-100 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm text-gray-600">Total ({totalItems} item{totalItems > 1 ? 's' : ''})</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(totalPrice)}
            </span>
          </div>
        </div>
      )}

      {/* Add to Cart Button or Navigate to Cart */}
      {!isAdding ? (
        <button
          onClick={handleAddToCart}
          disabled={selectedVariants.length === 0}
          className="w-full bg-gray-900 text-white py-4 px-6 rounded-lg font-semibold text-base hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-4"
        >
          <ShoppingCart className="w-5 h-5" />
          {selectedVariants.length > 0
            ? `Add ${totalItems} Item${totalItems > 1 ? 's' : ''} to Cart`
            : 'Add to Cart'
          }
        </button>
      ) : (
        <div className="space-y-3 mb-4">
          {/* Navigate to Cart Button */}
          <Link
            href="/checkout"
            className="block w-full bg-primary text-white py-4 px-6 rounded-lg font-semibold text-base hover:bg-primary/90 transition-colors text-center"
          >
            Go to Cart & Checkout
          </Link>

          {/* Continue Shopping Button */}
          <button
            onClick={handleContinueShopping}
            className="w-full bg-gray-100 text-gray-700 py-4 px-6 rounded-lg font-semibold text-base hover:bg-gray-200 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      )}

      {/* Help Text */}
      {selectedVariants.length === 0 && !isAdding && (
        <p className="text-sm text-gray-500 text-center mb-4">
          Select one or more sizes to add to your cart
        </p>
      )}

      {/* Product Info */}
      <div className="border-t border-gray-200 pt-6 space-y-4">
        <details className="group">
          <summary className="flex justify-between items-center cursor-pointer text-sm font-semibold text-gray-900 hover:text-gray-600">
            Product Details
            <span className="ml-6 flex-shrink-0 group-open:rotate-180 transition-transform">
              ▼
            </span>
          </summary>
          <div className="mt-4 text-sm text-gray-600">
            {product.description || 'Premium quality cooking oil for all your culinary needs.'}
          </div>
        </details>

        <details className="group border-t border-gray-200 pt-4">
          <summary className="flex justify-between items-center cursor-pointer text-sm font-semibold text-gray-900 hover:text-gray-600">
            Shipping & Returns
            <span className="ml-6 flex-shrink-0 group-open:rotate-180 transition-transform">
              ▼
            </span>
          </summary>
          <div className="mt-4 text-sm text-gray-600">
            <p>Free shipping on orders over ₹500.</p>
            <p className="mt-2">Returns accepted within 7 days of delivery.</p>
          </div>
        </details>
      </div>
    </div>
  )
}
