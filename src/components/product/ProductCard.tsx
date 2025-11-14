'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
  compact?: boolean
}

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  // Get price range from variants
  const prices = product.types.map((type) => parseFloat(type.price))
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)

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

  // Format document name for display
  const displayName = capitalizeWords(product.id.replace(/-/g, ' '))

  return (
    <Link
      href={`/products/${product.id.replace(/ /g, '-')}`}
      className={`group flex flex-col bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${compact ? 'h-[380px]' : 'h-[420px]'}`}
    >
      {/* Product Image - Wider aspect ratio for horizontal images */}
      <div className={`relative w-full bg-gray-100 overflow-hidden ${compact ? 'aspect-[3/2]' : 'aspect-[4/3]'}`}>
        <Image
          src={product.mainImage || '/placeholder-product.jpg'}
          alt={displayName}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Variant count badge */}
        {product.types.length > 1 && (
          <div className={`absolute ${compact ? 'top-2 right-2 text-[10px] px-1.5 py-0.5' : 'top-3 right-3 text-xs px-2 py-1'} bg-primary text-white font-semibold rounded-full`}>
            {product.types.length} Variants
          </div>
        )}
      </div>

      {/* Product Info - Flex grow to fill space */}
      <div className={`flex flex-col flex-1 ${compact ? 'p-3' : 'p-4'}`}>
        {/* Product Name - Fixed height with line clamp */}
        <h3 className={`font-black text-gray-900 line-clamp-2 group-hover:text-primary transition-colors ${compact ? 'text-base mb-2 min-h-[44px]' : 'text-lg mb-2 min-h-[56px]'}`} style={{ fontFamily: 'var(--font-montserrat)' }}>
          {displayName}
        </h3>

        {/* Price Range */}
        <div className={`flex items-baseline gap-2 ${compact ? 'mb-2' : 'mb-3'}`}>
          {minPrice === maxPrice ? (
            <span className={`text-primary font-bold ${compact ? 'text-lg' : 'text-xl'}`}>
              {formatPrice(minPrice)}
            </span>
          ) : (
            <>
              <span className={`text-primary font-bold ${compact ? 'text-lg' : 'text-xl'}`}>
                {formatPrice(minPrice)}
              </span>
              <span className={`text-gray-500 ${compact ? 'text-xs' : 'text-sm'}`}>- {formatPrice(maxPrice)}</span>
            </>
          )}
        </div>

        {/* Package Sizes Count */}
        <div className={compact ? 'mb-3' : 'mb-4'}>
          <span className={`text-gray-600 ${compact ? 'text-xs' : 'text-sm'}`}>
            {product.types.length} package size{product.types.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* View Details Button - Push to bottom */}
        <button className={`w-full bg-[#101828] text-white rounded-lg font-semibold group-hover:bg-primary transition-colors mt-auto ${compact ? 'py-2.5 text-sm' : 'py-3 text-sm'}`}>
          View Details
        </button>
      </div>
    </Link>
  )
}
