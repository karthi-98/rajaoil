import { Metadata } from 'next'
import Link from 'next/link'
import { Mail, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog - sreeraajaganapathy Oil Mill',
  description: 'Coming soon! Stay tuned for insightful articles about cooking oils, health tips, and recipes. Subscribe to get notified when our blog launches.',
  keywords: ['blog', 'cooking oil tips', 'oil health benefits', 'recipes', 'cooking guides'],
  openGraph: {
    title: 'Blog - sreeraajaganapathy Oil Mill',
    description: 'Coming soon! Read articles about cooking oils, health benefits, and delicious recipes.',
    type: 'website',
    images: [{ url: '/images/logo_new.png', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://rajaoil.com/blog',
  },
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-red-50 to-white py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-primary/10 p-4 rounded-full">
                <BookOpen className="h-12 w-12 text-primary" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Blog Coming Soon
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              We&apos;re preparing exciting articles about cooking oils, health benefits, traditional recipes, and culinary tips
            </p>

            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              From nutritional guides to delicious recipes, our blog will be your go-to resource for everything about premium cooking oils
            </p>
          </div>
        </div>
      </section>

      {/* Features Preview Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What to Expect
            </h2>
            <p className="text-lg text-gray-600">
              Our blog will feature a variety of content to help you make the most of our products
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🥗</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Recipes & Cooking Tips
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Discover traditional and modern recipes that bring out the best flavors in our premium oils
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Health & Wellness
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Learn about the health benefits of different cooking oils and how to incorporate them into a healthy lifestyle
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🌾</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Production & Sustainability
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Explore our traditional extraction methods and commitment to sustainable and eco-friendly practices
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary/5 to-red-50 rounded-lg p-8 md:p-12">
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 p-4 rounded-full">
                <Mail className="h-8 w-8 text-primary" />
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">
              Stay Updated
            </h2>

            <p className="text-gray-600 text-center mb-8">
              Be the first to know when our blog launches. Subscribe to get exclusive recipes, health tips, and special offers directly to your inbox.
            </p>

            <form className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-md transition-colors duration-200 whitespace-nowrap"
                >
                  Notify Me
                </button>
              </div>
              <p className="text-sm text-gray-500 text-center">
                We respect your privacy. No spam, unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Explore Our Products
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            While you wait for our blog, discover our premium collection of cooking oils
          </p>
          <Link
            href="/products"
            className="inline-block bg-white text-primary px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors duration-200"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  )
}
