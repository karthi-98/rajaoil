// Firestore Database Service Layer
// Following modular programming best practices - all database operations centralized
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  WhereFilterOp,
  QueryConstraint,
  DocumentSnapshot,
  serverTimestamp,
  increment,
  Timestamp,
} from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import type { PaginatedResponse } from '@/lib/types/firebase.types'

/**
 * Generic Firestore Service Class
 * Provides CRUD operations for any collection
 */
export class FirestoreService {
  /**
   * Create a new document in a collection
   */
  static async createDocument<T>(
    collectionName: string,
    data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>,
    customId?: string
  ): Promise<string> {
    try {
      const docRef = customId
        ? doc(db, collectionName, customId)
        : doc(collection(db, collectionName))

      const documentData = {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }

      await setDoc(docRef, documentData)

      return docRef.id
    } catch (error) {
      console.error(`Error creating document in ${collectionName}:`, error)
      throw error
    }
  }

  /**
   * Get a single document by ID
   */
  static async getDocument<T>(
    collectionName: string,
    documentId: string
  ): Promise<T | null> {
    try {
      const docRef = doc(db, collectionName, documentId)
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()) {
        return null
      }

      return this.mapDocumentData<T>(docSnap)
    } catch (error) {
      console.error(`Error getting document from ${collectionName}:`, error)
      throw error
    }
  }

  /**
   * Get all documents from a collection
   */
  static async getAllDocuments<T>(collectionName: string): Promise<T[]> {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName))

      return querySnapshot.docs.map((doc) => this.mapDocumentData<T>(doc))
    } catch (error) {
      console.error(`Error getting documents from ${collectionName}:`, error)
      throw error
    }
  }

  /**
   * Query documents with filters
   */
  static async queryDocuments<T>(
    collectionName: string,
    filters: Array<{
      field: string
      operator: WhereFilterOp
      value: any
    }>,
    orderByField?: string,
    orderDirection: 'asc' | 'desc' = 'asc',
    limitCount?: number
  ): Promise<T[]> {
    try {
      const constraints: QueryConstraint[] = []

      // Add where clauses
      filters.forEach((filter) => {
        constraints.push(where(filter.field, filter.operator, filter.value))
      })

      // Add order by
      if (orderByField) {
        constraints.push(orderBy(orderByField, orderDirection))
      }

      // Add limit
      if (limitCount) {
        constraints.push(limit(limitCount))
      }

      const q = query(collection(db, collectionName), ...constraints)
      const querySnapshot = await getDocs(q)

      return querySnapshot.docs.map((doc) => this.mapDocumentData<T>(doc))
    } catch (error) {
      console.error(`Error querying documents from ${collectionName}:`, error)
      throw error
    }
  }

  /**
   * Get paginated documents
   */
  static async getPaginatedDocuments<T>(
    collectionName: string,
    pageSize: number = 10,
    lastDoc?: DocumentSnapshot,
    filters?: Array<{
      field: string
      operator: WhereFilterOp
      value: any
    }>,
    orderByField: string = 'createdAt',
    orderDirection: 'asc' | 'desc' = 'desc'
  ): Promise<PaginatedResponse<T>> {
    try {
      const constraints: QueryConstraint[] = []

      // Add filters
      if (filters) {
        filters.forEach((filter) => {
          constraints.push(where(filter.field, filter.operator, filter.value))
        })
      }

      // Add order by
      constraints.push(orderBy(orderByField, orderDirection))

      // Add pagination
      constraints.push(limit(pageSize + 1)) // Get one extra to check if there are more

      // Add start after if lastDoc exists
      if (lastDoc) {
        constraints.push(startAfter(lastDoc))
      }

      const q = query(collection(db, collectionName), ...constraints)
      const querySnapshot = await getDocs(q)

      const hasMore = querySnapshot.docs.length > pageSize
      const documents = querySnapshot.docs
        .slice(0, pageSize)
        .map((doc) => this.mapDocumentData<T>(doc))

      // Get total count (this is expensive, consider caching)
      const totalSnapshot = await getDocs(collection(db, collectionName))
      const total = totalSnapshot.size

      return {
        data: documents,
        total,
        page: lastDoc ? -1 : 1, // Page number needs to be tracked by client
        pageSize,
        hasMore,
      }
    } catch (error) {
      console.error(
        `Error getting paginated documents from ${collectionName}:`,
        error
      )
      throw error
    }
  }

  /**
   * Update a document
   */
  static async updateDocument<T>(
    collectionName: string,
    documentId: string,
    data: Partial<T>
  ): Promise<void> {
    try {
      const docRef = doc(db, collectionName, documentId)

      const updateData = {
        ...data,
        updatedAt: serverTimestamp(),
      }

      await updateDoc(docRef, updateData)
    } catch (error) {
      console.error(`Error updating document in ${collectionName}:`, error)
      throw error
    }
  }

  /**
   * Delete a document
   */
  static async deleteDocument(
    collectionName: string,
    documentId: string
  ): Promise<void> {
    try {
      const docRef = doc(db, collectionName, documentId)
      await deleteDoc(docRef)
    } catch (error) {
      console.error(`Error deleting document from ${collectionName}:`, error)
      throw error
    }
  }

  /**
   * Soft delete a document (mark as deleted instead of removing)
   */
  static async softDeleteDocument(
    collectionName: string,
    documentId: string
  ): Promise<void> {
    try {
      await this.updateDocument(collectionName, documentId, {
        deleted: true,
        deletedAt: serverTimestamp(),
      } as any)
    } catch (error) {
      console.error(
        `Error soft deleting document from ${collectionName}:`,
        error
      )
      throw error
    }
  }

  /**
   * Check if document exists
   */
  static async documentExists(
    collectionName: string,
    documentId: string
  ): Promise<boolean> {
    try {
      const docRef = doc(db, collectionName, documentId)
      const docSnap = await getDoc(docRef)
      return docSnap.exists()
    } catch (error) {
      console.error(`Error checking document existence in ${collectionName}:`, error)
      throw error
    }
  }

  /**
   * Increment a numeric field
   */
  static async incrementField(
    collectionName: string,
    documentId: string,
    field: string,
    incrementValue: number = 1
  ): Promise<void> {
    try {
      const docRef = doc(db, collectionName, documentId)
      await updateDoc(docRef, {
        [field]: increment(incrementValue),
        updatedAt: serverTimestamp(),
      })
    } catch (error) {
      console.error(`Error incrementing field in ${collectionName}:`, error)
      throw error
    }
  }

  /**
   * Search documents by field (simple text search)
   */
  static async searchDocuments<T>(
    collectionName: string,
    field: string,
    searchTerm: string,
    limitCount: number = 20
  ): Promise<T[]> {
    try {
      // Note: Firestore doesn't support full-text search natively
      // This is a simple prefix search using >= and <=
      const searchTermLower = searchTerm.toLowerCase()
      const q = query(
        collection(db, collectionName),
        where(field, '>=', searchTermLower),
        where(field, '<=', searchTermLower + '\uf8ff'),
        limit(limitCount)
      )

      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => this.mapDocumentData<T>(doc))
    } catch (error) {
      console.error(`Error searching documents in ${collectionName}:`, error)
      throw error
    }
  }

  /**
   * Map Firestore document data to typed object
   * Converts Firestore Timestamps to JavaScript Dates
   */
  private static mapDocumentData<T>(doc: DocumentSnapshot): T {
    const data = doc.data()

    if (!data) {
      throw new Error('Document data is undefined')
    }

    // Convert Firestore Timestamps to Date objects
    const mappedData: any = { id: doc.id }

    for (const [key, value] of Object.entries(data)) {
      if (value instanceof Timestamp) {
        mappedData[key] = value.toDate()
      } else {
        mappedData[key] = value
      }
    }

    return mappedData as T
  }
}

