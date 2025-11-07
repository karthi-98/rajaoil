// Product variant/packaging type
export interface ProductType {
  name: string
  price: string
  image: string
}

// Main product structure matching Firebase
export interface Product {
  id: string
  brand: string
  docType: string
  mainImage: string
  types: ProductType[]
  description?: string
}

// Selected variant for cart
export interface CartItem {
  id: string
  productId: string
  brand: string
  name: string // variant name
  price: number
  image: string
  quantity: number
}
