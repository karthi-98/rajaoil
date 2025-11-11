import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Award, Droplet, Users, Leaf } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us - Sreerajaganapathy Oil Mill',
  description: 'Learn about Sreerajaganapathy Oil Mill, a trusted name in premium cooking oils since decades. Our commitment to quality, purity, and tradition.',
  keywords: ['about us', 'oil mill', 'cooking oil manufacturer', 'premium oils', 'traditional oil mill'],
  openGraph: {
    title: 'About Us - Sreerajaganapathy Oil Mill',
    description: 'Learn about Sreerajaganapathy Oil Mill, a trusted name in premium cooking oils.',
    type: 'website',
    images: [{ url: '/images/logo.png', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://rajaoil.com/about',
  },
}

const features = [
  {
    icon: Award,
    title: 'Quality Assurance',
    description: 'We ensure the highest quality standards in every drop of oil we produce, with rigorous testing and quality control.',
  },
  {
    icon: Droplet,
    title: 'Pure & Natural',
    description: 'Our oils are extracted using traditional methods, preserving natural nutrients and authentic flavors.',
  },
  {
    icon: Users,
    title: 'Customer Trust',
    description: 'Trusted by thousands of families for generations, we prioritize customer satisfaction and health.',
  },
  {
    icon: Leaf,
    title: 'Sustainable Practices',
    description: 'We follow eco-friendly and sustainable practices in our production process, caring for our planet.',
  },
]

export default function AboutPage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Sreerajaganapathy Oil Mill',
    alternateName: 'Raja Oil',
    url: 'https://rajaoil.com',
    logo: 'https://rajaoil.com/images/logo.png',
    description: 'Premium cooking oil manufacturer committed to quality, purity, and tradition.',
    foundingDate: '1990',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                About Us
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                A legacy of quality and tradition in producing the finest cooking oils for your family
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Sreerajaganapathy Oil Mill has been a trusted name in the cooking oil industry for decades.
                    What started as a small traditional oil mill has grown into a renowned brand, yet we have
                    never compromised on our core values of quality, purity, and authenticity.
                  </p>
                  <p>
                    We believe that cooking oil is not just an ingredient; it&apos;s the foundation of healthy cooking
                    and delicious meals. That&apos;s why we use only the finest raw materials and traditional extraction
                    methods that preserve the natural goodness of every seed and nut.
                  </p>
                  <p>
                    Our commitment to excellence has earned us the trust of thousands of families who choose our
                    oils for their daily cooking needs. We take pride in being part of your family&apos;s healthy lifestyle.
                  </p>
                </div>
              </div>
              <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
                <Image
                  src="/images/logo.png"
                  alt="Sreerajaganapathy Oil Mill"
                  fill
                  className="object-contain p-8"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Us
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We are committed to delivering the best quality oils with complete transparency and care
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <div
                    key={feature.title}
                    className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-primary/5 rounded-lg p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Our Mission
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  To provide the finest quality cooking oils that promote healthy living while preserving
                  traditional extraction methods. We aim to be the most trusted brand in every household,
                  ensuring purity, authenticity, and affordability in every bottle.
                </p>
              </div>

              <div className="bg-primary/5 rounded-lg p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Our Vision
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  To become the leading name in natural and organic cooking oils across the region,
                  setting benchmarks for quality and sustainability. We envision a future where every
                  family has access to pure, nutritious oils that support their health and well-being.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-primary/90">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Experience the Difference
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us for their daily cooking needs
            </p>
            <Link
              href="/products"
              className="inline-block bg-white text-primary px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Explore Our Products
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
