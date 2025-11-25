export default function ContactInfo() {
  return (
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
  )
}
