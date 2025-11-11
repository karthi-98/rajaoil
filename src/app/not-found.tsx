import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for could not be found.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-2xl mx-auto">
        {/* 404 Number */}
        <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-800 mb-4">
          404
        </h1>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h2>

        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
          It might have been moved or deleted.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 min-w-[160px]"
          >
            Go to Home
          </Link>

          <Link
            href="/products"
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors duration-200 min-w-[160px]"
          >
            Browse Products
          </Link>
        </div>

        {/* Additional Help Text */}
        <p className="mt-12 text-sm text-gray-500 dark:text-gray-500">
          Need help? <Link href="/contact" className="text-blue-600 hover:text-blue-700 underline">Contact us</Link>
        </p>
      </div>
    </div>
  )
}
