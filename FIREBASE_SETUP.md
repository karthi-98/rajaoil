# Firebase Integration Guide for Next.js 15.5.2

This guide explains how to use Firebase in your Raja Oil e-commerce application. The integration follows **modular programming best practices** as outlined in CLAUDE.md.

## 📁 Project Structure

```
src/
├── lib/
│   ├── firebase/
│   │   └── config.ts          # Firebase initialization
│   └── types/
│       └── firebase.types.ts  # TypeScript types
├── services/
│   ├── auth.service.ts        # Authentication service
│   ├── firestore.service.ts   # Database service
│   ├── storage.service.ts     # Storage service
│   └── index.ts               # Barrel export
└── hooks/
    ├── useAuth.ts             # Auth hook
    ├── useFirestore.ts        # Firestore hooks
    ├── useStorage.ts          # Storage hooks
    └── index.ts               # Barrel export
```

## 🚀 Quick Start

### 1. Set Up Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Click on "Web" icon (</>) to add a web app
4. Copy the Firebase configuration

### 2. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in your Firebase credentials in `.env.local`:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

### 3. Enable Firebase Services

#### Authentication
1. Go to **Authentication** > **Sign-in method**
2. Enable **Email/Password**
3. Enable **Google** sign-in

#### Firestore Database
1. Go to **Firestore Database**
2. Click **Create database**
3. Start in **production mode** (we'll set up rules later)
4. Choose a location

#### Storage
1. Go to **Storage**
2. Click **Get started**
3. Use default security rules (we'll update later)

### 4. Set Up Security Rules

#### Firestore Rules
Go to **Firestore Database** > **Rules** and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow update, delete: if isOwner(userId);
    }

    // Products collection (public read, admin write)
    match /products/{productId} {
      allow read: if true;
      allow write: if isAuthenticated(); // TODO: Add admin check
    }

    // Categories collection
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if isAuthenticated(); // TODO: Add admin check
    }

    // Orders collection
    match /orders/{orderId} {
      allow read: if isAuthenticated() &&
                     resource.data.userId == request.auth.uid;
      allow create: if isAuthenticated();
      allow update: if isOwner(resource.data.userId);
    }

    // Reviews collection
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if isAuthenticated();
      allow update, delete: if isOwner(resource.data.userId);
    }
  }
}
```

#### Storage Rules
Go to **Storage** > **Rules** and paste:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return request.auth.uid == userId;
    }

    function isImage() {
      return request.resource.contentType.matches('image/.*');
    }

    function isValidSize() {
      return request.resource.size < 5 * 1024 * 1024; // 5MB
    }

    // Product images
    match /images/products/{productId}/{fileName} {
      allow read: if true;
      allow write: if isAuthenticated() && isImage() && isValidSize();
    }

    // User avatars
    match /images/users/{userId}/{fileName} {
      allow read: if true;
      allow write: if isOwner(userId) && isImage() && isValidSize();
    }

    // Blog images
    match /images/blog/{fileName} {
      allow read: if true;
      allow write: if isAuthenticated() && isImage() && isValidSize();
    }

    // Category images
    match /images/categories/{fileName} {
      allow read: if true;
      allow write: if isAuthenticated() && isImage() && isValidSize();
    }
  }
}
```

## 📚 Usage Examples

### Authentication

#### Sign Up with Email/Password
```typescript
'use client'

import { useAuth } from '@/hooks'
import { useState } from 'react'

export default function SignUpForm() {
  const { signUp, loading, error } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await signUp(formData)
      alert('Account created successfully!')
    } catch (error) {
      console.error('Sign up error:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={formData.displayName}
        onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Creating account...' : 'Sign Up'}
      </button>
      {error && <p className="error">{error.message}</p>}
    </form>
  )
}
```

#### Sign In with Google
```typescript
'use client'

import { useAuth } from '@/hooks'

export default function GoogleSignInButton() {
  const { signInWithGoogle, loading } = useAuth()

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      alert('Signed in successfully!')
    } catch (error) {
      console.error('Google sign-in error:', error)
    }
  }

  return (
    <button onClick={handleGoogleSignIn} disabled={loading}>
      {loading ? 'Signing in...' : 'Sign in with Google'}
    </button>
  )
}
```

#### Protected Route
```typescript
'use client'

import { useAuth } from '@/hooks'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null
  }

  return (
    <div>
      <h1>Welcome, {user.displayName}!</h1>
      {/* Protected content */}
    </div>
  )
}
```

### Firestore Database

#### Fetch Products
```typescript
'use client'

import { useFirestoreCollection } from '@/hooks'
import type { Product } from '@/lib/types/firebase.types'

export default function ProductsList() {
  const { data: products, loading, error } = useFirestoreCollection<Product>('products')

  if (loading) return <div>Loading products...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  )
}
```

#### Query Products by Category
```typescript
'use client'

import { useFirestoreQuery } from '@/hooks'
import type { Product } from '@/lib/types/firebase.types'

export default function CategoryProducts({ category }: { category: string }) {
  const { data: products, loading } = useFirestoreQuery<Product>(
    'products',
    [{ field: 'category', operator: '==', value: category }],
    'createdAt',
    'desc',
    10
  )

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h2>{category} Products</h2>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  )
}
```

