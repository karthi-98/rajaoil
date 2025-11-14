# Meta Cloud API (WhatsApp Business) - Setup Guide

## Overview

Meta's official WhatsApp Business API is more complex but gives you full control and is free after initial setup.

---

## Pros & Cons

### ✅ Pros
- **Free** after 1000 messages/month
- Official Meta solution
- Full control
- Professional business profile
- No intermediary (Twilio)

### ❌ Cons
- **Complex setup** (2-3 days)
- **Business verification required**
- More code to write
- Webhook setup needed
- More documentation to read

---

## Setup Steps (Complex - 2-3 Days)

### 1. Create Meta Business Account

1. Go to: https://business.facebook.com/
2. Create Business Account
3. Add business details
4. Submit for verification (takes 1-2 days)

### 2. Create Meta App

1. Go to: https://developers.facebook.com/
2. **Create App** → Choose "Business"
3. Add **WhatsApp** product
4. Note your:
   - App ID
   - App Secret
   - WhatsApp Business Account ID

### 3. Add Phone Number

1. In WhatsApp → API Setup
2. Add phone number (need real business number)
3. Verify via SMS
4. Can't use personal WhatsApp number

### 4. Get Permanent Access Token

**This is the complex part:**
1. Create System User in Business Settings
2. Assign WhatsApp permissions
3. Generate permanent access token
4. Store securely

### 5. Set Up Webhook (Required)

You need a public endpoint to receive message status:

**File: `src/app/api/webhooks/whatsapp/route.ts`**
```typescript
import { NextRequest, NextResponse } from 'next/server'

// Webhook verification
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 })
  }

  return NextResponse.json({ error: 'Verification failed' }, { status: 403 })
}

// Receive message status updates
export async function POST(request: NextRequest) {
  const body = await request.json()
  console.log('WhatsApp webhook:', JSON.stringify(body, null, 2))
  return NextResponse.json({ status: 'ok' })
}
```

### 6. Environment Variables

```env
META_WHATSAPP_TOKEN=your_permanent_access_token
META_WHATSAPP_PHONE_ID=your_phone_number_id
META_WHATSAPP_BUSINESS_ID=your_business_account_id
WHATSAPP_VERIFY_TOKEN=your_random_verify_token
```

### 7. Implementation Code

**File: `src/lib/meta-whatsapp.ts`**
```typescript
import type { OrderDetails } from './whatsapp'
import { formatPrice } from './whatsapp'

const META_API_URL = 'https://graph.facebook.com/v18.0'
const PHONE_NUMBER_ID = process.env.META_WHATSAPP_PHONE_ID
const ACCESS_TOKEN = process.env.META_WHATSAPP_TOKEN

export async function sendOrderViaMetaWhatsApp(
  orderDetails: OrderDetails,
  recipientPhone: string // Format: 918678981221 (no + or spaces)
): Promise<boolean> {
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

    // Send via Meta WhatsApp API
    const response = await fetch(`${META_API_URL}/${PHONE_NUMBER_ID}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: recipientPhone, // Format: 918678981221
        type: 'text',
        text: {
          preview_url: false,
          body: message,
        },
      }),
    })

    const data = await response.json()

    if (data.messages?.[0]?.id) {
      console.log('✅ WhatsApp sent via Meta API:', data.messages[0].id)
      return true
    } else {
      console.error('❌ Meta WhatsApp error:', data)
      return false
    }
  } catch (error) {
    console.error('❌ Meta WhatsApp error:', error)
    return false
  }
}
```

### 8. Update API Endpoint

**File: `src/app/api/orders/create/route.ts`**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { sendOrderViaMetaWhatsApp } from '@/lib/meta-whatsapp'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    // Validation...

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

    // Send WhatsApp via Meta API
    const businessPhone = '918678981221' // Your business number (no + or -)
    const whatsappSent = await sendOrderViaMetaWhatsApp(orderData, businessPhone)

    return NextResponse.json({
      success: true,
      orderId,
      whatsappSent,
    })
  } catch (error) {
    console.error('❌ Order error:', error)
    return NextResponse.json(
      { error: 'Failed to process order' },
      { status: 500 }
    )
  }
}
```

---

## Costs

- **First 1000 conversations/month:** Free
- **After 1000:**
  - User-initiated: ₹0.30/conversation
  - Business-initiated: ₹0.50/conversation
- **Templates:** Required for business-initiated messages

---

## Phone Number Requirements

❌ **Cannot use:**
- Personal WhatsApp number
- Number already registered on WhatsApp

✅ **Need:**
- New business phone number
- Must be able to receive SMS for verification

---

## Webhook Deployment

Your webhook endpoint must be:
- Publicly accessible (https)
- Fast response time (<5s)
- Can handle POST requests

**Deploy webhook before activating:**
- Use Vercel, Railway, or Render
- Must have SSL (https)

---

## Testing

1. Deploy webhook first
2. Configure in Meta dashboard
3. Send test message
4. Check Meta API logs

---

## Common Issues

**Issue:** "Access token expired"
- Need to regenerate permanent token
- System user token needed

**Issue:** "Phone number not verified"
- Need real business phone number
- Can't use personal WhatsApp number

**Issue:** "Webhook verification failed"
- Check VERIFY_TOKEN matches
- Ensure webhook is publicly accessible
- Must return challenge exactly as received

---

## When to Choose Meta Over Twilio

Choose Meta if:
- ✅ You have technical expertise
- ✅ High message volume (>1000/month)
- ✅ Want full control
- ✅ Need professional business profile
- ✅ Can wait for verification

Choose Twilio if:
- ✅ Want quick setup
- ✅ Need to test immediately
- ✅ Low to medium message volume
- ✅ Want simple integration
- ✅ Need good support

---

## Recommendation

**For Raja Oil:**

Start with **Twilio** because:
1. Setup in 15 minutes vs 2-3 days
2. Can test immediately with sandbox
3. Simpler code
4. Better documentation
5. Good support

Later migrate to Meta if:
- Message volume grows significantly
- Want to save costs
- Need advanced features
