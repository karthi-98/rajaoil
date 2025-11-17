export default function ReturnsLoading() {
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

      {/* Key Information Box Skeleton */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 md:p-12">
            <div className="h-8 bg-gray-200 rounded mb-6 w-40 animate-pulse" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <div className="h-7 bg-gray-200 rounded mb-2 w-20 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Return Conditions Skeleton */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-10 bg-gray-200 rounded mb-4 max-w-md mx-auto animate-pulse" />
            <div className="h-6 bg-gray-200 rounded max-w-xs mx-auto animate-pulse" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg p-8 border border-gray-200 text-center">
                <div className="h-12 bg-gray-200 rounded mb-4 w-12 mx-auto animate-pulse" />
                <div className="h-6 bg-gray-200 rounded mb-2 w-24 mx-auto animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-32 mx-auto animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Return Process Skeleton */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-10 bg-gray-200 rounded mb-4 max-w-md mx-auto animate-pulse" />
            <div className="h-6 bg-gray-200 rounded max-w-xs mx-auto animate-pulse" />
          </div>

          <div className="space-y-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="h-16 w-16 rounded-full bg-gray-200 animate-pulse" />
                </div>
                <div className="flex-1 pt-2">
                  <div className="h-6 bg-gray-200 rounded mb-2 w-40 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-4/5 mt-2 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Refund Details Skeleton */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-10 bg-gray-200 rounded mb-4 max-w-md mx-auto animate-pulse" />
            <div className="h-6 bg-gray-200 rounded max-w-xs mx-auto animate-pulse" />
          </div>

          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg p-8 border border-gray-200">
                <div className="h-6 bg-gray-200 rounded mb-3 w-40 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded mb-2 w-full animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Skeleton */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-gray-200 rounded-full animate-pulse" />
            </div>
            <div className="h-10 bg-gray-200 rounded mb-4 max-w-md mx-auto animate-pulse" />
            <div className="h-6 bg-gray-200 rounded max-w-xs mx-auto animate-pulse" />
          </div>

          <div className="space-y-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section Skeleton */}
      <section className="py-12 md:py-16 bg-primary/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-10 bg-gray-200 rounded mb-6 max-w-lg mx-auto animate-pulse" />
          <div className="h-20 bg-gray-200 rounded mb-8 max-w-xl mx-auto animate-pulse" />
          <div className="h-12 bg-gray-200 rounded max-w-xs mx-auto animate-pulse" />
        </div>
      </section>
    </div>
  )
}
