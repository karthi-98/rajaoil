import { Metadata } from 'next'
import ContactForm from '@/components/contact/ContactForm'
import ContactInfo from '@/components/contact/ContactInfo'

export const metadata: Metadata = {
  title: 'Contact Us - Sreerajaganapathy Oil Mill',
  description: 'Get in touch with Sreerajaganapathy Oil Mill. Contact us for inquiries, orders, or support. We are here to help you.',
  keywords: ['contact us', 'customer support', 'oil mill contact', 'inquiry', 'order oil'],
  openGraph: {
    title: 'Contact Us - Sreerajaganapathy Oil Mill',
    description: 'Get in touch with us for inquiries, orders, or support.',
    type: 'website',
    images: [{ url: '/images/logo.png', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://rajaoil.com/contact',
  },
}

export default function ContactPage() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Sreerajaganapathy Oil Mill',
    image: 'https://rajaoil.com/images/logo.png',
    '@id': 'https://rajaoil.com',
    url: 'https://rajaoil.com',
    telephone: '+91-XXXXXXXXXX',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Your Street Address',
      addressLocality: 'Your City',
      addressRegion: 'Your State',
      postalCode: 'XXXXXX',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 0.0,
      longitude: 0.0,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Contact Us
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Have questions or need assistance? We&apos;re here to help you with all your inquiries
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </p>
                <ContactForm />
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Get In Touch
                </h2>
                <p className="text-gray-600 mb-8">
                  You can also reach us through any of the following methods:
                </p>
                <ContactInfo />
              </div>
            </div>
          </div>
        </section>

        {/* Map Section (Placeholder) */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Visit Our Location
            </h2>
            <div className="bg-gray-200 rounded-lg h-[400px] flex items-center justify-center">
              <p className="text-gray-500 text-lg">
                Map integration can be added here
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
