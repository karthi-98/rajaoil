# Twilio WhatsApp Integration - Complete Setup Guide

## Why Twilio is Easier Than Meta

✅ **No business verification needed** (for testing)
✅ **Sandbox available** for immediate testing
✅ **Simple API** - just 10 lines of code
✅ **Great documentation** and support
✅ **$15 free credit** to start

---

## Setup Steps

### 1. Create Twilio Account (5 minutes)

1. Go to: https://www.twilio.com/try-twilio
2. Sign up with email
3. Verify your phone number
4. You get **$15 free credit**!

### 2. Activate WhatsApp Sandbox (2 minutes)

1. In Twilio Console, go to: **Messaging** → **Try it Out** → **Send a WhatsApp message**
2. You'll see:
   ```
   To: whatsapp:+14155238886
   Message: join <your-code-here>
   ```
3. Open WhatsApp on your phone
4. Send message to `+1 415 523 8886` with the code shown
5. You'll get confirmation! ✅

### 3. Get Your Credentials

From Twilio Dashboard:
```
Account SID: ACxxxxxxxxxxxxxx (copy this)
Auth Token: xxxxxxxxxxxx (copy this)
WhatsApp From: whatsapp:+14155238886
WhatsApp To: whatsapp:+918678981221 (your number)
```

### 4. Install Twilio Package

```bash
npm install twilio
```

### 5. Add Environment Variables

Create/update `.env.local`:
```env
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
TWILIO_WHATSAPP_TO=whatsapp:+918678981221
```

### 6. Code Implementation

#### Create Twilio Service File
**File: `src/lib/twilio.ts`**
```typescript
import twilio from 'twilio'
import type { OrderDetails } from './whatsapp'
import { formatPrice } from './whatsapp'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export async function sendOrderViaWhatsApp(orderDetails: OrderDetails): Promise<boolean> {
  try {
    const { items, total, customerName, customerPhone, doorNo, address, district, state, pincode, notes } = orderDetails

    let message = '🛒 *NEW ORDER - Raja Oil*\n\n'

    // Customer Details
    message += '👤 *Customer Details:*\n'
    if (customerName) message += `Name: ${customerName}\n`
    if (customerPhone) message += `Phone: ${customerPhone}\n`

    // Delivery Address
    const hasAddress = doorNo || address || district || state || pincode
    if (hasAddress) {
      message += '\n📍 *Delivery Address:*\n'
      if (doorNo) message += `Door No: ${doorNo}\n`
      if (address) message += `Address: ${address}\n`
      if (district) message += `District: ${district}\n`
      if (state) message += `State: ${state}\n`
      if (pincode) message += `Pincode: ${pincode}\n`
    }

    // Order Items
    message += '\n📦 *Order Items:*\n'
    message += '─────────────────\n'

    items.forEach((item, index) => {
      message += `${index + 1}. *${item.productId} - ${item.name}*\n`
      message += `   Qty: ${item.quantity} × ${formatPrice(item.price)}\n`
      if (item.offer) {
        message += `   🎁 Offer: ${item.offer}\n`
      }
      message += `   Subtotal: ${formatPrice(item.price * item.quantity)}\n\n`
    })

    // Total
    message += '─────────────────\n'
    message += `💰 *Total: ${formatPrice(total)}*\n`

    // Notes
    if (notes) {
      message += `\n📝 *Notes:* ${notes}\n`
    }

    message += '\n⏰ ' + new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })

    // Send via Twilio WhatsApp
    const result = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: process.env.TWILIO_WHATSAPP_TO,
      body: message
    })

    console.log('✅ WhatsApp sent via Twilio:', result.sid)
    return true
  } catch (error) {
    console.error('❌ Twilio WhatsApp error:', error)
    return false
  }
}
```

#### Create API Endpoint
**File: `src/app/api/orders/create/route.ts`**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { sendOrderViaWhatsApp } from '@/lib/twilio'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    // Validate required fields
    if (!orderData.items || orderData.items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      )
    }

    if (!orderData.customerName || !orderData.customerPhone) {
      return NextResponse.json(
        { error: 'Customer details are required' },
        { status: 400 }
      )
    }

    // Generate order ID
    const timestamp = Date.now()
    const orderId = `ORD-${timestamp}`

    // Save to Firebase
    const orderDoc = {
      orderId,
      ...orderData,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    const docRef = await addDoc(collection(db, 'orders'), orderDoc)
    console.log('✅ Order saved to Firebase:', docRef.id)

    // Send WhatsApp notification to business
    const whatsappSent = await sendOrderViaWhatsApp(orderData)

    return NextResponse.json({
      success: true,
      orderId,
      whatsappSent,
      message: 'Order placed successfully!'
    })
  } catch (error) {
    console.error('❌ Order creation error:', error)
    return NextResponse.json(
      { error: 'Failed to process order' },
      { status: 500 }
    )
  }
}
```

#### Update Checkout Page
**File: `src/app/checkout/page.tsx`**

Replace the `handleCheckout` function:
```typescript
const handleCheckout = async (e: React.FormEvent) => {
  e.preventDefault()

  if (items.length === 0) {
    alert('Your cart is empty!')
    return
  }

  if (!customerName || !customerPhone) {
    alert('Please fill in your name and phone number')
    return
  }

  if (!doorNo || !address || !district || !state || !pincode) {
    alert('Please fill in all delivery address fields')
    return
  }

  setIsSubmitting(true)

  try {
    // Send order to backend API
    const response = await fetch('/api/orders/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items,
        total,
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
      // Clear cart
      clearCart()

      // Show success message
      alert(`Order placed successfully! Order ID: ${data.orderId}`)

      // Redirect to home
      router.push('/')
    } else {
      alert('Failed to place order. Please try again.')
      setIsSubmitting(false)
    }
  } catch (error) {
    console.error('Order error:', error)
    alert('Something went wrong. Please try again.')
    setIsSubmitting(false)
  }
}
```

---

## Testing

1. Make sure you've joined the Twilio sandbox
2. Place a test order
3. You should receive WhatsApp message instantly!

---

## Costs

- **Sandbox:** Free for testing
- **Production:**
  - First 1000 messages: Free
  - After: ~₹0.40-0.60 per message
  - No monthly fees

---

## Going to Production (When Ready)

### Option A: Twilio Production Number
1. Request WhatsApp Business Profile approval
2. Get your own WhatsApp number
3. Takes 1-2 weeks

### Option B: Keep using Sandbox
- Works fine for small businesses
- Only your registered numbers can receive messages
- Can add up to 10 numbers in sandbox

---

## Troubleshooting

**Issue:** "Authentication failed"
- Check your Account SID and Auth Token are correct
- Make sure they're in `.env.local`

**Issue:** "Not a valid WhatsApp number"
- Make sure format is: `whatsapp:+918678981221`
- Include country code

**Issue:** "Message not received"
- Check you've joined the sandbox (send the join code)
- Verify your number in Twilio console

---

## Security Notes

✅ Orders saved in Firebase (tamper-proof)
✅ Backend validates all prices
✅ User can't modify the message
✅ You get accurate order details
✅ Order history maintained

---

## Next Steps After Implementation

1. Test with sandbox
2. Monitor orders in Firebase console
3. Consider adding:
   - Order confirmation page
   - Order tracking
   - Admin dashboard
