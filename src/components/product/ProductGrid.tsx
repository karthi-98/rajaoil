import type { Product } from '@/lib/types'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: Product[]
  title?: string
  compact?: boolean
}

export default function ProductGrid({ products, title, compact = false }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products found</p>
      </div>
    )
  }

  return (
    <section className="w-full h-full">
      {title && (
        <h2 className="text-5xl font-bold text-gray-900 mb-8">{title}</h2>
      )}

      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${compact ? 'gap-3 h-full' : 'gap-x-8 gap-y-12'}`}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} compact={compact} />
        ))}
      </div>
    </section>
  )
}
