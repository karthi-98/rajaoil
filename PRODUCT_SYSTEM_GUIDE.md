# Product System Implementation Guide

## Overview

This document describes the complete product management system integrated with Firebase Firestore, featuring multi-variant selection and cart functionality.

## Database Structure

### Firebase Firestore Collection: `rajaoil`

```javascript
{
  // Document ID: Auto-generated or custom
  brand: "TSRG MITHRA BRAND",
  docType: "product", // IMPORTANT: Filter by this field
  mainImage: "https://images.pexels.com/photos/6801176/...",
  types: [
    {
      name: "15 KG Tin",
      price: "2750",
      image: "https://placehold.co/600x400"
    },
    {
      name: "5 ltr Can",
      price: "1000",
      image: "https://placehold.co/600x400"
    },
    {
      name: "500 ml Jar",
      price: "2100",
      image: "https://placehold.co/600x400"
    }
  ]
}
```

**Note**: Only documents with `docType: "product"` are fetched and displayed.

## File Structure

```
src/
├── lib/
│   ├── types.ts                    # Product and CartItem types
│   ├── firebase/
│   │   └── config.ts               # Firebase initialization
│   └── whatsapp.ts                 # WhatsApp integration (updated)
│
├── services/
│   └── product.service.ts          # Product data fetching service
│
├── components/
│   ├── product/
│   │   ├── ProductCard.tsx         # Product display card
│   │   ├── ProductGrid.tsx         # Product grid layout
│   │   ├── ProductImageSlider.tsx  # Image slider with thumbnails
│   │   └── index.ts                # Barrel export
│   │
│   └── cart/
│       ├── CartSidebar.tsx         # Updated for new structure
│       └── ...
│
├── app/
│   ├── page.tsx                    # Homepage with product grid
│   ├── products/
│   │   └── [id]/
│   │       └── page.tsx            # Product detail page
│   └── checkout/
│       └── page.tsx                # Checkout page (updated)
│
├── hooks/
│   └── useCart.ts                  # Cart hook (updated)
│
└── contexts/
    └── CartContext.tsx             # Cart context (updated)
```

## Type Definitions

### Product Type (`src/lib/types.ts`)

```typescript
// Product variant/packaging type
export interface ProductType {
  name: string        // e.g., "15 KG Tin"
  price: string       // e.g., "2750"
  image: string       // Variant image URL
}

// Main product structure
export interface Product {
  id: string
  brand: string
  docType: string
  mainImage: string
  types: ProductType[]
  description?: string
}

// Cart item with selected variant
export interface CartItem {
  id: string           // Unique: productId-variantName
  productId: string    // Firebase document ID
  brand: string        // Product brand
  name: string         // Variant name
  price: number        // Variant price (as number)
  image: string        // Variant or main image
  quantity: number     // Quantity
}
```

## Features

### 1. Homepage Product Display

**Location**: `src/app/page.tsx`

- Fetches all products from Firebase (server-side)
- Filters only `docType === "product"` documents
- Displays in responsive grid (1-4 columns)
- Shows price range for multi-variant products
- Displays first 3 variants as badges

### 2. Product Card

**Location**: `src/components/product/ProductCard.tsx`

**Features**:
- Responsive design
- Hover effects (shadow, scale, translate)
- Shows variant count badge
- Displays price range (min - max)
- Lists available variants
- Click to view details

### 3. Product Detail Page

**Location**: `src/app/products/[id]/page.tsx`

**Features**:
- Dynamic route: `/products/[productId]`
- Image slider with all variant images
- Multi-select variant functionality
- Checkbox-style selection
- Selected items summary
- Real-time total calculation
- Add multiple variants to cart at once

**Layout**:
- **Left Side**: Image slider with thumbnails
- **Right Side**: Product info, variant selection, add to cart

### 4. Image Slider

**Location**: `src/components/product/ProductImageSlider.tsx`

**Features**:
- Uses Swiper.js
- Main slider with navigation
- Thumbnail slider below
- Zoom functionality
- Responsive
- Shows all variant images

**Swiper Modules Used**:
- FreeMode
- Navigation
- Thumbs
- Zoom

### 5. Multi-Variant Selection

**How it works**:
1. User can select multiple packaging types (checkboxes)
2. Each selection is tracked in state
3. Total price updates dynamically
4. Summary shows all selected items
5. On "Add to Cart", each variant becomes a separate cart item

