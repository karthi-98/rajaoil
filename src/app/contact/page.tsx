import { Metadata } from 'next'
import ContactForm from '@/components/contact/ContactForm'
import ContactInfo from '@/components/contact/ContactInfo'

export const metadata: Metadata = {
  title: 'Contact Us - sreeraajaganapathy Oil Mill',
  description: 'Get in touch with sreeraajaganapathy Oil Mill. Contact us for inquiries, orders, or support. We are here to help you.',
  keywords: ['contact us', 'customer support', 'oil mill contact', 'inquiry', 'order oil'],
  openGraph: {
    title: 'Contact Us - sreeraajaganapathy Oil Mill',
    description: 'Get in touch with us for inquiries, orders, or support.',
    type: 'website',
    images: [{ url: '/images/logo_image.webp', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://rajaoil.com/contact',
  },
}

export default function ContactPage() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'sreeraajaganapathy Oil Mill',
    image: 'https://rajaoil.com/images/logo_image.webp',
    '@id': 'https://rajaoil.com',
    url: 'https://rajaoil.com',
    telephone: '+91-86789-81221',
    priceRange: '$$',
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
        <section className="relative bg-gradient-to-b from-red-50 to-white py-16">
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
        <section className="pb-16 md:pb-24">
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

        {/* Map Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Visit Our Location
            </h2>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.5461234567890!2d77.6980013!3d10.9433074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba99a655555553f%3A0x708b511fe7cf3e28!2sSREE%20RAAJA%20GANAPATHY%20OIL%20MILL!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="sreeraajaganapathy Oil Mill Location"
              ></iframe>
            </div>
            <div className="mt-6 text-center">
              <a
                href="https://www.google.com/maps/place/SREE+RAAJA+GANAPATHY+OIL+MILL/@10.9433074,77.6980013,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba99a655555553f:0x708b511fe7cf3e28!8m2!3d10.9433074!4d77.6980013!16s%2Fg%2F11f3wd1yqw?entry=ttu&g_ep=EgoyMDI1MTEwOS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                View on Google Maps
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
