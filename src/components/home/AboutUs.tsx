// AboutUs Section Component
// Displays the company's heritage and legacy

export default function AboutUs() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Us</h2>
        <div className="w-24 h-1 bg-primary mx-auto"></div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - First Two Sections */}
        <div className="space-y-6">
          {/* Our Legacy */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-4xl flex-shrink-0">👴</div>
              <h3 className="text-xl font-bold text-gray-900">Our Legacy</h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              For us, oil is not just a business — it is a legacy that has grown with our family for more than three generations. Our journey began in the early 1950s, when our grandfather, Mr. Ganapathi Chettiyar, travelled from village to village, carefully selecting the finest sesame seeds. Guided by deep knowledge, integrity, and a commitment to quality, he supplied premium sesame seeds to oil mills for over 35 years. His dedication laid the foundation for our family&apos;s identity and values.
            </p>
          </div>

          {/* Our Journey */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-4xl flex-shrink-0">🏭</div>
              <h3 className="text-xl font-bold text-gray-900">Our Journey</h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              In 1984, inspired by his experience and vision, our family established its first oil mill. With a strong understanding of seed quality and an unwavering commitment to authenticity, the business earned a respected name in the market. After the family&apos;s division, my father, Mr. G. Gopalsamy, carried this tradition forward by founding Sree Rajaganapathy Oil Mill in 2014. With over 42 years of expertise in oil production, he strengthened the brand with a focus on purity, consistency, and customer trust.
            </p>
          </div>
        </div>

        {/* Right Column - Core Principles & Future */}
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
          {/* Core Principles */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-5 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Today, we stand by our core principles:</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-semibold text-gray-800">Uncompromising Quality</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-semibold text-gray-800">Fair and Transparent Pricing</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-semibold text-gray-800">Customer-centric Service</span>
              </li>
            </ul>
          </div>

          {/* Our Promise */}
          <div className="flex-1">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-4xl flex-shrink-0">🌱</div>
              <h3 className="text-xl font-bold text-gray-900">Our Promise</h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              Over the years, we have expanded from gingelly oil to producing groundnut oil and coconut oil, all made using carefully selected raw materials and hygienic processing methods.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed italic">
              When we look at our journey, we see more than a business — we see our grandfather&apos;s footsteps, our father&apos;s dedication, and a family tradition built on trust, purity, and quality. It is a legacy we are proud to uphold, and a promise we carry forward into the future.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
