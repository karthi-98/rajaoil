'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useCart } from '@/hooks/useCart'
import type { CartItem } from '@/lib/types'

interface AddItemParams {
  id: string
  productId: string
  brand: string
  name: string
  price: number
  image: string
}

interface CartContextType {
  items: CartItem[]
  itemCount: number
  total: number
  isOpen: boolean
  animationTrigger: number
  lastAddedQuantity: number
  addItem: (item: AddItemParams, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useCart()

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>
}

export function useCartContext() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider')
  }
  return context
}
