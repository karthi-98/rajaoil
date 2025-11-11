export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Header Skeleton */}
        <div className="mb-12 animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-1/3 mb-4" />
          <div className="h-6 bg-gray-200 rounded w-1/4" />
        </div>

        {/* Content Skeleton */}
        <div className="space-y-8 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/2" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
