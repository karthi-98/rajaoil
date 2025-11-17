export default function ShippingLoading() {
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

      {/* Shipping Options Skeleton */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-10 bg-gray-200 rounded mb-4 max-w-md mx-auto animate-pulse" />
            <div className="h-6 bg-gray-200 rounded max-w-xs mx-auto animate-pulse" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gray-200 rounded-full animate-pulse" />
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded mb-2 w-32 animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-40 animate-pulse" />
                  </div>
                </div>

                <div className="space-y-4">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-gray-200 rounded flex-shrink-0 mt-1 animate-pulse" />
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded mb-1 w-24 animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Process Skeleton */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-10 bg-gray-200 rounded mb-4 max-w-md mx-auto animate-pulse" />
            <div className="h-6 bg-gray-200 rounded max-w-xs mx-auto animate-pulse" />
          </div>

          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse" />
                </div>
                <div className="flex-1 pt-1">
                  <div className="h-5 bg-gray-200 rounded mb-2 w-32 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-4/5 mt-2 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Policy Highlights Skeleton */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-10 bg-gray-200 rounded mb-4 max-w-md mx-auto animate-pulse" />
            <div className="h-6 bg-gray-200 rounded max-w-xs mx-auto animate-pulse" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg p-8 border border-gray-200">
                <div className="flex justify-center mb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="h-6 bg-gray-200 rounded mb-3 w-32 mx-auto animate-pulse" />
                <div className="h-4 bg-gray-200 rounded mb-2 w-full animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Skeleton */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-gray-200 rounded-full animate-pulse" />
            </div>
            <div className="h-10 bg-gray-200 rounded mb-4 max-w-md mx-auto animate-pulse" />
            <div className="h-6 bg-gray-200 rounded max-w-xs mx-auto animate-pulse" />
          </div>

          <div className="space-y-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section Skeleton */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary/5 rounded-lg p-8 md:p-12 border border-primary/10">
            <div className="h-8 bg-gray-200 rounded mb-4 w-2/3 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded mb-2 w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded mb-8 w-5/6 animate-pulse" />
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="h-12 bg-gray-200 rounded w-full sm:w-40 animate-pulse" />
              <div className="h-12 bg-gray-200 rounded w-full sm:w-40 animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
