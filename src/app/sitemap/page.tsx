import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sitemap - sreeraajaganapathy Oil Mill',
  description: 'Complete sitemap of sreeraajaganapathy Oil Mill website. Find all pages and sections.',
  keywords: ['sitemap', 'website map', 'navigation', 'all pages'],
  openGraph: {
    title: 'Sitemap - sreeraajaganapathy Oil Mill',
    description: 'Browse all pages and sections of our website.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://rajaoil.com/sitemap',
  },
}

const sitemapSections = [
  {
    title: 'Main Pages',
    icon: '🏠',
    links: [
      { label: 'Home', href: '/', description: 'Welcome to sreeraajaganapathy Oil Mill' },
      { label: 'About Us', href: '/about', description: 'Learn about our story and mission' },
      { label: 'Products', href: '/products', description: 'Browse our premium cooking oils' },
      { label: 'Contact Us', href: '/contact', description: 'Get in touch with our team' },
      { label: 'Blog', href: '/blog', description: 'Coming soon - Articles and recipes' },
    ],
  },
  {
    title: 'Shopping',
    icon: '🛒',
    links: [
      { label: 'Products', href: '/products', description: 'All available products' },
      { label: 'Checkout', href: '/checkout', description: 'Complete your purchase' },
    ],
  },
  {
    title: 'Customer Service',
    icon: '💬',
    links: [
      { label: 'Shipping Information', href: '/shipping', description: 'Learn about our shipping policies' },
      { label: 'Returns & Refunds', href: '/returns', description: 'Our return and refund policy' },
      { label: 'FAQ', href: '/faq', description: 'Frequently asked questions' },
    ],
  },
  {
    title: 'Legal',
    icon: '⚖️',
    links: [
      { label: 'Privacy Policy', href: '/privacy', description: 'How we protect your information' },
      { label: 'Terms & Conditions', href: '/terms', description: 'Terms of use and service' },
    ],
  },
]

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <MapPin className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Sitemap
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse all pages and sections of our website to find what you&apos;re looking for
            </p>
          </div>
        </div>
      </section>

      {/* Sitemap Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {sitemapSections.map((section) => (
              <div key={section.title} className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{section.icon}</span>
                  <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                </div>

                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group flex items-start gap-3 p-4 rounded-lg bg-gray-50 hover:bg-primary/5 transition-colors duration-200"
                      >
                        <span className="text-primary text-xl mt-1 group-hover:scale-110 transition-transform">
                          →
                        </span>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                            {link.label}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {link.description}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Statistics */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Website Overview
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-primary mb-2">20+</div>
              <p className="text-gray-600 text-sm">Pages & Sections</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-primary mb-2">4</div>
              <p className="text-gray-600 text-sm">Main Categories</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <p className="text-gray-600 text-sm">Mobile Responsive</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <p className="text-gray-600 text-sm">Available Access</p>
            </div>
          </div>
        </div>
      </section>

      {/* XML Sitemap Notice */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              📡 XML Sitemap for Search Engines
            </h3>
            <p className="text-gray-600 mb-4">
              We also provide an XML sitemap for search engines like Google, Bing, and Yahoo. This helps search engines discover and index all pages on our website more efficiently.
            </p>
            <p className="text-gray-700">
              <strong>XML Sitemap URL:</strong>{' '}
              <a
                href="/sitemap.xml"
                className="text-primary hover:underline font-medium"
              >
                /sitemap.xml
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 md:py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Can&apos;t Find What You&apos;re Looking For?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Contact us directly and our team will be happy to assist you
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-primary px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors duration-200"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}