/**
 * Product-specific Firestore operations
 */
export class ProductService extends FirestoreService {
  private static collectionName = 'products'

  /**
   * Get featured products
   */
  static async getFeaturedProducts<T>(limitCount: number = 8): Promise<T[]> {
    return this.queryDocuments<T>(
      this.collectionName,
      [{ field: 'featured', operator: '==', value: true }],
      'createdAt',
      'desc',
      limitCount
    )
  }

  /**
   * Get products by category
   */
  static async getProductsByCategory<T>(
    categorySlug: string,
    limitCount?: number
  ): Promise<T[]> {
    return this.queryDocuments<T>(
      this.collectionName,
      [{ field: 'categorySlug', operator: '==', value: categorySlug }],
      'createdAt',
      'desc',
      limitCount
    )
  }

  /**
   * Get product by slug
   */
  static async getProductBySlug<T>(slug: string): Promise<T | null> {
    const products = await this.queryDocuments<T>(
      this.collectionName,
      [{ field: 'slug', operator: '==', value: slug }],
      undefined,
      'asc',
      1
    )

    return products.length > 0 ? products[0] : null
  }

  /**
   * Increment product views
   */
  static async incrementViews(productId: string): Promise<void> {
    return this.incrementField(this.collectionName, productId, 'views', 1)
  }
}

/**
 * Order-specific Firestore operations
 */
export class OrderService extends FirestoreService {
  private static collectionName = 'orders'

  /**
   * Get user orders
   */
  static async getUserOrders<T>(userId: string): Promise<T[]> {
    return this.queryDocuments<T>(
      this.collectionName,
      [{ field: 'userId', operator: '==', value: userId }],
      'createdAt',
      'desc'
    )
  }

  /**
   * Get order by order number
   */
  static async getOrderByNumber<T>(orderNumber: string): Promise<T | null> {
    const orders = await this.queryDocuments<T>(
      this.collectionName,
      [{ field: 'orderNumber', operator: '==', value: orderNumber }],
      undefined,
      'asc',
      1
    )

    return orders.length > 0 ? orders[0] : null
  }
}
