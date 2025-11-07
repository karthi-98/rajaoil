# CLAUDE.md - Next.js 15.5.2 Ecommerce Guide

## Project Overview
High-performance ecommerce app with Next.js 15.5.2. Focus: modular architecture, performance, and SEO optimization.

## Core Principles

### 1. Modular Programming - CRITICAL
**NEVER put all code in one file. Always split into modules.**

**Rules:**
- One component = One file (max 150-200 lines)
- Extract reusable logic into custom hooks
- Separate business logic from UI
- Use service layer for API calls
- Barrel exports (index.ts) for clean imports

**Example:**
```typescript
// ❌ BAD - Everything in one file
'use client'
export default function ProductPage() {
  const [cart, setCart] = useState([])
  const addToCart = () => { /* logic */ }
  const formatPrice = (price) => { /* logic */ }
  return <div>{/* 500 lines of JSX */}</div>
}

// ✅ GOOD - Split into modules
// hooks/useCart.ts
export function useCart() {
  const [cart, setCart] = useState([])
  const addItem = (product) => { /* logic */ }
  return { cart, addItem }
}

// lib/formatters.ts
export const formatPrice = (price: number) => { /* logic */ }

// components/product/ProductPage.tsx (Server Component)
export default async function ProductPage({ params }) {
  const product = await ProductService.getProduct(params.slug)
  return <ProductDetails product={product} />
}

// components/product/AddToCartButton.tsx (Client Component)
'use client'
export function AddToCartButton({ product }) {
  const { addItem } = useCart()
  return <button onClick={() => addItem(product)}>Add to Cart</button>
}
```

### 2. Performance First
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Server Components** by default (reduces bundle size)
- **Client-side JS** < 170KB initial load
- **Images/Fonts**: WebP, AVIF, font-display: swap
- **Lighthouse score**: 90+ on all pages

### 3. SEO Optimization
- **Static pages** (SSG > SSR > CSR)
- **Metadata** and structured data on all pages
- **Mobile-first** indexing
- **URL structure**: short, descriptive, keyword-rich
- **XML sitemap** + robots.txt
- **Breadcrumb navigation**
- **Alt text** on all images
- **Heading hierarchy**: H1 > H2 > H3
- **Internal linking** strategy

## Architecture

### Server vs Client Components

**Default to Server Components:**
```typescript
export default function ProductList({ products }: { products: Product[] }) {
  return <div>{products.map(p => <ProductCard key={p.id} product={p} />)}</div>
}
```

**Client Components ONLY for:**
- Interactive features (onClick, useState, useEffect)
- Browser APIs (localStorage, geolocation)
- Event listeners

```typescript
'use client'
export function AddToCartButton({ productId }: { productId: string }) {
  const [isAdding, setIsAdding] = useState(false)
  // Interactive functionality
}
```

### Folder Structure

```
src/
├── app/                    # App Router
│   ├── layout.tsx, page.tsx, loading.tsx, error.tsx
│   ├── products/[slug]/    # Dynamic routes
│   ├── cart/, checkout/
│   ├── api/                # API routes
│   └── (auth)/             # Route groups
├── components/
│   ├── ui/                 # ShadCN components (when requested)
│   ├── layout/             # Header, Footer, Nav
│   ├── product/            # Product components
│   └── cart/, forms/
├── lib/                    # Utils, types, constants
├── hooks/                  # Custom hooks
├── services/               # API service layer (CRITICAL)
├── actions/                # Server Actions
└── styles/
```

## Modular Programming Patterns

### 1. Service Layer (MANDATORY)
**Never make API calls directly in components.**

```typescript
// services/product.service.ts
export class ProductService {
  private static baseUrl = process.env.NEXT_PUBLIC_API_URL

  static async getProducts(category?: string): Promise<Product[]> {
    const url = category ? `${this.baseUrl}/products?category=${category}` : `${this.baseUrl}/products`
    const response = await fetch(url, { next: { revalidate: 3600 } })
    if (!response.ok) throw new Error('Failed to fetch')
    return response.json()
  }
}

// Usage in component
export default async function ProductsPage() {
  const products = await ProductService.getProducts()
  return <ProductGrid products={products} />
}
```

