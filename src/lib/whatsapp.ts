import type { CartItem } from './types'

const WHATSAPP_NUMBER = '918678981221' // India country code + number

export interface OrderDetails {
  items: CartItem[]
  total: number
  customerName?: string
  customerPhone?: string
  doorNo?: string
  address?: string
  district?: string
  state?: string
  pincode?: string
  notes?: string
}

/**
 * Format price to currency string
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
}

/**
 * Generate WhatsApp message from order details
 */
export function generateWhatsAppMessage(orderDetails: OrderDetails): string {
  const { items, total, customerName, customerPhone, doorNo, address, district, state, pincode, notes } = orderDetails

  let message = 'Hello! I would like to place an order from Raja Oil 🛒\n\n'

  // Customer details
  message += '*My Details:*\n'
  if (customerName) {
    message += `Name: ${customerName}\n`
  }
  if (customerPhone) {
    message += `Phone: ${customerPhone}\n`
  }

  // Delivery Address
  const hasAddress = doorNo || address || district || state || pincode
  if (hasAddress) {
    message += '\n*Delivery Address:*\n'
    if (doorNo) {
      message += `Door No: ${doorNo}\n`
    }
    if (address) {
      message += `Address: ${address}\n`
    }
    if (district) {
      message += `District: ${district}\n`
    }
    if (state) {
      message += `State: ${state}\n`
    }
    if (pincode) {
      message += `Pincode: ${pincode}\n`
    }
  }
  message += '\n'

  // Order items
  message += '*My Order:*\n'
  message += '─────────────────\n'

  items.forEach((item, index) => {
    message += `${index + 1}. *${item.productId} - ${item.name}*\n`
    message += `   Quantity: ${item.quantity} × ${formatPrice(item.price)}\n`
    if (item.offer) {
      message += `   🎁 Offer: ${item.offer}\n`
    }
    message += `   Subtotal: ${formatPrice(item.price * item.quantity)}\n\n`
  })

  // Total
  message += '─────────────────\n'
  message += `*Total Amount:* ${formatPrice(total)}\n`

  // Notes
  if (notes) {
    message += `\n*Additional Notes:* ${notes}\n`
  }

  message += '\nPlease confirm my order. Thank you! 🙏'

  return message
}

/**
 * Detect if user is on mobile device
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

/**
 * Generate WhatsApp URL with pre-filled message
 */
export function generateWhatsAppURL(orderDetails: OrderDetails): string {
  const message = generateWhatsAppMessage(orderDetails)
  const encodedMessage = encodeURIComponent(message)

  // Use wa.me for mobile, web.whatsapp.com for desktop
  const baseURL = isMobileDevice()
    ? `https://wa.me/${WHATSAPP_NUMBER}`
    : `https://web.whatsapp.com/send?phone=${WHATSAPP_NUMBER}`

  return `${baseURL}${isMobileDevice() ? '?' : '&'}text=${encodedMessage}`
}

/**
 * Open WhatsApp with order details
 */
export function sendOrderToWhatsApp(orderDetails: OrderDetails): void {
  const url = generateWhatsAppURL(orderDetails)
  window.open(url, '_blank')
}
