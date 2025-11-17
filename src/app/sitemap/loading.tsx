export default function SitemapLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section Skeleton */}
      <section className="relative bg-gradient-to-b from-primary/10 to-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-gray-200 w-16 h-16 rounded-full animate-pulse" />
            </div>
            <div className="h-12 bg-gray-200 rounded mb-4 max-w-xs mx-auto animate-pulse" />
            <div className="h-20 bg-gray-200 rounded max-w-2xl mx-auto animate-pulse" />
          </div>
        </div>
      </section>

      {/* Sitemap Content Skeleton */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
                  <div className="h-8 bg-gray-200 rounded w-32 animate-pulse" />
                </div>

                <ul className="space-y-3">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <li key={j} className="bg-gray-50 p-4 rounded-lg">
                      <div className="h-5 bg-gray-200 rounded mb-2 w-40 animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded w-56 animate-pulse" />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Skeleton */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-10 bg-gray-200 rounded mb-8 max-w-sm mx-auto animate-pulse" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="h-10 bg-gray-200 rounded mb-2 w-16 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* XML Sitemap Notice Skeleton */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
            <div className="h-7 bg-gray-200 rounded mb-3 w-48 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded mb-4 w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-80 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Contact CTA Skeleton */}
      <section className="py-12 md:py-16 bg-primary/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-12 bg-gray-200 rounded mb-6 max-w-lg mx-auto animate-pulse" />
          <div className="h-20 bg-gray-200 rounded mb-8 max-w-xl mx-auto animate-pulse" />
          <div className="h-12 bg-gray-200 rounded max-w-xs mx-auto animate-pulse" />
        </div>
      </section>
    </div>
  )
}
