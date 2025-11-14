import nodemailer from 'nodemailer'
import type { CartItem } from './types'

// Create Gmail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export interface OrderEmailData {
  orderId: string
  items: CartItem[]
  total: number
  subtotal?: number
  shippingCost?: number
  customerName: string
  customerPhone: string
  doorNo: string
  address: string
  district: string
  state: string
  pincode: string
  notes?: string
  createdAt: string
}

/**
 * Format price to Indian Rupees
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
}

/**
 * Generate HTML email for order notification
 */
function generateOrderEmailHTML(data: OrderEmailData): string {
  const { orderId, items, total, subtotal, shippingCost, customerName, customerPhone, doorNo, address, district, state, pincode, notes, createdAt } = data

  let itemsHTML = ''
  items.forEach((item, index) => {
    itemsHTML += `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 16px 8px; text-align: left;">
          <strong>${item.productId}</strong><br/>
          <span style="color: #6b7280; font-size: 14px;">${item.name}</span>
          ${item.offer ? `<br/><span style="background: #dcfce7; color: #166534; padding: 2px 8px; border-radius: 4px; font-size: 12px;">🎁 ${item.offer}</span>` : ''}
        </td>
        <td style="padding: 16px 8px; text-align: center;">${item.quantity}</td>
        <td style="padding: 16px 8px; text-align: right;">${formatPrice(item.price)}</td>
        <td style="padding: 16px 8px; text-align: right; font-weight: 600;">${formatPrice(item.price * item.quantity)}</td>
      </tr>
    `
  })

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Order - ${orderId}</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">

          <!-- Header -->
          <div style="background: linear-gradient(135deg, #1f2937 0%, #374151 100%); color: white; padding: 30px 20px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">🛒 New Order Received!</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Raja Oil</p>
          </div>

          <!-- Order ID Badge -->
          <div style="background: #fff; padding: 20px; text-align: center; border-bottom: 2px solid #e5e7eb;">
            <div style="display: inline-block; background: #fef3c7; color: #92400e; padding: 8px 16px; border-radius: 8px; font-weight: 600; font-size: 16px;">
              Order ID: ${orderId}
            </div>
            <p style="margin: 10px 0 0 0; color: #6b7280; font-size: 14px;">${createdAt}</p>
          </div>

          <!-- Customer Details -->
          <div style="background: white; padding: 24px; border-bottom: 1px solid #e5e7eb;">
            <h2 style="margin: 0 0 16px 0; color: #1f2937; font-size: 20px; font-weight: 600;">👤 Customer Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Name:</td>
                <td style="padding: 8px 0; color: #1f2937; font-weight: 600;">${customerName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Phone:</td>
                <td style="padding: 8px 0; color: #1f2937; font-weight: 600;">${customerPhone}</td>
              </tr>
            </table>
          </div>

          <!-- Delivery Address -->
          <div style="background: white; padding: 24px; border-bottom: 1px solid #e5e7eb;">
            <h2 style="margin: 0 0 16px 0; color: #1f2937; font-size: 20px; font-weight: 600;">📍 Delivery Address</h2>
            <div style="background: #f9fafb; padding: 16px; border-radius: 8px; border-left: 4px solid #3b82f6;">
              <p style="margin: 0; color: #1f2937; line-height: 1.6;">
                ${doorNo}<br/>
                ${address}<br/>
                ${district}, ${state}<br/>
                Pincode: ${pincode}
              </p>
            </div>
          </div>

          <!-- Order Items -->
          <div style="background: white; padding: 24px;">
            <h2 style="margin: 0 0 16px 0; color: #1f2937; font-size: 20px; font-weight: 600;">📦 Order Items</h2>
            <table style="width: 100%; border-collapse: collapse; background: #f9fafb; border-radius: 8px; overflow: hidden;">
              <thead>
                <tr style="background: #1f2937; color: white;">
                  <th style="padding: 12px 8px; text-align: left; font-weight: 600;">Product</th>
                  <th style="padding: 12px 8px; text-align: center; font-weight: 600;">Qty</th>
                  <th style="padding: 12px 8px; text-align: right; font-weight: 600;">Price</th>
                  <th style="padding: 12px 8px; text-align: right; font-weight: 600;">Subtotal</th>
                </tr>
              </thead>
              <tbody style="background: white;">
                ${itemsHTML}
              </tbody>
            </table>
          </div>

          <!-- Subtotal, Shipping & Total -->
          <div style="background: #f9fafb; padding: 24px; border-top: 2px solid #e5e7eb;">
            <div style="max-width: 300px; margin-left: auto;">
              ${subtotal ? `
              <div style="display: flex; justify-content: space-between; padding: 8px 0; font-size: 16px;">
                <span style="color: #6b7280;">Subtotal:</span>
                <span style="color: #1f2937; font-weight: 600;">${formatPrice(subtotal)}</span>
              </div>
              ` : ''}
              ${shippingCost ? `
              <div style="display: flex; justify-content: space-between; padding: 8px 0; font-size: 16px;">
                <span style="color: #6b7280;">Shipping:</span>
                <span style="color: #1f2937; font-weight: 600;">${formatPrice(shippingCost)}</span>
              </div>
              ` : ''}
              <div style="display: flex; justify-content: space-between; padding: 16px 0 8px 0; border-top: 2px solid #e5e7eb; margin-top: 8px;">
                <span style="color: #1f2937; font-size: 20px; font-weight: bold;">Total Amount:</span>
                <span style="color: #1f2937; font-size: 24px; font-weight: bold;">${formatPrice(total)}</span>
              </div>
            </div>
          </div>

          <!-- Notes (if any) -->
          ${notes ? `
          <div style="background: white; padding: 24px; border-top: 1px solid #e5e7eb;">
            <h2 style="margin: 0 0 12px 0; color: #1f2937; font-size: 18px; font-weight: 600;">📝 Order Notes</h2>
            <p style="margin: 0; color: #6b7280; padding: 12px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
              ${notes}
            </p>
          </div>
          ` : ''}

          <!-- Footer -->
          <div style="background: white; padding: 24px; text-align: center; border-radius: 0 0 12px 12px; border-top: 2px solid #e5e7eb;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              This order has been automatically saved to your Firebase database.
            </p>
            <p style="margin: 8px 0 0 0; color: #9ca3af; font-size: 12px;">
              Raja Oil - Premium Cooking Oils
            </p>
          </div>

        </div>
      </body>
    </html>
  `
}

/**
 * Send order notification email
 */
export async function sendOrderNotificationEmail(orderData: OrderEmailData): Promise<boolean> {
  try {
    const htmlContent = generateOrderEmailHTML(orderData)

    const mailOptions = {
      from: `"Raja Oil Orders" <${process.env.GMAIL_USER}>`,
      to: process.env.ORDER_NOTIFICATION_EMAIL || process.env.GMAIL_USER,
      subject: `🛒 New Order #${orderData.orderId} - ${orderData.customerName}`,
      html: htmlContent,
    }

    const info = await transporter.sendMail(mailOptions)

    console.log('✅ Order notification email sent:', info.messageId)
    return true
  } catch (error) {
    console.error('❌ Email error:', error)
    return false
  }
}
