import { Metadata } from 'next'
import Link from 'next/link'
import { HelpCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'FAQ - sreeraajaganapathy Oil Mill',
  description: 'Frequently asked questions about our products, ordering, payments, shipping, and more. Find answers to your questions.',
  keywords: ['faq', 'frequently asked questions', 'help', 'support', 'product questions'],
  openGraph: {
    title: 'FAQ - sreeraajaganapathy Oil Mill',
    description: 'Get answers to common questions about our products and services.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://rajaoil.com/faq',
  },
}

const faqCategories = [
  {
    category: 'About Our Products',
    icon: '🫒',
    faqs: [
      {
        question: 'What types of cooking oils do you offer?',
        answer: 'We offer a wide range of premium cooking oils including Coconut Oil, Groundnut Oil, Gingelly Oil (Sesame Oil), and other traditional oils. Each oil is extracted using traditional methods to preserve natural nutrients and authentic flavors.',
      },
      {
        question: 'Are your oils pure and natural?',
        answer: 'Yes, all our oils are 100% pure and natural with no additives, preservatives, or chemicals. We use traditional cold-pressing and wood-fired methods that preserve the natural goodness of the seeds and nuts.',
      },
      {
        question: 'Do you have any organic or certified products?',
        answer: 'We are committed to quality and purity. Please contact us for information about certifications and organic options available for our products.',
      },
      {
        question: 'What is the shelf life of your oils?',
        answer: 'Our oils have a shelf life of 12-18 months when stored properly. Store in a cool, dark place away from direct sunlight. Once opened, it\'s best to use within 6 months for optimal quality.',
      },
      {
        question: 'Do you offer different sizes/quantities?',
        answer: 'Yes, we offer various sizes ranging from small personal bottles to bulk quantities for commercial use. Check our products page for all available options.',
      },
    ],
  },
  {
    category: 'Ordering & Payment',
    icon: '💳',
    faqs: [
      {
        question: 'How do I place an order?',
        answer: 'Visit our Products page, select your desired oil and quantity, add it to your cart, and proceed to checkout. Fill in your shipping details and select your preferred payment method.',
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept Credit/Debit Cards (Visa, Mastercard), UPI, Net Banking, Digital Wallets, and Cash on Delivery (where available).',
      },
      {
        question: 'Is my payment information secure?',
        answer: 'Yes, all transactions are processed securely through third-party payment gateways with SSL encryption. We do not store your payment card information on our servers.',
      },
      {
        question: 'Can I place a bulk order?',
        answer: 'Yes, we offer bulk orders for commercial and wholesale purposes. For bulk inquiries, please contact our customer support team for special pricing.',
      },
      {
        question: 'Can I cancel or modify my order?',
        answer: 'You can cancel or modify your order if it hasn\'t been dispatched yet. Please contact us immediately with your order number to request changes.',
      },
      {
        question: 'Do you offer gift options or special packaging?',
        answer: 'We offer premium packaging options. For special requests, please contact our customer support team.',
      },
    ],
  },
  {
    category: 'Shipping & Delivery',
    icon: '📦',
    faqs: [
      {
        question: 'Where do you ship?',
        answer: 'We currently ship throughout India. Shipping costs and delivery times vary based on your location and will be calculated at checkout.',
      },
      {
        question: 'What are the delivery times?',
        answer: 'Standard Delivery takes 5-7 business days, and Express Delivery takes 2-3 business days for metro cities. Delivery times are provided at checkout based on your location.',
      },
      {
        question: 'Do you ship internationally?',
        answer: 'Currently, we only ship within India. We are exploring options to expand to international markets. Please contact us for updates.',
      },
      {
        question: 'Is shipping free?',
        answer: 'Standard shipping is free on orders above ₹499. Express delivery is ₹99 (free on orders above ₹999).',
      },
      {
        question: 'How can I track my order?',
        answer: 'You will receive a tracking number via email and SMS once your order is dispatched. Use this number to track your shipment in real-time on the courier partner\'s website.',
      },
    ],
  },
  {
    category: 'Returns & Refunds',
    icon: '↩️',
    faqs: [
      {
        question: 'What is your return policy?',
        answer: 'We accept returns within 7 days of delivery for unopened, undamaged products in original packaging. Refunds are processed within 7-10 business days after inspection.',
      },
      {
        question: 'Can I return an opened product?',
        answer: 'Unfortunately, we cannot accept returns of opened or used products for food safety and hygiene reasons. Products must remain unopened and in original sealed packaging.',
      },
      {
        question: 'What if I received a damaged product?',
        answer: 'If you receive a damaged product, contact us immediately with photos. We will send a replacement or issue a full refund at no additional cost.',
      },
      {
        question: 'How long does refund processing take?',
        answer: 'Refunds are processed within 7-10 business days of approval. Depending on your bank, it may take an additional 2-5 business days to reflect in your account.',
      },
      {
        question: 'Do you offer exchanges?',
        answer: 'Yes, we offer exchanges for defective or damaged items. Contact us with your order number and the product you\'d like to exchange.',
      },
    ],
  },
  {
    category: 'Account & Customer Service',
    icon: '👤',
    faqs: [
      {
        question: 'Do I need to create an account to order?',
        answer: 'Creating an account is optional but recommended. It allows you to track orders, save addresses, and access order history easily.',
      },
      {
        question: 'Can I change my account information?',
        answer: 'Yes, you can update your account details like email, phone number, and addresses in your account settings.',
      },
      {
        question: 'How do I contact customer support?',
        answer: 'You can reach our customer support team through our Contact Us page, email, or phone. We respond within 24 hours.',
      },
      {
        question: 'What are your business hours?',
        answer: 'We operate Monday to Saturday, 9:00 AM to 6:00 PM. We are closed on Sundays and public holidays.',
      },
      {
        question: 'Do you offer customer loyalty programs?',
        answer: 'Please contact us for information about our loyalty programs and special offers for regular customers.',
      },
    ],
  },
  {
    category: 'Privacy & Security',
    icon: '🔒',
    faqs: [
      {
        question: 'How do you protect my personal information?',
        answer: 'We use SSL encryption and secure servers to protect your data. We do not share your personal information with third parties without consent.',
      },
      {
        question: 'What is your privacy policy?',
        answer: 'Please visit our Privacy Policy page for detailed information about how we collect, use, and protect your data.',
      },
      {
        question: 'Can I unsubscribe from emails?',
        answer: 'Yes, you can unsubscribe from marketing emails at any time by clicking the unsubscribe link at the bottom of our emails.',
      },
      {
        question: 'Is my transaction information safe?',
        answer: 'Yes, all transactions are processed through secure payment gateways with industry-standard encryption. We do not store your card details.',
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <HelpCircle className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our products, ordering, shipping, and more
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {faqCategories.map((categoryGroup, categoryIndex) => (
              <div key={categoryIndex} className="space-y-6">
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-3xl">{categoryGroup.icon}</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {categoryGroup.category}
                  </h2>
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-primary to-transparent" />
                </div>

                {/* FAQs */}
                <div className="space-y-4">
                  {categoryGroup.faqs.map((faq, faqIndex) => (
                    <details
                      key={faqIndex}
                      className="group bg-white rounded-lg border border-gray-200 p-6 hover:border-primary transition-colors cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                    >
                      <summary className="flex items-center justify-between font-semibold text-gray-900 list-none">
                        <span className="text-lg pr-6">{faq.question}</span>
                        <span className="transition-transform group-open:rotate-180 flex-shrink-0 text-primary">
                          ▼
                        </span>
                      </summary>
                      <p className="text-gray-600 mt-4 leading-relaxed">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Can&apos;t Find the Answer?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our customer support team is here to help with any questions you may have
            </p>

            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Get in Touch With Us
              </h3>

              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl mb-2">📞</div>
                  <p className="font-semibold text-gray-900 mb-2">Call Us</p>
                  <a href="tel:+918678981221" className="text-primary hover:underline">
                    +91 86789 81221
                  </a>
                </div>

                <div className="text-center">
                  <div className="text-3xl mb-2">📧</div>
                  <p className="font-semibold text-gray-900 mb-2">Email Us</p>
                  <p className="text-gray-600">Via Contact Form</p>
                </div>

                <div className="text-center">
                  <div className="text-3xl mb-2">⏰</div>
                  <p className="font-semibold text-gray-900 mb-2">Business Hours</p>
                  <p className="text-gray-600">Mon-Sat: 9 AM - 6 PM</p>
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-md transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Helpful Resources
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/shipping"
              className="bg-white border border-gray-200 rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all text-center"
            >
              <div className="text-3xl mb-3">📦</div>
              <h3 className="font-semibold text-gray-900 mb-2">Shipping Info</h3>
              <p className="text-sm text-gray-600">Learn about delivery options</p>
            </Link>

            <Link
              href="/returns"
              className="bg-white border border-gray-200 rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all text-center"
            >
              <div className="text-3xl mb-3">↩️</div>
              <h3 className="font-semibold text-gray-900 mb-2">Returns & Refunds</h3>
              <p className="text-sm text-gray-600">Hassle-free return policy</p>
            </Link>

            <Link
              href="/privacy"
              className="bg-white border border-gray-200 rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all text-center"
            >
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="font-semibold text-gray-900 mb-2">Privacy Policy</h3>
              <p className="text-sm text-gray-600">Data protection & privacy</p>
            </Link>

            <Link
              href="/terms"
              className="bg-white border border-gray-200 rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all text-center"
            >
              <div className="text-3xl mb-3">⚖️</div>
              <h3 className="font-semibold text-gray-900 mb-2">Terms & Conditions</h3>
              <p className="text-sm text-gray-600">Website terms of service</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
