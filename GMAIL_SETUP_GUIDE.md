# Gmail Email Setup Guide - Complete Instructions

## Overview

Your order system now uses **Gmail with Nodemailer** to send email notifications. This is completely free and uses your own Gmail account.

---

## What You Need

Just **3 things**:

1. **Gmail Account** (your existing Gmail)
2. **App Password** (special password for apps - NOT your regular password)
3. **2 minutes** to set it up

---

## Setup Steps (5 Minutes)

### Step 1: Enable 2-Factor Authentication (2FA)

**Why?** Gmail requires 2FA before you can create App Passwords.

1. Go to: **https://myaccount.google.com/security**
2. Scroll to **"How you sign in to Google"**
3. Click **"2-Step Verification"**
4. Click **"Get Started"** and follow the steps
5. Add your phone number and verify

**Already have 2FA enabled?** Skip to Step 2! ✅

---

### Step 2: Generate App Password

**Important:** This is NOT your regular Gmail password. It's a special 16-character password for apps.

1. Go to: **https://myaccount.google.com/apppasswords**

   (Or: Google Account → Security → 2-Step Verification → App passwords)

2. You might need to sign in again

3. Under "Select app", choose: **Mail**

4. Under "Select device", choose: **Other (Custom name)**

5. Type: **"Raja Oil Website"**

6. Click **"Generate"**

7. You'll see a **16-character password** like: `abcd efgh ijkl mnop`

8. **COPY THIS PASSWORD** - You can't see it again!

---

### Step 3: Add to Environment Variables

1. Open your project folder

2. Create/edit `.env.local` file (in root directory)

3. Add these lines:

```env
# Gmail Configuration
GMAIL_USER=youremail@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
ORDER_NOTIFICATION_EMAIL=youremail@gmail.com
```

**Replace:**
- `youremail@gmail.com` → Your actual Gmail address
- `abcdefghijklmnop` → The 16-char app password (remove spaces)
- `ORDER_NOTIFICATION_EMAIL` → Where to receive orders (can be same Gmail)

**Example:**
```env
GMAIL_USER=rajaoil.business@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
ORDER_NOTIFICATION_EMAIL=rajaoil.business@gmail.com
```

---

### Step 4: Restart Server

```bash
# Stop your dev server (Ctrl+C)
# Start it again
npm run dev
```

---

## Testing

### Test the System:

1. Go to your website: http://localhost:3000
2. Add items to cart
3. Go to checkout
4. Fill in all details
5. Click "Complete Order" button
6. Check your Gmail inbox!

**Expected result:**
- ✅ Success message with Order ID
- ✅ Order saved to Firebase
- ✅ Email arrives in your Gmail inbox

**Check:**
- Inbox for the email
- Spam folder (if not in inbox)
- Firebase Console: `rajaoil/others/orders`

---

## Credentials Summary

### What You Need in `.env.local`:

```env
# 1. Your Gmail address (the account that sends emails)
GMAIL_USER=youremail@gmail.com

# 2. Gmail App Password (16 characters, no spaces)
GMAIL_APP_PASSWORD=abcdefghijklmnop

# 3. Where to receive order notifications (can be same as GMAIL_USER)
ORDER_NOTIFICATION_EMAIL=youremail@gmail.com
```

---

## Important Notes

### About App Password:

❌ **NOT your regular Gmail password**
✅ **Special 16-character password for apps**

### Why App Password?

- More secure than regular password
- Can be revoked without changing main password
- Required by Gmail for third-party apps

### Can I use the same email for both?

✅ **Yes!** You can use:
```env
GMAIL_USER=youremail@gmail.com
ORDER_NOTIFICATION_EMAIL=youremail@gmail.com
```
This means Gmail sends emails TO itself (perfectly fine!)

### Can I send to different email?

✅ **Yes!** You can use:
```env
GMAIL_USER=youremail@gmail.com
ORDER_NOTIFICATION_EMAIL=differentemail@gmail.com
```
Gmail will send from first address to second address.

---

## Troubleshooting

### Problem: "Invalid login: 535-5.7.8 Username and Password not accepted"

**Solution:**
- Check 2FA is enabled on Gmail
- Make sure you're using App Password (not regular password)
- Remove spaces from App Password
- Generate a new App Password

### Problem: "Less secure app access"

**Solution:**
- This error is old - no longer applies
- Make sure you're using App Password
- 2FA must be enabled

### Problem: Emails not arriving

**Solutions:**
1. Check spam/junk folder
2. Check `GMAIL_USER` and `ORDER_NOTIFICATION_EMAIL` are correct
3. Try sending to different email
4. Check console for error messages
5. Verify App Password is correct

### Problem: "Error: Missing credentials"

**Solution:**
- Check `.env.local` exists in root folder
- Check `GMAIL_USER` and `GMAIL_APP_PASSWORD` are set
- Restart dev server after adding variables

### Problem: Can't find App Passwords option

**Solutions:**
1. Make sure 2FA is enabled first
2. Go directly to: https://myaccount.google.com/apppasswords
3. Make sure you're logged into correct Google account
4. Some Google Workspace accounts disable this - use personal Gmail

