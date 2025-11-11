'use client'

import { useCartContext } from '@/contexts/CartContext'

interface AddToCartButtonProps {
  productId: string
  variantId: string
  brand: string
  name: string
  price: number
  image: string
  quantity?: number
  className?: string
  children?: React.ReactNode
}

export default function AddToCartButton({
  productId,
  variantId,
  brand,
  name,
  price,
  image,
  quantity = 1,
  className = '',
  children = 'Add to Cart',
}: AddToCartButtonProps) {
  const { addItem } = useCartContext()

  const handleClick = () => {
    addItem(
      {
        id: variantId,
        productId,
        brand,
        name,
        price,
        image,
      },
      quantity
    )
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
