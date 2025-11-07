import type { CartItem } from './types'

const WHATSAPP_NUMBER = '919698035903' // India country code + number

export interface OrderDetails {
  items: CartItem[]
  total: number
  customerName?: string
  customerPhone?: string
  customerAddress?: string
  notes?: string
}

/**
 * Format price to currency string
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

/**
 * Generate WhatsApp message from order details
 */
export function generateWhatsAppMessage(orderDetails: OrderDetails): string {
  const { items, total, customerName, customerPhone, customerAddress, notes } = orderDetails

  let message = '🛒 *New Order from Raja Oil*\n\n'

  // Customer details
  if (customerName) {
    message += `👤 *Customer:* ${customerName}\n`
  }
  if (customerPhone) {
    message += `📱 *Phone:* ${customerPhone}\n`
  }
  if (customerAddress) {
    message += `📍 *Address:* ${customerAddress}\n`
  }
  if (customerName || customerPhone || customerAddress) {
    message += '\n'
  }

  // Order items
  message += '📦 *Order Items:*\n'
  message += '─────────────────\n'

  items.forEach((item, index) => {
    message += `${index + 1}. *${item.brand} - ${item.name}*\n`
    message += `   Qty: ${item.quantity} × ${formatPrice(item.price)}\n`
    message += `   Subtotal: ${formatPrice(item.price * item.quantity)}\n\n`
  })

  // Total
  message += '─────────────────\n'
  message += `💰 *Total Amount:* ${formatPrice(total)}\n`

  // Notes
  if (notes) {
    message += `\n📝 *Notes:* ${notes}\n`
  }

  message += '\n_Thank you for your order!_ 🙏'

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
