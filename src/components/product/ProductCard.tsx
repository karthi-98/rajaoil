'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
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

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <Image
          src={product.mainImage || '/placeholder-product.jpg'}
          alt={product.brand}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Variant count badge */}
        {product.types.length > 1 && (
          <div className="absolute top-3 right-3 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
            {product.types.length} Variants
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Brand Name */}
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.brand}
        </h3>

        {/* Price Range */}
        <div className="flex items-baseline gap-2 mb-3">
          {minPrice === maxPrice ? (
            <span className="text-primary text-xl font-bold">
              {formatPrice(minPrice)}
            </span>
          ) : (
            <>
              <span className="text-primary text-xl font-bold">
                {formatPrice(minPrice)}
              </span>
              <span className="text-gray-500 text-sm">- {formatPrice(maxPrice)}</span>
            </>
          )}
        </div>

        {/* Variant Types */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.types.slice(0, 3).map((type, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
            >
              {type.name}
            </span>
          ))}
          {product.types.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              +{product.types.length - 3} more
            </span>
          )}
        </div>

        {/* View Details Button */}
        <button className="w-full bg-gray-900 text-white py-2 rounded-lg font-medium group-hover:bg-primary transition-colors">
          View Details
        </button>
      </div>
    </Link>
  )
}
