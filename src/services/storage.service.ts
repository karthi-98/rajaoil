// Firebase Storage Service Layer
// Following modular programming best practices - all storage operations centralized
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
  getMetadata,
  updateMetadata,
} from 'firebase/storage'
import { storage } from '@/lib/firebase/config'
import type { UploadProgress, UploadResult } from '@/lib/types/firebase.types'

/**
 * Firebase Storage Service Class
 * Handles all file upload/download/delete operations
 */
export class StorageService {
  /**
   * Upload a file to Firebase Storage
   */
  static async uploadFile(
    file: File,
    path: string,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<UploadResult> {
    try {
      const fileRef = ref(storage, path)

      if (onProgress) {
        // Upload with progress tracking
        return this.uploadFileWithProgress(file, path, onProgress)
      } else {
        // Simple upload without progress
        const snapshot = await uploadBytes(fileRef, file)
        const downloadURL = await getDownloadURL(snapshot.ref)

        return {
          url: downloadURL,
          path: snapshot.ref.fullPath,
          name: file.name,
          size: file.size,
        }
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      throw error
    }
  }

  /**
   * Upload file with progress tracking
   */
  static async uploadFileWithProgress(
    file: File,
    path: string,
    onProgress: (progress: UploadProgress) => void
  ): Promise<UploadResult> {
    return new Promise((resolve, reject) => {
      const fileRef = ref(storage, path)
      const uploadTask = uploadBytesResumable(fileRef, file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress: UploadProgress = {
            bytesTransferred: snapshot.bytesTransferred,
            totalBytes: snapshot.totalBytes,
            percentage: (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          }
          onProgress(progress)
        },
        (error) => {
          console.error('Upload error:', error)
          reject(error)
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
            resolve({
              url: downloadURL,
              path: uploadTask.snapshot.ref.fullPath,
              name: file.name,
              size: file.size,
            })
          } catch (error) {
            reject(error)
          }
        }
      )
    })
  }

  /**
   * Upload multiple files
   */
  static async uploadMultipleFiles(
    files: File[],
    basePath: string,
    onProgress?: (fileIndex: number, progress: UploadProgress) => void
  ): Promise<UploadResult[]> {
    try {
      const uploadPromises = files.map((file, index) => {
        const filePath = `${basePath}/${Date.now()}_${file.name}`
        const progressCallback = onProgress
          ? (progress: UploadProgress) => onProgress(index, progress)
          : undefined

        return this.uploadFile(file, filePath, progressCallback)
      })

      return await Promise.all(uploadPromises)
    } catch (error) {
      console.error('Error uploading multiple files:', error)
      throw error
    }
  }

  /**
   * Upload image with automatic path generation
   */
  static async uploadImage(
    file: File,
    folder: 'products' | 'users' | 'blog' | 'categories',
    onProgress?: (progress: UploadProgress) => void
  ): Promise<UploadResult> {
    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('File must be an image')
      }

      // Generate unique filename
      const timestamp = Date.now()
      const fileName = `${timestamp}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const path = `images/${folder}/${fileName}`

      return await this.uploadFile(file, path, onProgress)
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
    }
  }

  /**
   * Upload product images
   */
  static async uploadProductImages(
    files: File[],
    productId: string,
    onProgress?: (fileIndex: number, progress: UploadProgress) => void
  ): Promise<UploadResult[]> {
    const basePath = `images/products/${productId}`
    return this.uploadMultipleFiles(files, basePath, onProgress)
  }

  /**
   * Upload user avatar
   */
  static async uploadUserAvatar(
    file: File,
    userId: string,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<UploadResult> {
    const path = `images/users/${userId}/avatar_${Date.now()}.${file.name.split('.').pop()}`
    return this.uploadFile(file, path, onProgress)
  }

  /**
   * Get download URL for a file
   */
  static async getFileURL(path: string): Promise<string> {
    try {
      const fileRef = ref(storage, path)
      return await getDownloadURL(fileRef)
    } catch (error) {
      console.error('Error getting file URL:', error)
      throw error
    }
  }

  /**
   * Delete a file from storage
   */
  static async deleteFile(path: string): Promise<void> {
    try {
      const fileRef = ref(storage, path)
      await deleteObject(fileRef)
    } catch (error) {
      console.error('Error deleting file:', error)
      throw error
    }
  }

  /**
   * Delete multiple files
   */
  static async deleteMultipleFiles(paths: string[]): Promise<void> {
    try {
      const deletePromises = paths.map((path) => this.deleteFile(path))
      await Promise.all(deletePromises)
    } catch (error) {
      console.error('Error deleting multiple files:', error)
      throw error
    }
  }

  /**
   * List all files in a folder
   */
  static async listFiles(folderPath: string): Promise<string[]> {
    try {
      const folderRef = ref(storage, folderPath)
      const result = await listAll(folderRef)

      return result.items.map((itemRef) => itemRef.fullPath)
    } catch (error) {
      console.error('Error listing files:', error)
      throw error
    }
  }

  /**
   * Get file metadata
   */
  static async getFileMetadata(path: string) {
    try {
      const fileRef = ref(storage, path)
      return await getMetadata(fileRef)
    } catch (error) {
      console.error('Error getting file metadata:', error)
      throw error
    }
  }

  /**
   * Update file metadata
   */
  static async updateFileMetadata(
    path: string,
    metadata: {
      contentType?: string
      customMetadata?: Record<string, string>
    }
  ): Promise<void> {
    try {
      const fileRef = ref(storage, path)
      await updateMetadata(fileRef, metadata)
    } catch (error) {
      console.error('Error updating file metadata:', error)
      throw error
    }
  }

  /**
   * Compress image before upload (client-side)
   * Returns a compressed File object
   */
  static async compressImage(
    file: File,
    maxWidth: number = 1200,
    maxHeight: number = 1200,
    quality: number = 0.8
  ): Promise<File> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (e) => {
        const img = new Image()

        img.onload = () => {
          const canvas = document.createElement('canvas')
          let width = img.width
          let height = img.height

          // Calculate new dimensions
          if (width > height) {
            if (width > maxWidth) {
              height = (height * maxWidth) / width
              width = maxWidth
            }
          } else {
            if (height > maxHeight) {
              width = (width * maxHeight) / height
              height = maxHeight
            }
          }

          canvas.width = width
          canvas.height = height

          const ctx = canvas.getContext('2d')
          if (!ctx) {
            reject(new Error('Could not get canvas context'))
            return
          }

          ctx.drawImage(img, 0, 0, width, height)

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Could not compress image'))
                return
              }

              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              })

              resolve(compressedFile)
            },
            'image/jpeg',
            quality
          )
        }

        img.onerror = () => reject(new Error('Could not load image'))
        img.src = e.target?.result as string
      }

      reader.onerror = () => reject(new Error('Could not read file'))
      reader.readAsDataURL(file)
    })
  }

  /**
   * Validate file size
   */
  static validateFileSize(file: File, maxSizeMB: number = 5): boolean {
    const maxSizeBytes = maxSizeMB * 1024 * 1024
    return file.size <= maxSizeBytes
  }

  /**
   * Validate file type
   */
  static validateFileType(
    file: File,
    allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/webp']
  ): boolean {
    return allowedTypes.includes(file.type)
  }

  /**
   * Get file extension from filename
   */
  static getFileExtension(filename: string): string {
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2)
  }

  /**
   * Generate unique filename
   */
  static generateUniqueFileName(originalName: string): string {
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 8)
    const extension = this.getFileExtension(originalName)
    const baseName = originalName.replace(`.${extension}`, '').replace(/[^a-zA-Z0-9]/g, '_')

    return `${baseName}_${timestamp}_${randomString}.${extension}`
  }
}
