import Image from 'next/image'

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary/5">
      <div className="text-center">
        {/* Logo with pulse animation */}
        <div className="mb-8 animate-pulse flex flex-col items-center gap-4">
          <Image
            src="/images/logo_new.png"
            alt="sreeraajaganapathy Oil Mill"
            width={80}
            height={80}
            className="mx-auto"
            priority
          />
          <span className="text-primary font-bold text-2xl tracking-tight">
            sreeraajaganapathyOILMILL
          </span>
        </div>

        {/* Spinner */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* Outer ring */}
            <div className="w-16 h-16 border-4 border-primary/20 rounded-full"></div>
            {/* Spinning ring */}
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
        </div>

        {/* Loading text */}
        <p className="text-gray-600 text-lg font-medium">Loading...</p>

        {/* Animated dots */}
        <div className="flex justify-center gap-2 mt-4">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  )
}
