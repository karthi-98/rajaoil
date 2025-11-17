export default function FAQLoading() {
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

      {/* FAQ Categories Skeleton */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {[1, 2, 3, 4, 5, 6].map((category) => (
              <div key={category} className="space-y-6">
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
                  <div className="h-8 bg-gray-200 rounded w-48 animate-pulse" />
                  <div className="flex-1 h-0.5 bg-gray-200" />
                </div>

                {/* FAQs */}
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((faq) => (
                    <div key={faq} className="bg-white rounded-lg border border-gray-200 p-6">
                      <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions Skeleton */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="h-10 bg-gray-200 rounded mb-4 max-w-md mx-auto animate-pulse" />
            <div className="h-6 bg-gray-200 rounded mb-8 max-w-lg mx-auto animate-pulse" />

            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <div className="h-7 bg-gray-200 rounded mb-6 w-40 mx-auto animate-pulse" />

              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="text-center">
                    <div className="w-12 h-12 bg-gray-200 rounded mx-auto mb-2 animate-pulse" />
                    <div className="h-5 bg-gray-200 rounded mb-2 w-24 mx-auto animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-32 mx-auto animate-pulse" />
                  </div>
                ))}
              </div>

              <div className="h-12 bg-gray-200 rounded w-40 mx-auto animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Related Links Skeleton */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 bg-gray-200 rounded mb-8 max-w-md mx-auto animate-pulse" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-gray-200 rounded mx-auto mb-3 animate-pulse" />
                <div className="h-5 bg-gray-200 rounded mb-2 w-24 mx-auto animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-32 mx-auto animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
