# WhatsApp Checkout Integration Guide

## Overview

This e-commerce site uses WhatsApp as the checkout/ordering system. When customers complete the checkout form, their order details are automatically formatted and sent to your WhatsApp number.

## Configuration

### WhatsApp Number
The WhatsApp number is configured in `src/lib/whatsapp.ts`:

```typescript
const WHATSAPP_NUMBER = '918678981221' // India country code + number
```

**Format**: Country code (91 for India) + phone number (without spaces or special characters)

To change the number, edit line 3 in `src/lib/whatsapp.ts`.

## How It Works

### 1. User Flow
1. User adds items to cart
2. Clicks "Proceed to Checkout" in cart sidebar
3. Navigates to `/checkout` page
4. Fills out customer details form:
   - **Name** (required)
   - **Phone** (required)
   - **Address** (optional)
   - **Order Notes** (optional)
5. Clicks "Complete Order on WhatsApp"
6. WhatsApp opens with pre-filled message
7. User sends message to complete order
8. Cart is cleared automatically

### 2. Message Format

The WhatsApp message is automatically formatted with:

```
🛒 *New Order from Raja Oil*

👤 *Customer:* John Doe
📱 *Phone:* +1234567890
📍 *Address:* 123 Main St, City, State

📦 *Order Items:*
─────────────────
1. *Premium Coconut Oil*
   Qty: 2 × $24.99
   Subtotal: $49.98

2. *Extra Virgin Olive Oil*
   Qty: 1 × $34.99
   Subtotal: $34.99

─────────────────
💰 *Total Amount:* $84.97

📝 *Notes:* Please deliver before 5 PM

_Thank you for your order!_ 🙏
```

### 3. Technical Implementation

#### Files Structure:
```
src/
├── lib/
│   └── whatsapp.ts          # WhatsApp helper functions
├── app/
│   └── checkout/
│       └── page.tsx         # Checkout page
└── components/
    └── cart/
        └── CartSidebar.tsx  # Updated with checkout link
```

#### Key Functions (`src/lib/whatsapp.ts`):

**1. `formatPrice(price: number)`**
- Formats numbers to USD currency format
- Example: `formatPrice(24.99)` → "$24.99"

**2. `generateWhatsAppMessage(orderDetails)`**
- Creates formatted message with emojis and structure
- Includes all customer and order details

**3. `isMobileDevice()`**
- Detects if user is on mobile or desktop
- Returns `true` for mobile devices

**4. `generateWhatsAppURL(orderDetails)`**
- Creates appropriate WhatsApp URL based on device
- Mobile: `https://wa.me/918678981221?text=...`
- Desktop: `https://web.whatsapp.com/send?phone=918678981221&text=...`

**5. `sendOrderToWhatsApp(orderDetails)`**
- Main function to open WhatsApp with order
- Opens in new tab/window

## Checkout Page Features

### Customer Form Fields

**Required Fields:**
- Full Name
- Phone Number

**Optional Fields:**
- Delivery Address (textarea)
- Order Notes (textarea)

### Order Summary Section
- Product images
- Product names
- Prices
- Quantities
- Subtotals
- Remove item buttons
- Grand total

### UX Features
- ✅ Form validation (required fields)
- ✅ Loading state when submitting
- ✅ Auto-redirect if cart is empty
- ✅ Cart cleared after successful submission
- ✅ Responsive design (mobile & desktop)
- ✅ WhatsApp icon and branding
- ✅ "Continue Shopping" link

## Customization

### 1. Change WhatsApp Number
Edit `src/lib/whatsapp.ts`:
```typescript
const WHATSAPP_NUMBER = '918678981221' // Your number here
```

### 2. Modify Message Format
Edit the `generateWhatsAppMessage()` function in `src/lib/whatsapp.ts`:
```typescript
let message = '🛒 *New Order from Raja Oil*\n\n' // Customize header
```

### 3. Add More Form Fields
Add new state and input in `src/app/checkout/page.tsx`:
```typescript
const [customField, setCustomField] = useState('')

// In JSX:
<input
  value={customField}
  onChange={(e) => setCustomField(e.target.value)}
/>
```

