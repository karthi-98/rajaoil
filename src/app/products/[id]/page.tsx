import { notFound } from 'next/navigation'
import { ProductService } from '@/services/product.service'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { ProductPurchaseSection } from '@/components/product/ProductPurchaseSection'
import ProductImageSlider from '@/components/product/ProductImageSlider'
import ProductCard from '@/components/product/ProductCard'
import type { Metadata } from 'next'

interface ProductPageProps {
  params: Promise<{
    id: string
  }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params
  const decodedId = decodeURIComponent(id.replace(/-/g, ' '))
  const product = await ProductService.getProductById(decodedId)

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${product.id} - Premium Cooking Oil | Raja Oil`,
    description: product.description || `Buy ${product.id} online. Premium quality cooking oil with various packaging sizes available.`,
    openGraph: {
      title: product.id,
      description: product.description || `Premium ${product.id} cooking oil`,
      images: [{ url: product.mainImage, width: 1200, height: 630 }],
    },
  }
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params
  const decodedId = decodeURIComponent(id.replace(/-/g, ' '))
  const product = await ProductService.getProductById(decodedId)

  if (!product) {
    notFound()
  }

  // Fetch related products
  const allProducts = await ProductService.getAllProducts()
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  // Get all variant images for slider
  const allImages = [
    product.mainImage,
    ...product.types.map((type) => type.image).filter(Boolean),
  ]

  const breadcrumbItems = [
    { label: 'Products', href: '/products' },
    { label: product.id, href: `/products/${id}` },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          {/* Left Side - Image Gallery */}
          <div>
            <ProductImageSlider images={allImages} productName={product.id} />
          </div>

          {/* Right Side - Product Info & Purchase */}
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {product.id}
            </h1>

            {product.description && (
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {product.description}
              </p>
            )}

            <ProductPurchaseSection product={product} />
          </div>
        </div>

        {/* Product Features Section */}
        <div className="border-t border-gray-200 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Premium Quality</h2>
              <p className="text-gray-600">Made from the finest ingredients</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Multiple Sizes</h3>
              <p className="text-gray-600">Available in various packaging options</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable shipping</p>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-gray-200 pt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