---

## Gmail Sending Limits

### Daily Limits (Free Gmail):
- **500 emails per day**
- **500 unique recipients per day**

**For Raja Oil:**
- More than enough for 500 orders/day
- Each order = 1 email
- Completely free!

### If you exceed limits:
- Upgrade to Google Workspace (paid)
- Or use multiple Gmail accounts
- But 500/day is usually plenty!

---

## Security Best Practices

### ✅ Do:
- Keep App Password secret
- Add `.env.local` to `.gitignore` (already done)
- Revoke old App Passwords you're not using
- Use separate Gmail for business if possible

### ❌ Don't:
- Share your App Password
- Commit `.env.local` to Git
- Use your regular Gmail password in code
- Share credentials in screenshots

---

## Email Preview

Your Gmail will receive beautiful HTML emails like this:

```
From: Raja Oil Orders <youremail@gmail.com>
To: youremail@gmail.com
Subject: 🛒 New Order #ORD-1731508234567 - Rajesh Kumar

┌─────────────────────────────────────┐
│   🛒 New Order Received!            │
│   Raja Oil                          │
└─────────────────────────────────────┘

Order ID: ORD-1731508234567
13 Nov 2024, 3:15 PM

👤 Customer Details
─────────────────────
Name:     Rajesh Kumar
Phone:    9876543210

📍 Delivery Address
─────────────────────
123, Flat 4B
MG Road, Near City Mall
Bangalore Urban, Karnataka
Pincode: 560011

📦 Order Items
─────────────────────────────────────
TSRG MITHRA BRAND - 200ml jar
Quantity: 2 × ₹4,300
🎁 Offer: 100ML Jar free - Worth 1200/-
Subtotal: ₹8,600

─────────────────────────────────────
Total Amount: ₹8,600
```

---

## Step-by-Step Checklist

- [ ] Gmail account ready
- [ ] 2-Factor Authentication enabled
- [ ] App Password generated
- [ ] Copied 16-character password
- [ ] Added to `.env.local`
- [ ] Removed spaces from password
- [ ] Set correct email addresses
- [ ] Restarted dev server
- [ ] Tested with order
- [ ] Email received successfully

---

## Quick Reference

### Generate App Password:
**URL:** https://myaccount.google.com/apppasswords

### Check 2FA Status:
**URL:** https://myaccount.google.com/security

### Environment Variables:
```env
GMAIL_USER=youremail@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
ORDER_NOTIFICATION_EMAIL=youremail@gmail.com
```

### Restart Server:
```bash
npm run dev
```

---

## FAQs

### Q: Do I need a special Gmail account?
**A:** No, use any Gmail account. Can be personal or business.

### Q: Will this work with Google Workspace?
**A:** Yes! Same process, but check if admin allows App Passwords.

### Q: Is it free?
**A:** Yes! Completely free up to 500 emails/day.

### Q: Can I send to non-Gmail addresses?
**A:** Yes! `ORDER_NOTIFICATION_EMAIL` can be any email.

### Q: What if I lose the App Password?
**A:** Just generate a new one. Old one stops working automatically.

### Q: Can I use multiple Gmail accounts?
**A:** Yes, but not needed. One account can handle 500 orders/day.

### Q: Will emails go to spam?
**A:** Usually no. But check spam folder first time. Mark as "Not Spam".

---

## Production Checklist

Before going live:

- [ ] Gmail App Password generated
- [ ] Environment variables set
- [ ] Test order completed
- [ ] Email received successfully
- [ ] Checked spam folder (marked as not spam)
- [ ] Order saved to Firebase
- [ ] Admin panel ready (optional)

---

## Comparison: Gmail vs Paid Services

| Feature | Gmail (Free) | Resend (Paid) | Twilio (Paid) |
|---------|-------------|---------------|---------------|
| Cost | Free | $20/mo | $15/mo |
| Emails/day | 500 | 3000 | Varies |
| Setup time | 5 mins | 5 mins | 15 mins |
| Reliability | High | High | High |
| Custom domain | No | Yes | Yes |

**For Raja Oil:** Gmail is perfect! Free and reliable. ✅

---

## Support

### Gmail Help:
- 2FA Setup: https://support.google.com/accounts/answer/185839
- App Passwords: https://support.google.com/accounts/answer/185833

### If Stuck:
1. Check troubleshooting section above
2. Verify all credentials are correct
3. Check console for specific error messages
4. Try generating new App Password

---

## Summary

### What You Need:
1. ✅ Gmail account
2. ✅ Enable 2FA
3. ✅ Generate App Password
4. ✅ Add to `.env.local`

### What You Get:
- ✅ Free email notifications
- ✅ 500 emails/day limit
- ✅ Professional HTML emails
- ✅ Secure order storage
- ✅ Complete order history

**Setup time: 5 minutes** ⏱️
**Cost: Free** 💰
**Reliable: Yes** ✅

Your order system is ready to use! 🎉
