# Gmail Credentials - Quick Reference

## What You Need (3 Things)

### 1. GMAIL_USER
**What:** Your Gmail email address
**Example:** `rajaoil.business@gmail.com`
**Where to get:** Your existing Gmail account

### 2. GMAIL_APP_PASSWORD
**What:** A special 16-character password for apps (NOT your regular password)
**Example:** `abcdefghijklmnop`
**Where to get:** https://myaccount.google.com/apppasswords
**Format:** 16 characters, no spaces

### 3. ORDER_NOTIFICATION_EMAIL
**What:** Where to receive order notifications
**Example:** `rajaoil.business@gmail.com`
**Note:** Can be the same as GMAIL_USER

---

## How to Get App Password (5 Minutes)

### Step 1: Enable 2-Factor Authentication
1. Go to: https://myaccount.google.com/security
2. Find "2-Step Verification"
3. Click "Get Started"
4. Follow the setup (add phone number)

**Already have 2FA?** ✅ Skip to Step 2!

### Step 2: Generate App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Sign in if prompted
3. Select app: **Mail**
4. Select device: **Other (Custom name)**
5. Type: **Raja Oil Website**
6. Click **Generate**
7. **Copy the 16-character password** (you won't see it again!)

### Step 3: Add to .env.local
```env
GMAIL_USER=youremail@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
ORDER_NOTIFICATION_EMAIL=youremail@gmail.com
```

---

## Complete .env.local Template

```env
# Firebase Configuration (you already have these)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Gmail Configuration (NEW - Add these)
GMAIL_USER=youremail@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
ORDER_NOTIFICATION_EMAIL=youremail@gmail.com
```

---

## Important Notes

### ❌ Common Mistakes:
- Using regular Gmail password (won't work!)
- Forgetting to enable 2FA first
- Adding spaces in App Password
- Committing .env.local to Git

### ✅ Correct:
- Use App Password (16 characters)
- Enable 2FA before generating
- Remove all spaces from password
- Keep .env.local private

### App Password Format:
```
❌ Wrong: abcd efgh ijkl mnop (has spaces)
✅ Right: abcdefghijklmnop (no spaces)
```

---

## Troubleshooting

### "Can't find App Passwords option"
→ Enable 2FA first, then try again

### "Invalid credentials" error
→ Check you're using App Password, not regular password
→ Make sure no spaces in the password
→ Generate a new App Password

### "Less secure app" error
→ This error is outdated
→ Use App Password instead

---

## Quick Test

After adding credentials:

```bash
# Restart server
npm run dev

# Place test order on website
# Check your Gmail inbox!
```

---

## Security

- ✅ App Password is safer than regular password
- ✅ Can be revoked without changing Gmail password
- ✅ Only works for this specific app
- ✅ Gmail will notify you when it's used

---

## Summary

**What you need:**
1. Gmail email address → `GMAIL_USER`
2. Gmail App Password (16 chars) → `GMAIL_APP_PASSWORD`
3. Where to receive orders → `ORDER_NOTIFICATION_EMAIL`

**Total setup time:** 5 minutes
**Cost:** FREE (500 emails/day)

**Full guide:** See `GMAIL_SETUP_GUIDE.md`