**Benefits**:
- Buy multiple variants in one action
- Clear price breakdown
- Flexible shopping experience

## Service Layer

### ProductService (`src/services/product.service.ts`)

```typescript
// Fetch all products (only docType === 'product')
ProductService.getAllProducts(): Promise<Product[]>

// Get single product by ID
ProductService.getProductById(productId: string): Promise<Product | null>

// Get featured products
ProductService.getFeaturedProducts(limit: number): Promise<Product[]>
```

## Cart Integration

### Updated Cart Item Structure

Old structure (simple):
```typescript
{ id, name, price, image, quantity }
```

New structure (with variants):
```typescript
{
  id: "productId-variantName",  // Unique identifier
  productId: "firebaseDocId",   // Original product ID
  brand: "TSRG MITHRA BRAND",   // Product brand
  name: "15 KG Tin",            // Variant name
  price: 2750,                  // Variant price (number)
  image: "variant-image.jpg",   // Variant image
  quantity: 1                   // Quantity
}
```

### Cart Functions

```typescript
// Add item to cart
addItem(item: {
  id: string
  productId: string
  brand: string
  name: string
  price: number
  image: string
}, quantity?: number)

// Remove item from cart
removeItem(itemId: string)

// Update quantity
updateQuantity(itemId: string, quantity: number)

// Clear cart
clearCart()
```

### Cart Display

**Cart Sidebar** shows:
- Brand name (main heading)
- Variant name (subheading)
- Price and quantity
- Remove button

**Example**:
```
TSRG MITHRA BRAND
15 KG Tin
₹2,750
Qty: 1
```

## WhatsApp Integration

### Updated Message Format

```
🛒 *New Order from Raja Oil*

👤 *Customer:* John Doe
📱 *Phone:* +91 9876543210
📍 *Address:* 123 Street, City

📦 *Order Items:*
─────────────────
1. *TSRG MITHRA BRAND - 15 KG Tin*
   Qty: 2 × ₹2,750.00
   Subtotal: ₹5,500.00

2. *TSRG MITHRA BRAND - 5 ltr Can*
   Qty: 1 × ₹1,000.00
   Subtotal: ₹1,000.00

─────────────────
💰 *Total Amount:* ₹6,500.00

_Thank you for your order!_ 🙏
```

## Usage Examples

### 1. Display Products on Homepage

```typescript
// src/app/page.tsx (Server Component)
import { ProductService } from '@/services/product.service'
import ProductGrid from '@/components/product/ProductGrid'

export default async function Home() {
  const products = await ProductService.getAllProducts()

  return (
    <div>
      <ProductGrid products={products} title="Our Products" />
    </div>
  )
}
```

### 2. Product Detail Page

```typescript
// src/app/products/[id]/page.tsx (Client Component)
'use client'

import { useParams } from 'next/navigation'
import { ProductService } from '@/services/product.service'

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    ProductService.getProductById(params.id).then(setProduct)
  }, [params.id])

  // ... render product details with multi-select
}
```

### 3. Add Multiple Variants to Cart

```typescript
const { addItem } = useCartContext()

const handleAddToCart = () => {
  // Add each selected variant
  selectedVariants.forEach((variant) => {
    addItem({
      id: `${product.id}-${variant.name}`,
      productId: product.id,
      brand: product.brand,
      name: variant.name,
      price: parseFloat(variant.price),
      image: variant.image || product.mainImage,
    }, 1)
  })
}
```

## Styling

### Currency Formatting

Uses Indian Rupee (INR) format:
```typescript
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
}
```

**Output**: ₹2,750

### Responsive Breakpoints

```
grid-cols-1       // Mobile (< 640px)
sm:grid-cols-2    // Small (≥ 640px)
lg:grid-cols-3    // Large (≥ 1024px)
xl:grid-cols-4    // Extra Large (≥ 1280px)
```

## Data Flow

### Product Listing Flow

```
Firebase Firestore
    ↓
ProductService.getAllProducts()
    ↓
Filter by docType === 'product'
    ↓
Homepage (Server Component)
    ↓
ProductGrid Component
    ↓
ProductCard Components
    ↓
Click → Navigate to /products/[id]
```

### Add to Cart Flow

```
Product Detail Page
    ↓
User selects variants
    ↓
Click "Add to Cart"
    ↓
useCartContext().addItem()
    ↓
Create CartItem for each variant
    ↓
Save to localStorage
    ↓
Update cart count badge
    ↓
Trigger +1 animation
```