### 2. Custom Hooks
```typescript
// hooks/useCart.ts
export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)

  const addItem = useCallback(async (product: Product, qty = 1) => {
    setLoading(true)
    try {
      const cart = await CartService.addItem(product.id, qty)
      setItems(cart.items)
    } finally {
      setLoading(false)
    }
  }, [])

  return { items, loading, addItem, total: items.reduce((s, i) => s + i.price * i.quantity, 0) }
}
```

### 3. Utility Functions
```typescript
// lib/formatters.ts
export const formatPrice = (price: number, currency = 'USD') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(price)

// lib/validators.ts
import { z } from 'zod'
export const productSchema = z.object({
  name: z.string().min(1).max(100),
  price: z.number().positive(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
})

// lib/helpers.ts
export const truncateText = (text: string, max: number) =>
  text.length <= max ? text : text.slice(0, max) + '...'

export const generateSlug = (text: string) =>
  text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim()

// lib/constants.ts
export const SITE_CONFIG = {
  name: 'Raja Oil',
  url: 'https://rajaoil.com',
  ogImage: '/og-image.jpg',
} as const

export const CACHE_TIMES = {
  products: 3600,
  categories: 7200,
} as const
```

### 4. Barrel Exports
```typescript
// components/product/index.ts
export { ProductCard } from './ProductCard'
export { ProductGrid } from './ProductGrid'
export { ProductDetails } from './ProductDetails'

// Usage
import { ProductCard, ProductGrid } from '@/components/product'
```

## Performance Optimization

### Image Optimization
```typescript
import Image from 'next/image'

<Image
  src="/product.jpg"
  alt="Product name"
  width={400}
  height={300}
  priority={isAboveFold}
  placeholder="blur"
/>
```

### Font Optimization
```typescript
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})
```

### Data Fetching

**SSG (Preferred):**
```typescript
export async function generateStaticParams() {
  const products = await getProducts()
  return products.map(p => ({ slug: p.slug }))
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.slug)
  return <ProductDetails product={product} />
}
```

**SSR (when needed):**
```typescript
export default async function SearchPage({ searchParams }) {
  const results = await searchProducts(searchParams.q)
  return <SearchResults results={results} />
}
```

### Streaming
```typescript
import { Suspense } from 'react'

export default function ProductPage() {
  return (
    <div>
      <ProductInfo />
      <Suspense fallback={<Skeleton />}>
        <ProductReviews />
      </Suspense>
    </div>
  )
}
```

## SEO Implementation

### 1. robots.txt
```txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Sitemap: https://rajaoil.com/sitemap.xml
```

### 2. Sitemap
```typescript
// app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await ProductService.getAllProducts()
  return [
    { url: 'https://rajaoil.com', priority: 1.0, changeFrequency: 'daily' },
    ...products.map(p => ({
      url: `https://rajaoil.com/products/${p.slug}`,
      lastModified: p.updatedAt,
      priority: 0.8,
    }))
  ]
}
```

### 3. Metadata
```typescript
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://rajaoil.com'),
  title: {
    default: 'Raja Oil - Premium Cooking Oils',
    template: '%s | Raja Oil'
  },
  description: 'Buy premium cooking oils online. Free delivery, best prices.',
  keywords: ['cooking oil', 'olive oil', 'coconut oil'],
  openGraph: {
    type: 'website',
    siteName: 'Raja Oil',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}
