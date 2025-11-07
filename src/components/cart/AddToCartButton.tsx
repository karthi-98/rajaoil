'use client'

import { useCartContext } from '@/contexts/CartContext'
import type { Product } from '@/lib/types'

interface AddToCartButtonProps {
  product: Product
  quantity?: number
  className?: string
  children?: React.ReactNode
}

export default function AddToCartButton({
  product,
  quantity = 1,
  className = '',
  children = 'Add to Cart',
}: AddToCartButtonProps) {
  const { addItem } = useCartContext()

  const handleClick = () => {
    addItem(product, quantity)
  }

  return (
    <button
      onClick={handleClick}
      className={`bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors ${className}`}
    >
      {children}
    </button>
  )
}
