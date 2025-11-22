'use client'

import { useState, FormEvent } from 'react'
import { Send } from 'lucide-react'
import { submitContactForm } from '@/app/actions/contact'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    product: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProductChange = (value: string) => {
    setFormData((prev) => ({ ...prev, product: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await submitContactForm(formData)

      if (response.success) {
        setSubmitStatus({
          type: 'success',
          message: response.message,
        })
        setFormData({ name: '', mobile: '', email: '', product: '', message: '' })
      } else {
        setSubmitStatus({
          type: 'error',
          message: response.message,
        })
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus({
        type: 'error',
        message: 'Something went wrong. Please try again later.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          placeholder="Enter your name"
        />
      </div>

      {/* Mobile */}
      <div>
        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
          Mobile Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="mobile"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          required
          pattern="[0-9]{10}"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          placeholder="Enter 10-digit mobile number"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          placeholder="Enter your email"
        />
      </div>

      {/* Product / Requirement */}
      <div>
        <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-1">
          Product / Requirement <span className="text-red-500">*</span>
        </label>
        <Select value={formData.product} onValueChange={handleProductChange} required>
          <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white">
            <SelectValue placeholder="Select a product" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Sesame Oil">Sesame Oil</SelectItem>
            <SelectItem value="Groundnut Oil">Groundnut Oil</SelectItem>
            <SelectItem value="Coconut Oil">Coconut Oil</SelectItem>
            <SelectItem value="Bulk Order">Bulk Order</SelectItem>
            <SelectItem value="Export">Export Services</SelectItem>
            <SelectItem value="Private Labelling">Private Labelling / OEM</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
          placeholder="Enter your message or requirements"
        />
      </div>

      {/* Submit Status */}
      {submitStatus.type && (
        <div
          className={`p-4 rounded-md ${
            submitStatus.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            Submit Enquiry
          </>
        )}
      </button>
    </form>
  )
}
