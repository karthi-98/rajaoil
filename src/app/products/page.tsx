import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Our Products - Premium Cooking Oils | Sree Raaja Ganapathy Oil Mill",
  description: "Browse our wide range of premium quality cooking oils. Pure, authentic, and traditionally made oils for all your cooking needs.",
  keywords: ["cooking oil", "premium oil", "traditional oil", "cold-pressed oil", "sesame oil", "groundnut oil", "coconut oil"],
}

const categories = [
  {
    name: "Sesame Oil",
    slug: "sesame",
    icon: "🌰",
    image: "/images/sesame-oil-bg.jpg",
    description: "Pure and aromatic, perfect for traditional cooking"
  },
  {
    name: "Groundnut Oil",
    slug: "groundnut",
    icon: "🥜",
    image: "/images/groundnut-oil-bg.jpg",
    description: "Rich nutty flavor, ideal for deep frying"
  },
  {
    name: "Coconut Oil",
    slug: "coconut",
    icon: "🥥",
    image: "/images/coconut-oil-bg.jpg",
    description: "Fresh and pure, excellent for hair and skin"
  }
]

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-red-50 to-white px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="max-w-7xl mx-auto text-center space-y-4">
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
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Browse by Category
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        {/* Category Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/products/category/${category.slug}`}
              className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-96 cursor-pointer"
            >
              <div className="absolute inset-0">
                <img
                  src={category.image}
                  alt={`${category.name} Background`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
              </div>
              <div className="relative h-full p-8 flex flex-col items-center justify-center text-center z-10">
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">{category.name}</h3>
                <p className="text-white/90 text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 max-w-xs">
                  {category.description}
                </p>
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <span className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-2 rounded-full font-semibold text-sm">
                    View Products
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
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
