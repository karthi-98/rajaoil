import ProductGrid from "@/components/product/ProductGrid"
import { ProductService } from "@/services/product.service"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Products - Premium Cooking Oils | Sreerajaganapathy Oil Mill",
  description: "Browse our wide range of premium quality cooking oils. Pure, authentic, and traditionally made oils for all your cooking needs.",
  keywords: ["cooking oil", "premium oil", "traditional oil", "cold-pressed oil"],
}

export default async function ProductsPage() {
  // Fetch products from Firebase
  const products = await ProductService.getAllProducts()

  return (
    <div className="min-h-screen bg-white">
      {/* Combined Section - 90vh */}
      <section className="h-[90vh] flex flex-col">
        {/* Hero Header */}
        <div className="mx-auto bg-gradient-to-b from-red-50 to-white px-4 sm:px-6 lg:px-8 pt-10 pb-8 w-full">
          <div className="text-center space-y-3">
            <div className="inline-block">
              <span className="bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                Premium Quality
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Our Products
            </h1>
            <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
              Discover our range of premium quality cooking oils, crafted with care using traditional methods for authentic taste and superior quality.
            </p>
          </div>
        </div>

        {/* Products Grid Section */}
        <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8 flex items-center">
          {products.length > 0 ? (
            <div className="w-full">
              <ProductGrid products={products} />
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-24 h-24 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Products Available</h3>
              <p className="text-gray-500">Please check back later for our product catalog.</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Products?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We are committed to delivering the finest quality oils with authentic taste and proven health benefits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">100% Pure & Natural</h3>
              <p className="text-gray-600">
                No additives, no preservatives. Just pure, natural oil extracted using traditional methods.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Assured</h3>
              <p className="text-gray-600">
                Every batch is tested for quality and purity to ensure you get the best product every time.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Traditional Methods</h3>
              <p className="text-gray-600">
                Cold-pressed using time-tested traditional techniques to preserve nutrients and authentic flavor.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
