// Firebase TypeScript Type Definitions
// Centralized types following modular programming best practices

import { Timestamp } from 'firebase/firestore'

// ==================== User Types ====================

export interface User {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  phoneNumber: string | null
  emailVerified: boolean
  createdAt: Date
  updatedAt: Date
  role: UserRole
}

export type UserRole = 'admin' | 'customer' | 'guest'

export interface UserProfile {
  uid: string
  email: string
  displayName: string
  photoURL?: string
  phoneNumber?: string
  address?: Address
  createdAt: Date
  updatedAt: Date
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

// ==================== Product Types ====================

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  price: number
  compareAtPrice?: number
  category: string
  categorySlug: string
  images: string[]
  image: string // Main image
  tags: string[]
  sku: string
  stock: number
  inStock: boolean
  featured: boolean
  rating: number
  reviewCount: number
  createdAt: Date
  updatedAt: Date
}

export interface ProductInput {
  name: string
  description: string
  shortDescription: string
  price: number
  compareAtPrice?: number
  category: string
  images: string[]
  tags: string[]
  sku: string
  stock: number
  featured?: boolean
}

// ==================== Category Types ====================

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  parentId?: string
  order: number
  createdAt: Date
  updatedAt: Date
}

// ==================== Cart Types ====================

export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  price: number
  subtotal: number
}

export interface Cart {
  id: string
  userId: string
  items: CartItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  createdAt: Date
  updatedAt: Date
}

// ==================== Order Types ====================

export interface Order {
  id: string
  orderNumber: string
  userId: string
  userEmail: string
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  status: OrderStatus
  paymentStatus: PaymentStatus
  paymentMethod: string
  shippingAddress: Address
  billingAddress: Address
  trackingNumber?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  productId: string
  productName: string
  productImage: string
  quantity: number
  price: number
  subtotal: number
}

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'

// ==================== Review Types ====================

export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  userPhoto?: string
  rating: number
  title: string
  comment: string
  verified: boolean
  helpful: number
  createdAt: Date
  updatedAt: Date
}

export interface ReviewInput {
  productId: string
  rating: number
  title: string
  comment: string
}

// ==================== Blog Types ====================

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  authorId: string
  featuredImage: string
  tags: string[]
  category: string
  published: boolean
  views: number
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
}

// ==================== Firestore Converter Types ====================

// Helper type to convert Firestore Timestamp to Date
export type FirestoreTimestamp = Timestamp

// Helper to convert Date fields to Firestore Timestamp for write operations
export type WithFirestoreTimestamp<T> = {
  [K in keyof T]: T[K] extends Date ? Timestamp : T[K]
}

// ==================== API Response Types ====================

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

// ==================== Auth Types ====================

export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupCredentials {
  email: string
  password: string
  displayName: string
}

export interface AuthError {
  code: string
  message: string
}

// ==================== Storage Types ====================

export interface UploadProgress {
  bytesTransferred: number
  totalBytes: number
  percentage: number
}

export interface UploadResult {
  url: string
  path: string
  name: string
  size: number
}

// ==================== Slider Types ====================

export interface SliderImage {
  url: string
  alt: string
  title?: string
  description?: string
  link?: string
  order?: number
}

export interface HomepageData {
  homepageSlider: SliderImage[]
}

// ==================== Helper Types ====================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type FirebaseDocument<T> = T & {
  id: string
}
