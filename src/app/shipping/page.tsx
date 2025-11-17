import { Metadata } from 'next'
import Link from 'next/link'
import { Truck, Clock, MapPin, Package, Shield, HelpCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Shipping Information - sreeraajaganapathy Oil Mill',
  description: 'Learn about our shipping policies, delivery times, and shipping costs. Fast and reliable delivery across India.',
  keywords: ['shipping', 'delivery', 'shipping policy', 'delivery time', 'shipping cost'],
  openGraph: {
    title: 'Shipping Information - sreeraajaganapathy Oil Mill',
    description: 'Fast and reliable shipping for all your premium cooking oil orders.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://rajaoil.com/shipping',
  },
}

const shippingOptions = [
  {
    icon: Truck,
    title: 'Standard Delivery',
    description: 'Reliable delivery for all orders',
    deliveryTime: '5-7 Business Days',
    coverage: 'All locations in India',
    cost: 'Free on orders above ₹499',
  },
  {
    icon: Clock,
    title: 'Express Delivery',
    description: 'Fast delivery to major cities',
    deliveryTime: '2-3 Business Days',
    coverage: 'Metro cities only',
    cost: '₹99 (Free on orders above ₹999)',
  },
]

const shippingProcess = [
  {
    step: 1,
    title: 'Order Confirmation',
    description: 'After placing your order, you will receive a confirmation email with order details and tracking information.',
  },
  {
    step: 2,
    title: 'Processing',
    description: 'Your order is carefully packed with proper care to ensure your products arrive in perfect condition.',
  },
  {
    step: 3,
    title: 'Dispatch',
    description: 'Your package is dispatched from our warehouse. You will receive a tracking number via email and SMS.',
  },
  {
    step: 4,
    title: 'In Transit',
    description: 'Your package is on its way. You can track your shipment in real-time using the tracking number provided.',
  },
  {
    step: 5,
    title: 'Delivery',
    description: 'Your package is delivered to your doorstep. Please sign for the package and inspect it immediately.',
  },
]

const faqs = [
  {
    question: 'Do you ship internationally?',
    answer: 'Currently, we only ship within India. We are planning to expand our shipping services to other countries soon. Please stay tuned for updates.',
  },
  {
    question: 'How can I track my order?',
    answer: 'You will receive a tracking number via email and SMS once your order is dispatched. You can use this number to track your shipment on the courier partner\'s website in real-time.',
  },
  {
    question: 'What if my order is delayed?',
    answer: 'While we strive to deliver orders on time, occasional delays may occur due to weather, traffic, or other unforeseen circumstances. We recommend contacting our customer support team if your order is delayed beyond the estimated delivery date.',
  },
  {
    question: 'Are there any shipping restrictions?',
    answer: 'We ship to all locations within India. However, some remote areas may have longer delivery times. The exact delivery time will be provided at checkout based on your location.',
  },
  {
    question: 'Can I change my shipping address after placing an order?',
    answer: 'If you need to change your shipping address, please contact our customer support team immediately. Address changes are possible only if the order hasn\'t been dispatched yet.',
  },
  {
    question: 'What packaging materials do you use?',
    answer: 'We use eco-friendly and protective packaging materials to ensure your products are safe during transit. Our bottles are carefully wrapped and cushioned to prevent any damage.',
  },
]

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <Truck className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Shipping Information
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Fast, reliable, and secure shipping to all locations across India
            </p>
          </div>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shipping Options
            </h2>
            <p className="text-lg text-gray-600">
              Choose the shipping option that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {shippingOptions.map((option, index) => {
              const Icon = option.icon
              return (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {option.title}
                      </h3>
                      <p className="text-gray-600">{option.description}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900">Delivery Time</p>
                        <p className="text-gray-600">{option.deliveryTime}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900">Coverage</p>
                        <p className="text-gray-600">{option.coverage}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Package className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900">Shipping Cost</p>
                        <p className="text-gray-600">{option.cost}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Shipping Process */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Shipping Works
            </h2>
            <p className="text-lg text-gray-600">
              Follow these simple steps from order to delivery
            </p>
          </div>

          <div className="space-y-6">
            {shippingProcess.map((item, index) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-bold text-lg">
                    {item.step}
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                {index < shippingProcess.length - 1 && (
                  <div className="absolute left-6 top-16 h-6 w-0.5 bg-primary/30"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Policy Highlights */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us for Shipping
            </h2>
            <p className="text-lg text-gray-600">
              We care about your order from dispatch to delivery
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 border border-gray-200 hover:border-primary transition-colors">
              <div className="flex justify-center mb-4">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">
                Safe Packaging
              </h3>
              <p className="text-gray-600 text-center">
                Your products are carefully packaged with protective materials to ensure they arrive in perfect condition.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-200 hover:border-primary transition-colors">
              <div className="flex justify-center mb-4">
                <Truck className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">
                Trusted Partners
              </h3>
              <p className="text-gray-600 text-center">
                We work with reliable courier partners to ensure timely and secure delivery of your orders.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-200 hover:border-primary transition-colors">
              <div className="flex justify-center mb-4">
                <Clock className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">
                Real-time Tracking
              </h3>
              <p className="text-gray-600 text-center">
                Track your shipment in real-time and know exactly when your order will arrive at your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <HelpCircle className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Find answers to common questions about shipping
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white rounded-lg border border-gray-200 p-6 hover:border-primary transition-colors cursor-pointer"
              >
                <summary className="flex items-center justify-between font-semibold text-gray-900 list-none">
                  {faq.question}
                  <span className="transition-transform group-open:rotate-180">
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
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary/5 rounded-lg p-8 md:p-12 border border-primary/10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Still Have Questions About Shipping?
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our customer support team is here to help. If you have any questions or concerns about shipping, feel free to reach out to us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-md transition-colors text-center"
              >
                Contact Support
              </Link>
              <Link
                href="/products"
                className="inline-block bg-white border-2 border-primary text-primary hover:bg-primary/5 font-semibold px-6 py-3 rounded-md transition-colors text-center"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