### Checkout Flow

```
Cart Sidebar
    ↓
Click "Proceed to Checkout"
    ↓
Checkout Page
    ↓
Fill customer details
    ↓
Click "Complete Order on WhatsApp"
    ↓
Generate WhatsApp message
    ↓
Open WhatsApp with pre-filled message
    ↓
Clear cart
```

## Performance Optimizations

### Server-Side Rendering (SSR)

- Homepage fetches products on server
- Faster initial load
- Better SEO
- No loading spinner on first visit

### Image Optimization

- Uses Next.js `<Image>` component
- Automatic WebP conversion
- Lazy loading
- Responsive sizes
- Blur placeholder support

### Caching

- Firebase queries can be cached
- LocalStorage for cart persistence
- Server-side product data caching

## Error Handling

### Product Not Found

```typescript
if (!product) {
  return (
    <div>
      <h1>Product Not Found</h1>
      <Link href="/">Back to Home</Link>
    </div>
  )
}
```

### Empty Cart Redirect

```typescript
useEffect(() => {
  if (items.length === 0) {
    setTimeout(() => router.push('/'), 2000)
  }
}, [items.length])
```

### Firebase Errors

```typescript
try {
  const products = await ProductService.getAllProducts()
} catch (error) {
  console.error('Error fetching products:', error)
  return [] // Return empty array
}
```

## Testing

### Test Product Display

1. Add products to Firebase with `docType: "product"`
2. Visit homepage
3. Verify products display correctly
4. Check responsive layout

### Test Multi-Select

1. Click on a product
2. Select multiple variants
3. Verify total updates
4. Click "Add to Cart"
5. Check cart sidebar shows all items

### Test Checkout

1. Add items to cart
2. Go to checkout
3. Fill form
4. Click WhatsApp button
5. Verify message format
6. Check cart clears after

## Troubleshooting

### Products Not Showing

**Issue**: No products on homepage

**Solutions**:
1. Check Firebase connection in `.env.local`
2. Verify documents have `docType: "product"`
3. Check browser console for errors
4. Verify collection name is "rajaoil"

### Image Not Loading

**Issue**: Images show placeholder

**Solutions**:
1. Check image URLs in Firebase
2. Verify image URLs are accessible
3. Check Next.js image configuration
4. Add domain to `next.config.js` if external

### Cart Not Updating

**Issue**: Items not adding to cart

**Solutions**:
1. Check browser console for errors
2. Verify localStorage is enabled
3. Check cart context provider in layout
4. Verify CartItem structure matches types

### WhatsApp Not Opening

**Issue**: WhatsApp doesn't open

**Solutions**:
1. Check phone number format (919698035903)
2. Verify WhatsApp is installed (mobile)
3. Check browser popup blocker
4. Test on mobile vs desktop

## Future Enhancements

Potential improvements:

- [ ] Product search functionality
- [ ] Category filtering
- [ ] Price range filtering
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Product comparison
- [ ] Bulk ordering
- [ ] Discount codes
- [ ] Stock management
- [ ] Admin dashboard for products

## API Reference

### ProductService Methods

```typescript
// Get all products
getAllProducts(): Promise<Product[]>
// Returns: Array of products with docType === 'product'
// Throws: Error if Firebase query fails

// Get product by ID
getProductById(productId: string): Promise<Product | null>
// Returns: Product object or null if not found
// Throws: Error if Firebase query fails

// Get featured products
getFeaturedProducts(limit: number = 6): Promise<Product[]>
// Returns: First N products (can be enhanced with featured flag)
```

## Best Practices

### Adding New Products

1. Use Firebase Console
2. Set `docType: "product"`
3. Add high-quality images
4. Use descriptive brand names
5. Include all variant details
6. Price in string format (for flexibility)

### Image Guidelines

- **Main Image**: 1200x1200px minimum
- **Variant Images**: 600x600px minimum
- **Format**: JPG or PNG
- **Size**: < 500KB per image
- **Quality**: 80-90%

### Pricing

- Store prices as strings in Firebase
- Convert to numbers in code
- Use INR currency format
- No decimal places for rupees

---

**Last Updated**: 2025-11-07
**Version**: 1.0
**Database**: Firebase Firestore (rajaoil collection)
