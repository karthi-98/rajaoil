import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import type { Product } from '@/lib/types'

const COLLECTION_NAME = 'rajaoil'

export class ProductService {
  /**
   * Fetch all products from Firebase (only docType === 'product')
   */
  static async getAllProducts(): Promise<Product[]> {
    try {
      const productsRef = collection(db, COLLECTION_NAME)
      const q = query(productsRef, where('docType', '==', 'product'))
      const querySnapshot = await getDocs(q)

      const products: Product[] = []

      querySnapshot.forEach((doc) => {
        products.push({
          id: doc.id,
          ...(doc.data() as Omit<Product, 'id'>),
        })
      })

      console.log(`✅ Fetched ${products.length} products from Firebase`)
      return products
    } catch (error) {
      console.error('❌ Error fetching products:', error)
      return []
    }
  }

  /**
   * Get a single product by ID
   */
  static async getProductById(productId: string): Promise<Product | null> {
    try {
      const productsRef = collection(db, COLLECTION_NAME)
      const q = query(
        productsRef,
        where('docType', '==', 'product'),
        where('brand', '==', productId)
      )
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        console.error('Product not found by brand:', productId)
        return null
      }

      // Assuming brand is unique, take the first result
      const productDoc = querySnapshot.docs[0]
      const data = productDoc.data()

      return {
        id: productDoc.id,
        ...data,
      } as Product
    } catch (error) {
      console.error('❌ Error fetching product by brand:', error)
      return null
    }
  }

  /**
   * Get featured products (you can add a 'featured' field to Firebase if needed)
   */
  static async getFeaturedProducts(limit: number = 6): Promise<Product[]> {
    try {
      const products = await this.getAllProducts()
      return products.slice(0, limit)
    } catch (error) {
      console.error('❌ Error fetching featured products:', error)
      return []
    }
  }
}
