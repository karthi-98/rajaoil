import type { Metadata } from "next"
import Link from "next/link"
import { ProductService } from "@/services/product.service"
import VariantGrid from "@/components/product/VariantGrid"
import GoToCartButton from "@/components/cart/GoToCartButton"

// Category configuration
const categoryConfig: Record<string, { title: string; description: string; icon: string; bgImage: string }> = {
  sesame: {
    title: "Sesame Oil",
    description: "Pure and aromatic sesame oil, perfect for traditional cooking. Our sesame oil is cold-pressed to preserve its natural nutrients and authentic flavor.",
    icon: "🌰",
    bgImage: "/images/sesame-oil-bg.jpg"
  },
  groundnut: {
    title: "Groundnut Oil",
    description: "Rich nutty flavor groundnut oil, ideal for deep frying and everyday cooking. Made from premium quality groundnuts using traditional extraction methods.",
    icon: "🥜",
    bgImage: "/images/groundnut-oil-bg.jpg"
  },
  coconut: {
    title: "Coconut Oil",
    description: "Fresh and pure coconut oil, excellent for cooking, hair, and skin care. Extracted from fresh coconuts to retain maximum nutrients and aroma.",
    icon: "🥥",
    bgImage: "/images/coconut-oil-bg.jpg"
  }
}

type Props = {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const config = categoryConfig[category.toLowerCase()]

  if (!config) {
    return {
      title: "Category Not Found",
      description: "The requested category was not found."
    }
  }

  return {
    title: `${config.title} - Premium Quality | Sree Raaja Ganapathy Oil Mill`,
    description: config.description,
    keywords: [config.title.toLowerCase(), "cooking oil", "premium oil", "traditional oil", "cold-pressed oil"],
  }
}

export function generateStaticParams() {
  return [
    { category: "sesame" },
    { category: "groundnut" },
    { category: "coconut" }
  ]
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const config = categoryConfig[category.toLowerCase()]

  if (!config) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-8">The requested category does not exist.</p>
          <Link href="/products" className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
            View All Products
          </Link>
        </div>
      </div>
    )
  }

  // Fetch products by category from Firestore
  const products = await ProductService.getProductsByCategory(category)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${config.bgImage}')` }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <div className="text-6xl mb-4">{config.icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{config.title}</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            {config.description}
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Available {config.title} Products
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        {products.length > 0 ? (
          <VariantGrid products={products} />
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
            <p className="text-gray-500 mb-8">
              No {config.title.toLowerCase()} products are available at the moment. Please check back later.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              View All Products
            </Link>
          </div>
        )}

        {/* Back Link */}
        <div className="text-center mt-12 pb-20">
          <Link
            href="/products"
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            View All Products
          </Link>
        </div>
      </section>

      {/* Go to Cart Button - Fixed at bottom */}
      <GoToCartButton />
    </div>
  )
}
