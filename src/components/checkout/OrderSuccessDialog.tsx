'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle } from 'lucide-react'

interface OrderSuccessDialogProps {
  isOpen: boolean
  orderId: string
  stage: 'processing' | 'success' | 'redirecting'
  onClose: () => void
}

export function OrderSuccessDialog({ isOpen, orderId, stage, onClose }: OrderSuccessDialogProps) {
  const router = useRouter()
  const [redirectCountdown, setRedirectCountdown] = useState(3)

  // Reset countdown when entering redirecting stage
  useEffect(() => {
    if (stage === 'redirecting') {
      setRedirectCountdown(3)
    }
  }, [stage])

  // Stage 3: Countdown and redirect
  useEffect(() => {
    if (!isOpen || stage !== 'redirecting') return

    if (redirectCountdown <= 0) {
      // Close dialog first, then redirect
      onClose()
      // Small delay to ensure close completes
      setTimeout(() => {
        router.push('/products')
      }, 100)
      return
    }

    const timer = setTimeout(() => {
      setRedirectCountdown(redirectCountdown - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [isOpen, stage, redirectCountdown, onClose, router])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50 animate-fadeIn" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scaleIn">
          {/* Content */}
          <div className="p-8 text-center">
            {/* Stage 1: Processing */}
            {stage === 'processing' && (
              <>
                <div className="flex justify-center mb-6">
                  <div className="relative w-20 h-20">
                    <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary animate-spin" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Processing Order
                </h2>

                <p className="text-gray-600 mb-2">
                  Please wait while we process your order...
                </p>

                <p className="text-sm text-gray-500">
                  This will only take a moment
                </p>
              </>
            )}

            {/* Stage 2: Success */}
            {stage === 'success' && (
              <>
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Order Placed Successfully!
                </h2>

                {/* Order ID Box */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
                  <p className="text-sm text-gray-600 mb-1">Order ID</p>
                  <p className="text-lg font-bold text-gray-900 break-all">{orderId}</p>
                </div>

                <p className="text-gray-600 mb-2 text-sm">
                  One of our executives will call you shortly to confirm your order and discuss payment options.
                </p>

                <p className="text-sm text-gray-500">
                  Thank you for choosing Raja Oil!
                </p>
              </>
            )}

            {/* Stage 3: Redirecting */}
            {stage === 'redirecting' && (
              <>
                <div className="flex justify-center mb-6">
                  <div className="relative w-20 h-20">
                    <div className="absolute inset-0 rounded-full border-4 border-blue-100" />
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 border-r-blue-600 animate-spin" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Redirecting...
                </h2>

                <p className="text-gray-600 mb-4 text-sm">
                  Taking you to the products page
                </p>

                <div className="inline-block">
                  <div className="text-4xl font-bold text-blue-600">
                    {redirectCountdown}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Redirecting in {redirectCountdown} second{redirectCountdown !== 1 ? 's' : ''}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </>
  )
}
