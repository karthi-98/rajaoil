import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Read the terms and conditions for using Sreerajaganapathy Oil Mill website and purchasing our products. Understand your rights and responsibilities.',
  keywords: ['terms and conditions', 'terms of service', 'user agreement', 'legal terms'],
  openGraph: {
    title: 'Terms & Conditions | Sreerajaganapathy Oil Mill',
    description: 'Terms and conditions for using our website and services.',
  },
  alternates: {
    canonical: '/terms',
  },
}


export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-600">
            Last Updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to Sreerajaganapathy Oil Mill. These Terms and Conditions (&quot;Terms&quot;) govern your use of our website and the purchase of products from us. By accessing or using our website, you agree to be bound by these Terms.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Please read these Terms carefully before using our website. If you do not agree with any part of these Terms, you must not use our website or services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Definitions</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>&quot;We,&quot; &quot;us,&quot; &quot;our&quot;</strong> refers to Sreerajaganapathy Oil Mill</li>
              <li><strong>&quot;You,&quot; &quot;your&quot;</strong> refers to the user or customer</li>
              <li><strong>&quot;Website&quot;</strong> refers to our e-commerce platform</li>
              <li><strong>&quot;Products&quot;</strong> refers to the cooking oils and related items we sell</li>
              <li><strong>&quot;Services&quot;</strong> refers to the services we provide through our website</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Use of Website</h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">3.1 Eligibility</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You must be at least 18 years old to use our website and make purchases. By using our website, you represent and warrant that you meet this age requirement.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">3.2 Account Registration</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              To make purchases, you may need to create an account. You agree to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your information</li>
              <li>Keep your password secure and confidential</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">3.3 Prohibited Activities</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              You agree not to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Use the website for any illegal purpose</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit viruses or malicious code</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the website&apos;s operation</li>
              <li>Use automated systems to access the website</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Orders and Payments</h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">4.1 Product Information</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We make every effort to display our products accurately. However, we do not guarantee that product descriptions, colors, images, or other content are accurate, complete, or error-free. Products are subject to availability.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">4.2 Pricing</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              All prices are listed in Indian Rupees (INR) and are subject to change without notice. We reserve the right to modify prices at any time. The price charged will be the price displayed at the time of order placement. Prices include applicable taxes unless otherwise stated.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">4.3 Order Acceptance</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your order is an offer to purchase products. We reserve the right to accept or decline any order for any reason. We may require additional verification or information before accepting an order. Order confirmation does not guarantee acceptance.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">4.4 Payment</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              We accept the following payment methods:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Credit/Debit Cards (Visa, Mastercard, etc.)</li>
              <li>UPI (Unified Payments Interface)</li>
              <li>Net Banking</li>
              <li>Digital Wallets</li>
              <li>Cash on Delivery (where available)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              Payment must be received before order processing. All transactions are processed securely through third-party payment gateways. We do not store your payment card information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Shipping and Delivery</h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">5.1 Shipping Areas</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We currently ship within India. Shipping costs and delivery times vary based on location and will be calculated at checkout.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">5.2 Delivery Time</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Estimated delivery times are provided at checkout. While we strive to meet these estimates, delivery times are not guaranteed and may vary due to unforeseen circumstances. We are not liable for delays caused by shipping carriers or events beyond our control.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">5.3 Risk of Loss</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Risk of loss and title for products pass to you upon delivery to the shipping carrier. You are responsible for filing claims with the carrier for damaged or lost shipments.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Returns and Refunds</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We accept returns under the following conditions:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Products must be returned within 7 days of delivery</li>
              <li>Products must be unopened and in original packaging</li>
              <li>Proof of purchase must be provided</li>
              <li>Products must not be damaged or tampered with</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              Refunds will be processed to the original payment method within 7-10 business days after receiving and inspecting the returned product. Shipping charges are non-refundable unless the return is due to our error.
            </p>
            <p className="text-gray-700 leading-relaxed">
              For detailed return policy, please refer to our Returns & Refunds page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Product Warranties</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our products are guaranteed to be of high quality and purity. We stand behind the quality of our cooking oils. If you receive a defective or damaged product, please contact us within 7 days of delivery for a replacement or refund.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Products are sold &quot;as is&quot; except for the quality guarantee above. We disclaim all other warranties, express or implied, including merchantability and fitness for a particular purpose.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              All content on this website, including text, graphics, logos, images, audio clips, and software, is the property of Sreerajaganapathy Oil Mill or its licensors and is protected by intellectual property laws.
            </p>
            <p className="text-gray-700 leading-relaxed">
              You may not reproduce, distribute, modify, or create derivative works from our content without express written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To the maximum extent permitted by law, Sreerajaganapathy Oil Mill shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the website or products.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our total liability for any claim arising from your use of the website or products shall not exceed the amount you paid for the products in question.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Indemnification</h2>
            <p className="text-gray-700 leading-relaxed">
              You agree to indemnify and hold harmless Sreerajaganapathy Oil Mill, its affiliates, officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of the website, violation of these Terms, or infringement of any rights of another party.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Your use of the website is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices regarding your personal information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or your use of the website shall be subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu, India.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after changes are posted constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Severability</h2>
            <p className="text-gray-700 leading-relaxed">
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <p className="text-gray-700 mb-2"><strong>Sreerajaganapathy Oil Mill</strong></p>
              <p className="text-gray-700 mb-2">96N TC main road west</p>
              <p className="text-gray-700 mb-2">Srg valasu road</p>
              <p className="text-gray-700 mb-2">Vellakoil - 638111</p>
              <p className="text-gray-700">Phone: <a href="tel:+919876543210" className="text-primary hover:underline">+91 98765 43210</a></p>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed">
                <strong>Acknowledgment:</strong> By using our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
