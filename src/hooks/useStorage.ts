// Custom Hook for Firebase Storage Operations
// Following modular programming best practices
'use client'

import { useState, useCallback } from 'react'
import { StorageService } from '@/services/storage.service'
import type { UploadProgress, UploadResult } from '@/lib/types/firebase.types'

interface UseStorageReturn {
  uploadFile: (file: File, path: string) => Promise<UploadResult>
  uploadImage: (
    file: File,
    folder: 'products' | 'users' | 'blog' | 'categories'
  ) => Promise<UploadResult>
  uploadMultipleFiles: (files: File[], basePath: string) => Promise<UploadResult[]>
  deleteFile: (path: string) => Promise<void>
  loading: boolean
  progress: UploadProgress | null
  error: Error | null
}

/**
 * Custom hook for Firebase Storage operations
 * Provides file upload, download, and delete functionality with progress tracking
 */
export function useStorage(): UseStorageReturn {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState<UploadProgress | null>(null)
  const [error, setError] = useState<Error | null>(null)

  // Upload a single file
  const uploadFile = useCallback(async (file: File, path: string) => {
    try {
      setLoading(true)
      setError(null)
      setProgress(null)

      const result = await StorageService.uploadFile(file, path, (prog) => {
        setProgress(prog)
      })

      return result
    } catch (err) {
      const error = err as Error
      setError(error)
      throw error
    } finally {
      setLoading(false)
      setProgress(null)
    }
  }, [])

  // Upload an image
  const uploadImage = useCallback(
    async (file: File, folder: 'products' | 'users' | 'blog' | 'categories') => {
      try {
        setLoading(true)
        setError(null)
        setProgress(null)

        // Validate file type
        if (!StorageService.validateFileType(file)) {
          throw new Error('Invalid file type. Only JPEG, PNG, and WebP images are allowed.')
        }

        // Validate file size (5MB)
        if (!StorageService.validateFileSize(file, 5)) {
          throw new Error('File size exceeds 5MB limit.')
        }

        // Compress image if needed
        let fileToUpload = file
        if (file.size > 1024 * 1024) {
          // Compress if larger than 1MB
          fileToUpload = await StorageService.compressImage(file, 1200, 1200, 0.8)
        }

        const result = await StorageService.uploadImage(
          fileToUpload,
          folder,
          (prog) => {
            setProgress(prog)
          }
        )

        return result
      } catch (err) {
        const error = err as Error
        setError(error)
        throw error
      } finally {
        setLoading(false)
        setProgress(null)
      }
    },
    []
  )

  // Upload multiple files
  const uploadMultipleFiles = useCallback(
    async (files: File[], basePath: string) => {
      try {
        setLoading(true)
        setError(null)
        setProgress(null)

        const results = await StorageService.uploadMultipleFiles(
          files,
          basePath,
          (fileIndex, prog) => {
            // Calculate overall progress
            const overallProgress: UploadProgress = {
              bytesTransferred:
                (fileIndex * files[0].size) + prog.bytesTransferred,
              totalBytes: files.reduce((sum, f) => sum + f.size, 0),
              percentage:
                ((fileIndex + prog.percentage / 100) / files.length) * 100,
            }
            setProgress(overallProgress)
          }
        )

        return results
      } catch (err) {
        const error = err as Error
        setError(error)
        throw error
      } finally {
        setLoading(false)
        setProgress(null)
      }
    },
    []
  )

  // Delete a file
  const deleteFile = useCallback(async (path: string) => {
    try {
      setLoading(true)
      setError(null)
      await StorageService.deleteFile(path)
    } catch (err) {
      const error = err as Error
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    uploadFile,
    uploadImage,
    uploadMultipleFiles,
    deleteFile,
    loading,
    progress,
    error,
  }
}

/**
 * Hook for uploading user avatar
 */
export function useAvatarUpload(userId: string) {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState<UploadProgress | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const uploadAvatar = useCallback(
    async (file: File) => {
      try {
        setLoading(true)
        setError(null)
        setProgress(null)

        // Validate file
        if (!StorageService.validateFileType(file)) {
          throw new Error('Invalid file type. Only images are allowed.')
        }

        if (!StorageService.validateFileSize(file, 2)) {
          throw new Error('File size exceeds 2MB limit.')
        }

        // Compress image
        const compressedFile = await StorageService.compressImage(
          file,
          400,
          400,
          0.9
        )

        const result = await StorageService.uploadUserAvatar(
          compressedFile,
          userId,
          (prog) => {
            setProgress(prog)
          }
        )

        return result
      } catch (err) {
        const error = err as Error
        setError(error)
        throw error
      } finally {
        setLoading(false)
        setProgress(null)
      }
    },
    [userId]
  )

  return {
    uploadAvatar,
    loading,
    progress,
    error,
  }
}

/**
 * Hook for uploading product images
 */
export function useProductImageUpload(productId: string) {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState<UploadProgress | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const uploadImages = useCallback(
    async (files: File[]) => {
      try {
        setLoading(true)
        setError(null)
        setProgress(null)

        // Validate all files
        for (const file of files) {
          if (!StorageService.validateFileType(file)) {
            throw new Error(`Invalid file type for ${file.name}. Only images are allowed.`)
          }

          if (!StorageService.validateFileSize(file, 5)) {
            throw new Error(`File ${file.name} exceeds 5MB limit.`)
          }
        }

        // Compress images
        const compressedFiles = await Promise.all(
          files.map((file) =>
            StorageService.compressImage(file, 1200, 1200, 0.85)
          )
        )

        const results = await StorageService.uploadProductImages(
          compressedFiles,
          productId,
          (fileIndex, prog) => {
            const overallProgress: UploadProgress = {
              bytesTransferred:
                (fileIndex * files[0].size) + prog.bytesTransferred,
              totalBytes: files.reduce((sum, f) => sum + f.size, 0),
              percentage:
                ((fileIndex + prog.percentage / 100) / files.length) * 100,
            }
            setProgress(overallProgress)
          }
        )

        return results
      } catch (err) {
        const error = err as Error
        setError(error)
        throw error
      } finally {
        setLoading(false)
        setProgress(null)
      }
    },
    [productId]
  )

  return {
    uploadImages,
    loading,
    progress,
    error,
  }
}
