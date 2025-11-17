'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCartContext } from '@/contexts/CartContext'
import { formatPrice } from '@/lib/whatsapp'
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Modal } from '@/components/ui/Modal'
import { OrderSuccessDialog } from '@/components/checkout/OrderSuccessDialog'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, removeItem, clearCart } = useCartContext()
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [doorNo, setDoorNo] = useState('')
  const [address, setAddress] = useState('')
  const [district, setDistrict] = useState('')
  const [state, setState] = useState('')
  const [pincode, setPincode] = useState('')
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Modal state
  const [showModal, setShowModal] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [dialogStage, setDialogStage] = useState<'processing' | 'success' | 'redirecting'>('processing')
  const [modalType, setModalType] = useState<'success' | 'error'>('success')
  const [modalTitle, setModalTitle] = useState('')
  const [modalMessage, setModalMessage] = useState('')
  const [orderId, setOrderId] = useState('')

  // Shipping cost
  const SHIPPING_COST = 100
  const finalTotal = total + SHIPPING_COST

  // Redirect to home if cart is empty (but not during order processing or success dialog)
  useEffect(() => {
    // Don't redirect if we're processing an order or showing success
    if (showSuccessDialog || isSubmitting) {
      return
    }

    if (items.length === 0) {
      // Small delay to show empty state
      const timer = setTimeout(() => {
        router.push('/')
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [items.length, router, isSubmitting, showSuccessDialog])

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()

    if (items.length === 0) {
      setModalType('error')
      setModalTitle('Cart is Empty')
      setModalMessage('Your cart is empty. Please add items before checkout.')
      setShowModal(true)
      return
    }

    if (!customerName || !customerPhone) {
      setModalType('error')
      setModalTitle('Missing Information')
      setModalMessage('Please fill in your name and phone number.')
      setShowModal(true)
      return
    }

    if (!doorNo || !address || !district || !state || !pincode) {
      setModalType('error')
      setModalTitle('Incomplete Address')
      setModalMessage('Please fill in all delivery address fields.')
      setShowModal(true)
      return
    }

    setIsSubmitting(true)

    // Show dialog immediately in processing stage
    setDialogStage('processing')
    setShowSuccessDialog(true)

    try {
      // Send order to backend API
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          total: finalTotal,
          subtotal: total,
          shippingCost: SHIPPING_COST,
          customerName,
          customerPhone,
          doorNo,
          address,
          district,
          state,
          pincode,
          notes,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // DON'T clear cart yet - wait until after dialog finishes
        // This prevents the empty cart redirect from interfering

        // Set order ID and move to success stage
        setOrderId(data.orderId)
        setDialogStage('success')
        setIsSubmitting(false)

        // After 2 seconds, move to redirecting stage
        setTimeout(() => {
          setDialogStage('redirecting')
          // Cart will be cleared when dialog closes (in handleCloseSuccessDialog)
        }, 2000)
      } else {
        // Hide success dialog and show error modal
        setShowSuccessDialog(false)
        setModalType('error')
        setModalTitle('Order Failed')
        setModalMessage(data.error || 'Failed to place order. Please try again.')
        setShowModal(true)
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error('Order submission error:', error)
      // Hide success dialog and show error modal
      setShowSuccessDialog(false)
      setModalType('error')
      setModalTitle('Something Went Wrong')
      setModalMessage('Unable to process your order. Please try again or contact support.')
      setShowModal(true)
      setIsSubmitting(false)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    if (modalType === 'success') {
      // Redirect to products after closing success modal
      router.push('/products')
    }
  }

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false)
    setDialogStage('processing') // Reset for next time
    clearCart() // Clear cart when dialog closes
    // Redirect happens in the OrderSuccessDialog component
  }

  // Only show empty cart message if dialog is not showing
  if (items.length === 0 && !showSuccessDialog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Redirecting you to the homepage...</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your order via WhatsApp</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-4 border-b border-gray-200 last:border-b-0 last:pb-0"
                  >
                    {/* Product Image */}
                    <div className="relative w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No image</span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{item.productId}</h3>
                      <p className="text-sm text-gray-600">{item.name}</p>
                      <p className="text-primary font-semibold text-sm mt-1">
                        {formatPrice(item.price)}
                      </p>
                      <p className="text-gray-500 text-sm mt-1">Qty: {item.quantity}</p>
                    </div>

                    {/* Subtotal & Remove */}
                    <div className="flex flex-col items-end justify-between">
                      <p className="font-semibold text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 hover:bg-red-50 rounded transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Subtotal, Shipping & Total */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                {/* Subtotal */}
                <div className="flex items-center justify-between text-base">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="text-gray-900">{formatPrice(total)}</span>
                </div>

                {/* Shipping */}
                <div className="flex items-center justify-between text-base">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="text-gray-900">{formatPrice(SHIPPING_COST)}</span>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between text-xl font-bold pt-3 border-t border-gray-200">
                  <span className="text-gray-900">Total:</span>
                  <span className="text-primary">{formatPrice(finalTotal)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Details Form */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Your Details</h2>

              <form onSubmit={handleCheckout} className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                {/* Delivery Address Section */}
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900">Delivery Address <span className="text-red-500">*</span></h3>

                  {/* Door No */}
                  <div>
                    <label htmlFor="doorNo" className="block text-sm font-medium text-gray-700 mb-2">
                      Door/Flat No. <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="doorNo"
                      value={doorNo}
                      onChange={(e) => setDoorNo(e.target.value)}
                      placeholder="e.g., 123, Flat 4B"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>

                  {/* Street Address */}
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Street name, area, landmark"
                      rows={2}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                      required
                    />
                  </div>

                  {/* District and State */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-2">
                        District <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="district"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        placeholder="District"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                        State <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="State"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Pincode */}
                  <div>
                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">
                      Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="6-digit pincode"
                      maxLength={6}
                      pattern="[0-9]{6}"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special instructions?"
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>

                {/* Order Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-blue-900 mb-1">
                        Order Confirmation Process
                      </p>
                      <p className="text-sm text-blue-700">
                        After placing your order, one of our executives will call you to confirm your order and discuss payment options.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Place Order
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog with Progress Animation */}
      <OrderSuccessDialog
        isOpen={showSuccessDialog}
        orderId={orderId}
        stage={dialogStage}
        onClose={handleCloseSuccessDialog}
      />

      {/* Error Modal */}
      <Modal
        isOpen={showModal && modalType === 'error'}
        onClose={handleCloseModal}
        title={modalTitle}
        type={modalType}
      >
        <div className="space-y-4">
          <p className="text-base leading-relaxed">{modalMessage}</p>

          <button
            onClick={handleCloseModal}
            className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors mt-4 bg-primary hover:bg-primary/90"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  )
}
