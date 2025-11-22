'use client'

import type { Product } from '@/lib/types'
import VariantCard from './VariantCard'

interface VariantGridProps {
  products: Product[]
}

export default function VariantGrid({ products }: VariantGridProps) {
  // Flatten products into individual variants
  const variants = products.flatMap(product =>
    product.types.map(type => ({
      productId: product.id,
      brand: product.brand,
      variantName: type.name,
      price: type.price,
      image: type.image || product.mainImage,
      offer: type.offer
    }))
  )

  if (variants.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {variants.map((variant, index) => (
        <VariantCard
          key={`${variant.productId}-${variant.variantName}-${index}`}
          productId={variant.productId}
          brand={variant.brand}
          variantName={variant.variantName}
          price={variant.price}
          image={variant.image}
          offer={variant.offer}
        />
      ))}
    </div>
  )
}
