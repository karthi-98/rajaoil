import { Metadata } from 'next'
import Link from 'next/link'
import { RotateCcw, Clock, CheckCircle, AlertCircle, HelpCircle, DollarSign } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Returns & Refunds - sreeraajaganapathy Oil Mill',
  description: 'Easy returns and refunds policy. Learn about our hassle-free return process and refund timeline. Customer satisfaction guaranteed.',
  keywords: ['returns policy', 'refunds', 'return process', 'money back', 'return shipping'],
  openGraph: {
    title: 'Returns & Refunds - sreeraajaganapathy Oil Mill',
    description: 'Hassle-free returns and refunds policy for your peace of mind.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://rajaoil.com/returns',
  },
}

const returnProcess = [
  {
    step: 1,
    title: 'Initiate Return',
    description: 'Contact our customer support team within 7 days of delivery with your order number and reason for return.',
    icon: RotateCcw,
  },
  {
    step: 2,
    title: 'Get Return Authorization',
    description: 'We will provide you with a return authorization number (RMA) and return shipping instructions.',
    icon: CheckCircle,
  },
  {
    step: 3,
    title: 'Ship the Product',
    description: 'Pack your product securely and ship it back to us using the provided return label or instructions.',
    icon: RotateCcw,
  },
  {
    step: 4,
    title: 'Inspection',
    description: 'We will inspect your returned product to ensure it meets our return conditions.',
    icon: AlertCircle,
  },
  {
    step: 5,
    title: 'Refund Processing',
    description: 'Once approved, your refund will be processed to your original payment method within 7-10 business days.',
    icon: DollarSign,
  },
]

const returnConditions = [
  {
    title: 'Within Return Window',
    description: 'Products must be returned within 7 days of delivery',
    icon: '⏰',
  },
  {
    title: 'Unopened Product',
    description: 'Product must be unopened and in original sealed packaging',
    icon: '📦',
  },
  {
    title: 'No Damage',
    description: 'Product should not be damaged, tampered with, or show signs of use',
    icon: '✅',
  },
  {
    title: 'Proof of Purchase',
    description: 'Original receipt, order confirmation, or proof of purchase required',
    icon: '📄',
  },
]

const faqs = [
  {
    question: 'What is your return policy?',
    answer: 'We accept returns within 7 days of delivery for unopened, undamaged products in original packaging. Products must meet all return conditions to be eligible for a full refund.',
  },
  {
    question: 'How long does it take to process a refund?',
    answer: 'Once we receive and inspect your returned product, refunds are typically processed within 7-10 business days. The refund will be credited to your original payment method. Depending on your bank, it may take an additional 2-5 business days for the amount to appear in your account.',
  },
  {
    question: 'Can I return an opened product?',
    answer: 'Unfortunately, we cannot accept returns of opened or used products for food safety and hygiene reasons. Products must be unopened and in original sealed packaging.',
  },
  {
    question: 'Who covers the return shipping cost?',
    answer: 'For returns due to our error (wrong product, defective item), we provide a prepaid return label. For other returns, customers may bear the return shipping cost. However, the return shipping cost is usually refunded if the return is approved.',
  },
  {
    question: 'What if I received a damaged product?',
    answer: 'If you received a damaged product, please contact us immediately with photos of the damage. We will either send a replacement or issue a full refund at no additional cost to you. Damaged product returns are covered by us.',
  },
  {
    question: 'Can I exchange a product instead of returning it?',
    answer: 'Yes, we offer product exchanges for defective or damaged items. Simply contact us with your order number and the product you would like to exchange it with. We will send you a replacement at no extra cost.',
  },
  {
    question: 'What if I want to return multiple products from one order?',
    answer: 'You can return multiple products from a single order. Please list all items you want to return in your return request. Each item will be evaluated individually based on our return policy.',
  },
  {
    question: 'Can I return a product after 7 days of delivery?',
    answer: 'Our standard return window is 7 days from delivery. However, for defective or damaged products, we may accept returns beyond this period. Please contact us to discuss your specific situation.',
  },
]

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <RotateCcw className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Returns & Refunds
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hassle-free returns and refunds. Your satisfaction is our priority
            </p>
          </div>
        </div>
      </section>

      {/* Key Information Box */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Summary</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <p className="font-semibold text-primary text-xl mb-2">7 Days</p>
                <p className="text-gray-700 text-sm">Return window from delivery</p>
              </div>
              <div>
                <p className="font-semibold text-primary text-xl mb-2">100% Refund</p>
                <p className="text-gray-700 text-sm">Full refund for eligible items</p>
              </div>
              <div>
                <p className="font-semibold text-primary text-xl mb-2">7-10 Days</p>
                <p className="text-gray-700 text-sm">Refund processing time</p>
              </div>
              <div>
                <p className="font-semibold text-primary text-xl mb-2">Easy Process</p>
                <p className="text-gray-700 text-sm">Simple 5-step return process</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Return Conditions */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Return Conditions
            </h2>
            <p className="text-lg text-gray-600">
              Your product must meet these conditions to be eligible for return
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {returnConditions.map((condition, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-8 border border-gray-200 hover:border-primary transition-colors text-center"
              >
                <div className="text-4xl mb-4">{condition.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {condition.title}
                </h3>
                <p className="text-gray-600 text-sm">{condition.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Return Process */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How to Return a Product
            </h2>
            <p className="text-lg text-gray-600">
              Follow these simple steps to process your return
            </p>
          </div>

          <div className="space-y-8">
            {returnProcess.map((item) => {
              return (
                <div key={item.step} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white font-bold text-2xl">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Refund Details */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Refund Information
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about your refund
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-3">
                <DollarSign className="h-6 w-6 text-primary" />
                Refund Amount
              </h3>
              <p className="text-gray-600">
                You will receive a full refund of the product price. Original shipping charges are non-refundable unless the return is due to our error or a defective product.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-3">
                <Clock className="h-6 w-6 text-primary" />
                Refund Timeline
              </h3>
              <p className="text-gray-600 mb-4">
                Refunds are processed in the following timeline:
              </p>
              <ul className="space-y-2 text-gray-600 list-disc list-inside">
                <li>Return initiation: 7 days from delivery</li>
                <li>Return shipping: 5-7 business days</li>
                <li>Inspection & approval: 2-3 business days</li>
                <li>Refund processing: 7-10 business days</li>
                <li>Bank processing: 2-5 additional business days</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-primary" />
                Refund Method
              </h3>
              <p className="text-gray-600">
                Refunds are credited to your original payment method. If you paid via credit/debit card, the refund will appear in your card account. For digital wallets or UPI, the refund goes back to the same wallet or UPI ID.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <HelpCircle className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Common Return Questions
            </h2>
            <p className="text-lg text-gray-600">
              Get answers to frequently asked questions about returns
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
      <section className="py-12 md:py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Need Help with Your Return?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Our customer support team is ready to assist you with any questions
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-primary px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors duration-200"
          >
            Contact Support
          </Link>
        </div>
      </section>
    </div>
  )
}