### 4. Change Button Colors
Edit button className in checkout page:
```typescript
className="w-full bg-green-600 hover:bg-green-700..." // Change colors
```

### 5. Add Currency Support
Modify `formatPrice()` in `src/lib/whatsapp.ts`:
```typescript
export function formatPrice(price: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency, // Pass currency parameter
  }).format(price)
}
```

## Testing

### Test Locally:
1. Add items to cart
2. Go to checkout: `http://localhost:3000/checkout`
3. Fill out form
4. Click "Complete Order on WhatsApp"
5. Verify message format and content
6. **Note**: WhatsApp will open but won't send automatically - this is expected behavior

### Test on Production:
1. Deploy to production
2. Test on both mobile and desktop
3. Verify WhatsApp opens correctly on mobile app vs web
4. Check message formatting

## Mobile vs Desktop Behavior

### Mobile (Android/iOS):
- Opens WhatsApp mobile app
- URL: `https://wa.me/918678981221?text=...`
- Better user experience on mobile devices

### Desktop (Windows/Mac):
- Opens WhatsApp Web
- URL: `https://web.whatsapp.com/send?phone=918678981221&text=...`
- Requires WhatsApp Web to be logged in

## Security & Privacy

### Customer Data:
- ✅ No customer data stored in database
- ✅ Order sent directly via WhatsApp
- ✅ Cart stored only in browser localStorage
- ✅ No server-side storage

### Best Practices:
- Don't log sensitive customer information
- Use HTTPS in production
- Validate phone numbers before sending
- Sanitize text inputs to prevent injection

## Troubleshooting

### Issue: WhatsApp doesn't open
**Solutions:**
1. Check WhatsApp number format (country code + number)
2. Verify WhatsApp is installed (mobile) or logged in (desktop)
3. Check browser popup blockers
4. Test URL manually

### Issue: Message text is garbled
**Solutions:**
1. Check URL encoding in `generateWhatsAppURL()`
2. Verify special characters are properly encoded
3. Test with simple message first

### Issue: Cart empty after checkout
**This is expected behavior** - cart is cleared after order is sent. To keep cart:
```typescript
// Comment out this line in checkout page:
// clearCart()
```

### Issue: Form validation not working
**Solutions:**
1. Check `required` attribute on inputs
2. Verify form `onSubmit` handler
3. Check browser console for errors

## Analytics & Tracking

To track checkout conversions, add analytics in checkout page:

```typescript
const handleCheckout = (e: React.FormEvent) => {
  e.preventDefault()

  // Add analytics tracking
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'begin_checkout', {
      value: total,
      items: items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
      }))
    })
  }

  sendOrderToWhatsApp({ ... })
}
```

## Future Enhancements

Potential improvements:
- [ ] Email confirmation to customer
- [ ] Order number generation
- [ ] Save order history (requires backend)
- [ ] Payment gateway integration
- [ ] SMS notifications
- [ ] Multi-language support
- [ ] Order tracking
- [ ] Discount codes
- [ ] Shipping calculator

## Support

For issues or questions:
1. Check browser console for errors
2. Verify WhatsApp number is correct
3. Test message format manually
4. Review code in `src/lib/whatsapp.ts`

## API Reference

### `OrderDetails` Interface
```typescript
interface OrderDetails {
  items: CartItem[]          // Array of cart items
  total: number             // Order total
  customerName?: string     // Customer's name
  customerPhone?: string    // Customer's phone
  customerAddress?: string  // Delivery address
  notes?: string           // Special instructions
}
```

### `sendOrderToWhatsApp(orderDetails: OrderDetails): void`
Main function to send order. Opens WhatsApp with pre-filled message.

**Example:**
```typescript
import { sendOrderToWhatsApp } from '@/lib/whatsapp'

sendOrderToWhatsApp({
  items: cartItems,
  total: 84.97,
  customerName: 'John Doe',
  customerPhone: '+1234567890',
  customerAddress: '123 Main St',
  notes: 'Deliver before 5 PM'
})
```

---

**Last Updated**: 2025-11-07
**WhatsApp Number**: +91 8678981221
**Version**: 1.0
