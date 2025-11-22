'use client'

// ContactSection Component
// Displays contact information, enquiry form, and Google Maps

import { useState } from 'react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    product: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Add your form submission logic here
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000))

      setSubmitStatus('success')
      setFormData({
        name: '',
        mobile: '',
        email: '',
        product: '',
        message: ''
      })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50" style={{ minHeight: '80vh' }}>
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            <span className="inline-block mr-2">📞</span>
            Contact Us
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-2"></div>
          <p className="text-sm text-gray-700 max-w-2xl mx-auto">
            We are always ready to assist you with product inquiries, bulk orders, export requirements, and private labelling services.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Contact Information - Single Container */}
        <div className="bg-white rounded-2xl p-6 shadow-lg space-y-5">
          {/* Address */}
          <div className="flex items-start gap-3 pb-5 border-b border-gray-100">
            <div className="text-2xl">📍</div>
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-1">Address</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Sree Raajaganapathy Oil Mill<br />
                TC Main Road West,<br />
                Seerangarayagounden Valasu Road,<br />
                Vellakoil, Tirupur District – 638111<br />
                Tamil Nadu, India
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3 pb-5 border-b border-gray-100">
            <div className="text-2xl">📱</div>
            <div className="w-full">
              <h3 className="text-base font-bold text-gray-900 mb-3">Phone / WhatsApp</h3>

              {/* V. G. Vignesh */}
              <div className="mb-3 pb-3 border-b border-gray-100">
                <p className="text-sm text-gray-700 font-semibold mb-1">
                  <a href="tel:+918678981221" className="hover:text-primary transition-colors">
                    +91 86789 81221
                  </a>
                </p>
                <p className="text-xs font-medium text-gray-900 mb-1">V. G. Vignesh</p>
                <p className="text-xs text-gray-600">
                  Chennai, Coimbatore, Trichy, Madurai & other districts, Export enquiries
                </p>
              </div>

              {/* G. Gopalsamy */}
              <div className="mb-3">
                <p className="text-sm text-gray-700 font-semibold mb-1">
                  <a href="tel:+919487264784" className="hover:text-primary transition-colors">
                    +91 94872 64784
                  </a>
                </p>
                <p className="text-xs font-medium text-gray-900 mb-1">G. Gopalsamy</p>
                <p className="text-xs text-gray-600">
                  Thanjavur, Mayiladuthurai, Nagapattinam & Thiruvarur Districts
                </p>
              </div>

              <p className="text-xs text-gray-600 pt-2 border-t border-gray-100">Available 9:00 AM – 8:00 PM</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3 pb-5 border-b border-gray-100">
            <div className="text-2xl">📧</div>
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-1">Email</h3>
              <p className="text-sm text-gray-700">
                <a href="mailto:sreeraajaganapathyoilmill@gmail.com" className="hover:text-primary transition-colors break-all">
                  sreeraajaganapathyoilmill@gmail.com
                </a>
              </p>
              <p className="text-xs text-gray-600 mt-1">For orders, exports & business enquiries</p>
            </div>
          </div>

          {/* Business Hours */}
          <div className="flex items-start gap-3">
            <div className="text-2xl">🕒</div>
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-1">Business Hours</h3>
              <p className="text-sm text-gray-700">Monday – Saturday: 9:00 AM to 8:00 PM</p>
              <p className="text-sm text-gray-700">Sunday: Holiday</p>
            </div>
          </div>
        </div>

        {/* Enquiry Form */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            <span className="inline-block mr-2">📩</span>
            Enquiry Form
          </h3>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="mobile" className="block text-xs font-semibold text-gray-700 mb-1">
                Mobile Number *
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                pattern="[0-9]{10}"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Enter 10-digit mobile number"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="product" className="block text-xs font-semibold text-gray-700 mb-1">
                Product / Requirement *
              </label>
              <select
                id="product"
                name="product"
                value={formData.product}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                <option value="">Select a product</option>
                <option value="Sesame Oil">Sesame Oil</option>
                <option value="Groundnut Oil">Groundnut Oil</option>
                <option value="Coconut Oil">Coconut Oil</option>
                <option value="Bulk Order">Bulk Order</option>
                <option value="Export">Export Services</option>
                <option value="Private Labelling">Private Labelling / OEM</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-semibold text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                placeholder="Enter your message or requirements"
              />
            </div>

            {submitStatus === 'success' && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-xs">
                Thank you! Your enquiry has been submitted successfully. We will contact you soon.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs">
                Sorry, there was an error submitting your enquiry. Please try again or contact us directly.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-6 text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
            </button>
          </form>
        </div>
        </div>
      </section>

      {/* Google Map - Full Width End to End */}
      <section className="w-full bg-white shadow-lg">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-6 py-4 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 text-center">
            <span className="inline-block mr-2">📌</span>
            Find Us on Map
          </h3>
          <p className="text-sm text-gray-600 text-center mt-1">
            Sree Raajaganapathy Oil Mill, Vellakoil, Tirupur District, Tamil Nadu
          </p>
        </div>
        <div className="w-full h-[450px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.9876!2d77.7234!3d11.1234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDA3JzI0LjIiTiA3N8KwNDMnMjQuMiJF!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Sree Raajaganapathy Oil Mill Location"
          />
        </div>
      </section>
    </>
  )
}
