export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section Skeleton */}
      <section className="relative bg-gradient-to-br from-primary/10 via-red-50 to-white py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-gray-200 w-16 h-16 rounded-full animate-pulse" />
            </div>

            <div className="h-12 bg-gray-200 rounded mb-6 max-w-2xl mx-auto animate-pulse" />
            <div className="h-20 bg-gray-200 rounded mb-8 max-w-3xl mx-auto animate-pulse" />
            <div className="h-16 bg-gray-200 rounded mb-12 max-w-2xl mx-auto animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section Skeleton */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-10 bg-gray-200 rounded mb-4 max-w-xs mx-auto animate-pulse" />
            <div className="h-6 bg-gray-200 rounded max-w-md mx-auto animate-pulse" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg p-8 shadow-md">
                <div className="bg-gray-200 w-14 h-14 rounded-full mb-4 animate-pulse" />
                <div className="h-6 bg-gray-200 rounded mb-3 animate-pulse" />
                <div className="h-16 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section Skeleton */}
      <section className="py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary/5 to-red-50 rounded-lg p-8 md:p-12">
            <div className="flex justify-center mb-6">
              <div className="bg-gray-200 w-16 h-16 rounded-full animate-pulse" />
            </div>

            <div className="h-8 bg-gray-200 rounded mb-4 max-w-sm mx-auto animate-pulse" />
            <div className="h-6 bg-gray-200 rounded mb-8 max-w-md mx-auto animate-pulse" />

            <div className="space-y-4">
              <div className="h-12 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded max-w-xs mx-auto animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="py-16 bg-primary/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-10 bg-gray-200 rounded mb-6 max-w-lg mx-auto animate-pulse" />
          <div className="h-20 bg-gray-200 rounded mb-8 max-w-2xl mx-auto animate-pulse" />
          <div className="h-12 bg-gray-200 rounded max-w-xs mx-auto animate-pulse" />
        </div>
      </section>
    </div>
  )
}
