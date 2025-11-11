// Custom Hook for Firestore Operations
// Following modular programming best practices
'use client'

import { useState, useEffect, useCallback } from 'react'
import { FirestoreService } from '@/services/firestore.service'
import { WhereFilterOp } from 'firebase/firestore'

interface UseFirestoreReturn<T> {
  data: T | null
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

interface UseFirestoreCollectionReturn<T> {
  data: T[]
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

/**
 * Hook to fetch a single document from Firestore
 */
export function useFirestoreDocument<T>(
  collectionName: string,
  documentId: string | null
): UseFirestoreReturn<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchDocument = useCallback(async () => {
    if (!documentId) {
      setData(null)
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const document = await FirestoreService.getDocument<T>(
        collectionName,
        documentId
      )
      setData(document)
    } catch (err) {
      setError(err as Error)
      console.error('Error fetching document:', err)
    } finally {
      setLoading(false)
    }
  }, [collectionName, documentId])

  useEffect(() => {
    fetchDocument()
  }, [fetchDocument])

  return {
    data,
    loading,
    error,
    refetch: fetchDocument,
  }
}

/**
 * Hook to fetch all documents from a collection
 */
export function useFirestoreCollection<T>(
  collectionName: string
): UseFirestoreCollectionReturn<T> {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchCollection = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const documents = await FirestoreService.getAllDocuments<T>(collectionName)
      setData(documents)
    } catch (err) {
      setError(err as Error)
      console.error('Error fetching collection:', err)
    } finally {
      setLoading(false)
    }
  }, [collectionName])

  useEffect(() => {
    fetchCollection()
  }, [fetchCollection])

  return {
    data,
    loading,
    error,
    refetch: fetchCollection,
  }
}

/**
 * Hook to query Firestore documents with filters
 */
export function useFirestoreQuery<T>(
  collectionName: string,
  filters: Array<{
    field: string
    operator: WhereFilterOp
    value: unknown
  }>,
  orderByField?: string,
  orderDirection: 'asc' | 'desc' = 'asc',
  limitCount?: number
): UseFirestoreCollectionReturn<T> {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchQuery = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const documents = await FirestoreService.queryDocuments<T>(
        collectionName,
        filters,
        orderByField,
        orderDirection,
        limitCount
      )
      setData(documents)
    } catch (err) {
      setError(err as Error)
      console.error('Error querying documents:', err)
    } finally {
      setLoading(false)
    }
  }, [collectionName, filters, orderByField, orderDirection, limitCount])

  useEffect(() => {
    fetchQuery()
  }, [fetchQuery])

  return {
    data,
    loading,
    error,
    refetch: fetchQuery,
  }
}

/**
 * Hook for CRUD operations on Firestore
 */
export function useFirestoreMutations<T>(collectionName: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const create = useCallback(
    async (data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>, customId?: string) => {
      try {
        setLoading(true)
        setError(null)
        const id = await FirestoreService.createDocument<T>(
          collectionName,
          data,
          customId
        )
        return id
      } catch (err) {
        setError(err as Error)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [collectionName]
  )

  const update = useCallback(
    async (documentId: string, data: Partial<T>) => {
      try {
        setLoading(true)
        setError(null)
        await FirestoreService.updateDocument<T>(collectionName, documentId, data)
      } catch (err) {
        setError(err as Error)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [collectionName]
  )

  const remove = useCallback(
    async (documentId: string, soft: boolean = false) => {
      try {
        setLoading(true)
        setError(null)
        if (soft) {
          await FirestoreService.softDeleteDocument(collectionName, documentId)
        } else {
          await FirestoreService.deleteDocument(collectionName, documentId)
        }
      } catch (err) {
        setError(err as Error)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [collectionName]
  )

  return {
    create,
    update,
    remove,
    loading,
    error,
  }
}
