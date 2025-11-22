// WhyChooseUs Section Component
// Displays why customers should choose our products

export default function WhyChooseUs() {
  const features = [
    {
      icon: "✨",
      title: "Clean & Pure Raw Materials",
      points: [
        "We use advanced seed-cleaning machines to remove sand, stones, dust, husk, and impurities.",
        "Only clean and high-quality sesame seeds go into production."
      ]
    },
    {
      icon: "⚙️",
      title: "Traditional Rotary Chekku Extraction",
      description: "Our gingelly oil is made using rotary chekku, which:",
      points: [
        "Generates low heat",
        "Retains natural aroma & nutrients",
        "Gives traditional taste",
        "Is cleaner & faster than wooden chekku"
      ]
    },
    {
      icon: "🌿",
      title: "Natural Filtration – No Chemicals",
      description: "After extraction:",
      points: [
        "Oil settles naturally in large tanks",
        "Dust settles at the bottom",
        "Oil is pressure-filtered through filter cloth",
        "No refining • No bleaching • No chemicals",
        "100% natural & pure oil."
      ]
    }
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          <span className="inline-block mr-2">🌟</span>
          Why Choose Us
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto"></div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="text-5xl mb-4 text-center">{feature.icon}</div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{feature.title}</h3>
            {feature.description && (
              <p className="text-gray-700 mb-3 font-medium">{feature.description}</p>
            )}
            <ul className="space-y-2">
              {feature.points.map((point, idx) => (
                <li key={idx} className="flex items-start text-gray-700">
                  <svg className="w-5 h-5 text-primary mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
          <span className="inline-block mr-2">📊</span>
          Chekku Oil vs Expeller Oil
        </h3>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="py-4 px-6 text-left font-bold text-lg">Aspect</th>
                  <th className="py-4 px-6 text-left font-bold text-lg">Chekku Oil (Our Method)</th>
                  <th className="py-4 px-6 text-left font-bold text-lg">Expeller Oil</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-gray-900">Extraction Method</td>
                  <td className="py-4 px-6 text-green-600 font-semibold">✓ Traditional rotary chekku (low heat)</td>
                  <td className="py-4 px-6 text-red-600">✗ High-pressure mechanical extraction</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-gray-900">Temperature</td>
                  <td className="py-4 px-6 text-green-600 font-semibold">✓ Low heat generation</td>
                  <td className="py-4 px-6 text-red-600">✗ High heat (reduces nutrients)</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-gray-900">Nutrient Retention</td>
                  <td className="py-4 px-6 text-green-600 font-semibold">✓ Maximum nutrients retained</td>
                  <td className="py-4 px-6 text-red-600">✗ Nutrients lost due to heat</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-gray-900">Aroma & Taste</td>
                  <td className="py-4 px-6 text-green-600 font-semibold">✓ Natural aroma & traditional taste</td>
                  <td className="py-4 px-6 text-red-600">✗ Mild or no aroma</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-gray-900">Chemical Processing</td>
                  <td className="py-4 px-6 text-green-600 font-semibold">✓ No chemicals or refining</td>
                  <td className="py-4 px-6 text-red-600">✗ Often refined with chemicals</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-gray-900">Filtration</td>
                  <td className="py-4 px-6 text-green-600 font-semibold">✓ Natural settling + cloth filtration</td>
                  <td className="py-4 px-6 text-red-600">✗ Chemical filtration/bleaching</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-gray-900">Purity</td>
                  <td className="py-4 px-6 text-green-600 font-semibold">✓ 100% natural & pure</td>
                  <td className="py-4 px-6 text-red-600">✗ May contain additives</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