#### Create, Update, Delete Products
```typescript
'use client'

import { useFirestoreMutations } from '@/hooks'
import type { Product } from '@/lib/types/firebase.types'

export default function ProductAdmin() {
  const { create, update, remove, loading } = useFirestoreMutations<Product>('products')

  const handleCreateProduct = async () => {
    const productData = {
      name: 'Coconut Oil',
      price: 15.99,
      description: 'Premium coconut oil',
      // ... other fields
    }

    try {
      const id = await create(productData)
      console.log('Product created with ID:', id)
    } catch (error) {
      console.error('Error creating product:', error)
    }
  }

  const handleUpdateProduct = async (productId: string) => {
    try {
      await update(productId, { price: 19.99 })
      console.log('Product updated')
    } catch (error) {
      console.error('Error updating product:', error)
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    try {
      await remove(productId, true) // true = soft delete
      console.log('Product deleted')
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  return (
    <div>
      <button onClick={handleCreateProduct} disabled={loading}>
        Create Product
      </button>
      {/* Add more buttons */}
    </div>
  )
}
```

### Firebase Storage

#### Upload Product Image
```typescript
'use client'

import { useStorage } from '@/hooks'
import { useState } from 'react'

export default function ImageUpload() {
  const { uploadImage, loading, progress } = useStorage()
  const [imageUrl, setImageUrl] = useState<string>('')

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const result = await uploadImage(file, 'products')
      setImageUrl(result.url)
      console.log('Image uploaded:', result.url)
    } catch (error) {
      console.error('Upload error:', error)
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={loading}
      />

      {loading && progress && (
        <div>
          <p>Uploading: {progress.percentage.toFixed(0)}%</p>
          <progress value={progress.percentage} max="100" />
        </div>
      )}

      {imageUrl && (
        <div>
          <p>Uploaded successfully!</p>
          <img src={imageUrl} alt="Uploaded" width={200} />
        </div>
      )}
    </div>
  )
}
```

#### Upload Multiple Product Images
```typescript
'use client'

import { useProductImageUpload } from '@/hooks'

export default function MultipleImageUpload({ productId }: { productId: string }) {
  const { uploadImages, loading, progress } = useProductImageUpload(productId)

  const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    try {
      const results = await uploadImages(files)
      console.log('Images uploaded:', results)
    } catch (error) {
      console.error('Upload error:', error)
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFilesChange}
        disabled={loading}
      />

      {loading && progress && (
        <div>
          <p>Uploading: {progress.percentage.toFixed(0)}%</p>
          <progress value={progress.percentage} max="100" />
        </div>
      )}
    </div>
  )
}
```

## 🎯 Best Practices

### 1. Always Use Service Layer
```typescript
// ✅ GOOD
import { ProductService } from '@/services'
const products = await ProductService.getProducts()

// ❌ BAD - Don't make direct Firebase calls in components
import { collection, getDocs } from 'firebase/firestore'
const snapshot = await getDocs(collection(db, 'products'))
```

### 2. Use Custom Hooks in Client Components
```typescript
// ✅ GOOD
'use client'
import { useAuth, useFirestoreCollection } from '@/hooks'

// ❌ BAD - Don't use hooks in server components
import { useAuth } from '@/hooks' // This won't work in Server Components
```

### 3. Handle Loading and Error States
```typescript
const { data, loading, error } = useFirestoreCollection('products')

if (loading) return <LoadingSpinner />
if (error) return <ErrorMessage error={error} />
return <ProductList products={data} />
```

### 4. Optimize Images Before Upload
The Storage service automatically compresses images, but you can customize:
```typescript
const compressedFile = await StorageService.compressImage(
  file,
  1200,  // max width
  1200,  // max height
  0.85   // quality (0-1)
)
```

## 🔒 Security Checklist

- [ ] Set up Firestore Security Rules
- [ ] Set up Storage Security Rules
- [ ] Never commit `.env.local` to git
- [ ] Validate user input on client and server
- [ ] Implement proper authentication checks
- [ ] Use HTTPS in production
- [ ] Enable App Check for production
- [ ] Regularly review Firebase Console for unusual activity

## 📖 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [CLAUDE.md](./CLAUDE.md) - Project best practices

## 🆘 Troubleshooting

### Firebase Not Initialized
- Check `.env.local` file exists
- Verify all environment variables are set
- Restart development server

### Authentication Errors
- Check Firebase Console > Authentication is enabled
- Verify email/password or Google sign-in is enabled
- Check browser console for detailed errors

### Firestore Permission Denied
- Review Firestore Security Rules
- Ensure user is authenticated
- Check user has proper permissions

### Image Upload Fails
- Check file size (must be < 5MB)
- Verify file type is image
- Check Storage Security Rules

## 🎉 You're Ready!

Your Firebase integration is now complete. Start building amazing features for Raja Oil e-commerce!