```

### 4. Dynamic Metadata
```typescript
// app/products/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await ProductService.getProductBySlug(params.slug)
  const title = `${product.name} - Buy Online | Best Price | Raja Oil`
  const description = `Buy ${product.name} online. Free delivery, best prices. Order now!`

  return {
    title,
    description,
    keywords: [product.name, product.category, 'buy online', ...product.tags],
    openGraph: {
      type: 'product',
      title,
      description,
      images: [{ url: product.image, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `https://rajaoil.com/products/${product.slug}`,
    },
  }
}
```

### 5. Structured Data
```typescript
export default async function ProductPage({ params }) {
  const product = await ProductService.getProductBySlug(params.slug)

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.sku,
    brand: { '@type': 'Brand', name: 'Raja Oil' },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
    aggregateRating: product.reviews.length > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: product.averageRating,
      reviewCount: product.reviews.length,
    } : undefined,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <article itemScope itemType="https://schema.org/Product">
        <h1 itemProp="name">{product.name}</h1>
      </article>
    </>
  )
}
```

### 6. Breadcrumbs
```typescript
// components/layout/Breadcrumb.tsx
export function Breadcrumb({ items }: { items: Array<{ label: string; href: string }> }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm">
        <li><Link href="/">Home</Link></li>
        {items.map((item, i) => (
          <li key={item.href}>
            <span>/</span>
            {i === items.length - 1 ? (
              <span aria-current="page">{item.label}</span>
            ) : (
              <Link href={item.href}>{item.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
```

### 7. Next.js Config
```typescript
// next.config.js
const nextConfig = {
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  swcMinify: true,
  reactStrictMode: true,
  optimizeFonts: true,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
  },
}
```

## Component Patterns

### Composition
```typescript
interface ProductCardProps {
  product: Product
  variant?: 'default' | 'featured' | 'compact'
  showQuickView?: boolean
}

export function ProductCard({ product, variant = 'default', showQuickView = false }: ProductCardProps) {
  return (
    <article className={cn("product-card", `variant-${variant}`)}>
      <ProductImage product={product} />
      <ProductInfo product={product} />
      {showQuickView && <QuickViewButton productId={product.id} />}
    </article>
  )
}
```

### Error Boundaries
```typescript
// app/products/error.tsx
'use client'

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

## ShadCN Usage

**ONLY use when:**
- User explicitly requests ShadCN
- Building complex form elements
- Need dialogs, dropdowns, tooltips

```bash
npx shadcn-ui@latest add button card form
```

## Database & API

### Database Optimization
```typescript
const products = await prisma.product.findMany({
  where: { categoryId: params.categoryId },
  select: { id: true, name: true, price: true, image: true, slug: true },
  orderBy: { createdAt: 'desc' },
  take: 20,
  skip: (page - 1) * 20,
})
```

### API Routes
```typescript
export async function GET(request: NextRequest) {
  const products = await getProductsWithCache()
  return Response.json(products, {
    headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' }
  })
}
```

## Security

### Input Validation
```typescript
import { z } from 'zod'

const ProductSchema = z.object({
  name: z.string().min(1).max(100),
  price: z.number().positive(),
})

export async function createProduct(data: unknown) {
  const validated = ProductSchema.parse(data)
  // Process
}
```

### Rate Limiting
```typescript
export async function POST(request: Request) {
  const { success } = await rateLimit(request.headers.get('x-forwarded-for'))
  if (!success) return new Response('Too many requests', { status: 429 })
  // Process
}
```

## Checklists

### Technical SEO
- [ ] Core Web Vitals optimized
- [ ] Lighthouse 90+
- [ ] Mobile-friendly
- [ ] HTTPS enabled
- [ ] XML Sitemap
- [ ] robots.txt
- [ ] Canonical URLs
- [ ] Structured data
- [ ] Image optimization
- [ ] Font optimization
- [ ] JS bundle < 170KB

### On-Page SEO
- [ ] Unique titles (50-60 chars)
- [ ] Meta descriptions (120-160 chars)
- [ ] One H1 per page
- [ ] Proper heading hierarchy
- [ ] Alt text on images
- [ ] Internal linking
- [ ] SEO-friendly URLs
- [ ] Mobile-optimized

### Code Organization
- [ ] One component per file (max 200 lines)
- [ ] Service layer for API calls
- [ ] Custom hooks for logic
- [ ] Utilities in separate files
- [ ] Barrel exports
- [ ] Server/Client separated
- [ ] TypeScript strict mode
- [ ] Error handling

### Performance
- [ ] Server Components by default
- [ ] Image optimization (Next Image)
- [ ] Static generation (SSG)
- [ ] Caching strategy
- [ ] Code splitting
- [ ] Suspense for streaming

## Quick Reference

**Performance**: Server Components, minimize JS, optimize images, caching, SSG, Lighthouse 90+

**SEO**: Static pages, metadata, structured data, Core Web Vitals, sitemap, internal linking, semantic HTML

**Code**: Modular (one file = one component), service layer, custom hooks, barrel exports, TypeScript strict

**Folder**: app/, components/, lib/, hooks/, services/, actions/

**Remember**: Never put all code in one file. Always use service layer. Prioritize performance and SEO.
