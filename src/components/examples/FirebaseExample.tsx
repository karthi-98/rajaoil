// Example Component Demonstrating Firebase Integration
// This is a reference implementation - NOT for production use
'use client'

import { useState } from 'react'
import { useAuth, useFirestoreCollection, useStorage } from '@/hooks'
import type { Product } from '@/lib/types/firebase.types'

/**
 * Example: Complete Firebase Integration Demo
 * Shows Authentication, Firestore, and Storage usage
 */
export default function FirebaseExample() {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      <h1 className="text-3xl font-bold">Firebase Integration Examples</h1>

      {/* Authentication Example */}
      <section className="border-2 border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">1. Authentication</h2>
        <AuthenticationExample />
      </section>

      {/* Firestore Example */}
      <section className="border-2 border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">2. Firestore Database</h2>
        <FirestoreExample />
      </section>

      {/* Storage Example */}
      <section className="border-2 border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">3. Firebase Storage</h2>
        <StorageExample />
      </section>
    </div>
  )
}

/**
 * Authentication Example Component
 */
function AuthenticationExample() {
  const { user, loading, signUp, signIn, signOut, signInWithGoogle, error } = useAuth()
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    displayName: '',
  })

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signUp(credentials)
      alert('Account created successfully!')
    } catch (error) {
      console.error('Sign up error:', error)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signIn({
        email: credentials.email,
        password: credentials.password,
      })
      alert('Signed in successfully!')
    } catch (error) {
      console.error('Sign in error:', error)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      alert('Signed in with Google!')
    } catch (error) {
      console.error('Google sign-in error:', error)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      alert('Signed out successfully!')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  if (loading) {
    return <div className="text-center p-4">Loading...</div>
  }

  if (user) {
    return (
      <div className="space-y-4">
        <div className="bg-green-100 border border-green-400 rounded p-4">
          <p className="font-semibold">Logged in as: {user.displayName || user.email}</p>
          <p className="text-sm text-gray-600">UID: {user.uid}</p>
          <p className="text-sm text-gray-600">
            Email Verified: {user.emailVerified ? '✅' : '❌'}
          </p>
        </div>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error.message}
        </div>
      )}

      <form onSubmit={handleSignUp} className="space-y-3">
        <h3 className="font-semibold">Sign Up</h3>
        <input
          type="text"
          placeholder="Name"
          value={credentials.displayName}
          onChange={(e) => setCredentials({ ...credentials, displayName: e.target.value })}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          className="w-full px-3 py-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>

      <form onSubmit={handleSignIn} className="space-y-3">
        <h3 className="font-semibold">Sign In</h3>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Sign In
        </button>
      </form>

      <div>
        <button
          onClick={handleGoogleSignIn}
          className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  )
}

/**
 * Firestore Example Component
 */
function FirestoreExample() {
  const { data: products, loading, error, refetch } = useFirestoreCollection<Product>('products')

  if (loading) {
    return <div className="text-center p-4">Loading products...</div>
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error: {error.message}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          {products.length} products loaded from Firestore
        </p>
        <button
          onClick={refetch}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
        >
          Refresh
        </button>
      </div>

      {products.length === 0 ? (
        <div className="bg-yellow-100 border border-yellow-400 rounded p-4">
          <p>No products found. Add some products in Firebase Console:</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>Go to Firebase Console</li>
            <li>Navigate to Firestore Database</li>
            <li>Create a collection named "products"</li>
            <li>Add a document with fields like: name, price, description, etc.</li>
          </ol>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.slice(0, 4).map((product) => (
            <div key={product.id} className="border rounded-lg p-4 hover:shadow-lg transition">
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded mb-2"
                />
              )}
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
              <p className="text-lg font-bold mt-2">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * Storage Example Component
 */
function StorageExample() {
  const { uploadImage, loading, progress } = useStorage()
  const [uploadedUrl, setUploadedUrl] = useState<string>('')
  const [uploadError, setUploadError] = useState<string>('')

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploadError('')
      setUploadedUrl('')

      const result = await uploadImage(file, 'products')
      setUploadedUrl(result.url)
      console.log('Image uploaded successfully:', result)
    } catch (error: any) {
      setUploadError(error.message)
      console.error('Upload error:', error)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Upload Product Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={loading}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {loading && progress && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Uploading...</span>
            <span>{progress.percentage.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-600">
            {(progress.bytesTransferred / 1024).toFixed(0)} KB /{' '}
            {(progress.totalBytes / 1024).toFixed(0)} KB
          </p>
        </div>
      )}

      {uploadError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {uploadError}
        </div>
      )}

      {uploadedUrl && (
        <div className="bg-green-100 border border-green-400 rounded p-4">
          <p className="font-semibold mb-2">✅ Upload successful!</p>
          <img src={uploadedUrl} alt="Uploaded" className="w-full max-w-md rounded mb-2" />
          <p className="text-xs break-all text-gray-600">{uploadedUrl}</p>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded p-4 text-sm">
        <p className="font-semibold mb-1">💡 Tips:</p>
        <ul className="list-disc ml-4 space-y-1">
          <li>Images are automatically compressed before upload</li>
          <li>Maximum file size: 5MB</li>
          <li>Supported formats: JPEG, PNG, WebP</li>
          <li>Images are stored in Firebase Storage under /images/products/</li>
        </ul>
      </div>
    </div>
  )
}
