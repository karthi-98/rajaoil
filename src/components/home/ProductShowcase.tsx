import Image from 'next/image'
import { Check } from 'lucide-react'

const oilProducts = [
  {
    name: 'Coconut Oil',
    image: '/images/coconut.png',
    description: 'Pure, cold-pressed coconut oil rich in natural nutrients. Perfect for cooking, hair care, and skin care. Our coconut oil is extracted from the finest coconuts using traditional methods that preserve all the natural goodness.',
    benefits: ['Rich in MCT fatty acids', 'Natural moisturizer for skin and hair', 'Boosts immunity and metabolism', 'High smoke point for cooking'],
  },
  {
    name: 'Groundnut Oil',
    image: '/images/groundnut.png',
    description: 'Premium quality groundnut oil extracted from finest peanuts. Ideal for all types of cooking with high smoke point. Our groundnut oil maintains the authentic taste and nutritional value that your family deserves.',
    benefits: ['Heart-healthy monounsaturated fats', 'High smoke point (450°F)', 'Rich, nutty flavor profile', 'Contains vitamin E and antioxidants'],
  },
  {
    name: 'Gingelly Oil',
    image: '/images/Gingelly.png',
    description: 'Traditional sesame oil made from pure gingelly seeds. Known for its distinctive aroma and health benefits. This ancient oil has been used for centuries in cooking and traditional medicine.',
    benefits: ['Antioxidant-rich for health', 'Traditional authentic taste', 'Excellent for skin nourishment', 'Supports bone and heart health'],
  },
  {
    name: 'Gingelly Palm Jaggery Oil',
    image: '/images/gingelly-sesame.png',
    description: 'A unique blend of gingelly oil with palm jaggery essence. Traditional preparation for enhanced wellness. This special formulation combines the benefits of sesame oil with the natural sweetness of jaggery.',
    benefits: ['Natural sweetness from jaggery', 'Energy boosting properties', 'Traditional wellness benefits', 'Perfect for traditional recipes'],
  },
]

export default function ProductShowcase() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-primary via-primary/95 to-primary/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
            Our Premium Oil Collection
          </h2>
          <p className="text-sm md:text-base text-white/90 max-w-3xl mx-auto">
            Discover the finest quality oils, carefully extracted using traditional methods to preserve natural goodness
          </p>
        </div>

        {/* Products - Alternating Layout */}
        <div className="space-y-12 md:space-y-16">
          {oilProducts.map((product, index) => {
            const isEven = index % 2 === 0

            return (
              <div
                key={product.name}
              >
                <div className={`grid md:grid-cols-12 gap-8 md:gap-12 items-center ${isEven ? '' : 'md:grid-flow-dense'}`}>
                  {/* Image Section - Takes up 7 columns (wider) */}
                  <div className={`flex items-center justify-center md:col-span-7 ${isEven ? '' : 'md:col-start-6'}`}>
                    <div className="relative w-full max-w-lg h-80 bg-white/5 rounded-3xl overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Content Section - Takes up 5 columns */}
                  <div className={`md:col-span-5 ${isEven ? '' : 'md:col-start-1 md:row-start-1'}`}>
                    {/* Product Name with Background */}
                    <div className="inline-block mb-5">
                      <h3 className="text-xl md:text-2xl font-bold bg-white text-primary px-5 py-2.5 rounded-xl shadow-lg">
                        {product.name}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-white text-sm md:text-base mb-6 leading-relaxed border-l-4 border-white pl-4">
                      {product.description}
                    </p>

                    {/* Benefits Section with Background */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-white rounded-full p-1.5">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <h4 className="text-base font-bold text-white uppercase tracking-wide">
                          Key Benefits
                        </h4>
                      </div>
                      <ul className="space-y-2.5">
                        {product.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-white">
                            <span className="flex-shrink-0 mt-1">
                              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                            </span>
                            <span className="text-sm leading-relaxed">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
