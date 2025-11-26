import HeroSlider from "@/components/home/HeroSlider";
import AboutUs from "@/components/home/AboutUs";
import MissionStatement from "@/components/home/MissionStatement";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ContactSection from "@/components/home/ContactSection";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://sreeraajaganapathyoilmill.com',
  },
}

export default function Home() {
  // Comprehensive structured data for homepage
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SreeRaajaGanapathy Oil Mill',
    alternateName: 'Sree Raaja Ganapathy Oil Mill',
    url: 'https://sreeraajaganapathyoilmill.com',
    logo: 'https://sreeraajaganapathyoilmill.com/images/logo_new.png',
    description: 'Premium quality cooking oil manufacturer specializing in traditional cold-pressed coconut oil, groundnut oil, and sesame oil. Trusted by families for generations.',
    telephone: '+91-86789-81221',
    email: 'info@sreeraajaganapathyoilmill.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '96N TC main road west, Srg valasu road',
      addressLocality: 'Vellakoil',
      addressRegion: 'Tamil Nadu',
      postalCode: '638111',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 10.9433074,
      longitude: 77.6980013,
    },
    sameAs: [
      'https://www.facebook.com/sreeraajaganapathyoilmill',
      'https://www.instagram.com/sreeraajaganapathyoilmill',
    ],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SreeRaajaGanapathy Oil Mill',
    url: 'https://sreeraajaganapathyoilmill.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://sreeraajaganapathyoilmill.com/products?search={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <div className="font-sans bg-white">
        {/* Hero Slider Section */}
        <HeroSlider />

        {/* About Us Section */}
        <AboutUs />

        {/* Mission Statement Section */}
        <MissionStatement />

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* Products Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Products</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Discover our premium quality oils made with traditional extraction methods
            </p>
          </div>

          {/* Product Categories */}
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/products/category/sesame" className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow h-80 cursor-pointer">
              <div className="absolute inset-0">
                <img
                  src="/images/sesame-oil.webp"
                  alt="Sesame Oil Background"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
              </div>
              <div className="relative h-full p-8 flex flex-col items-center justify-center text-center z-10">
                <h3 className="text-2xl font-bold text-white">Sesame Oil</h3>
                <p className="text-white/90 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  Pure and aromatic, perfect for traditional cooking
                </p>
              </div>
            </Link>

            <Link href="/products/category/groundnut" className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow h-80 cursor-pointer">
              <div className="absolute inset-0">
                <img
                  src="/images/groundnut-oil-bg.jpg"
                  alt="Groundnut Oil Background"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
              </div>
              <div className="relative h-full p-8 flex flex-col items-center justify-center text-center z-10">
                <h3 className="text-2xl font-bold text-white">Groundnut Oil</h3>
                <p className="text-white/90 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  Rich nutty flavor, ideal for deep frying
                </p>
              </div>
            </Link>

            <Link href="/products/category/coconut" className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow h-80 cursor-pointer">
              <div className="absolute inset-0">
                <img
                  src="/images/coconut-oil-bg.jpg"
                  alt="Coconut Oil Background"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
              </div>
              <div className="relative h-full p-8 flex flex-col items-center justify-center text-center z-10">
                <h3 className="text-2xl font-bold text-white">Coconut Oil</h3>
                <p className="text-white/90 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  Fresh and pure, excellent for hair and skin
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Contact Section */}
        <ContactSection />
      </div>
    </>
  );
}
