# Hero Slider Troubleshooting Guide

## 🔍 Images Not Showing? Follow These Steps

### Step 1: Check Browser Console

Open your browser console (F12 → Console tab) and look for these messages:

```
🔥 Firestore Data: { homepageSlider: [...] }
✅ Homepage Slider Data: [...]
📸 Number of slides: 6
🖼️ Rendering slide with URL: https://...
```

**If you see:**
- ✅ Green checkmarks = Images loaded successfully
- ❌ Red X marks = Images failed to load (Storage permissions issue)

### Step 2: Fix Firebase Storage Security Rules

This is the **most common issue**. Your Firebase Storage doesn't allow public access to images.

#### Solution:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click **Storage** in the left menu
4. Click the **Rules** tab
5. Replace the existing rules with this:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow public read access to all files
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

**OR** if you want to restrict to only images folder:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow public read for images folder
    match /images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Default: Deny all other access
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

6. Click **Publish**
7. Wait 30 seconds for rules to propagate
8. Refresh your website

### Step 3: Verify Your Firestore Data Structure

Your Firestore should look exactly like this:

```
Collection: rajaoil
  └── Document: others
        └── Field: homepageSlider (array)
              └── [0] (map/object)
                    ├── url: "https://firebasestorage.googleapis.com/..."
                    ├── alt: "Image description"
                    ├── title: "Optional title"
                    ├── description: "Optional description"
                    ├── link: "/optional-link"
                    └── order: 0
```

**Important:**
- Collection name: `rajaoil` (lowercase, exact match)
- Document ID: `others` (lowercase, exact match)
- Field name: `homepageSlider` (camelCase, exact match)
- Field type: **array** (not string, not map)

### Step 4: Check Your Data in Firestore

1. Go to Firebase Console → Firestore Database
2. Find collection: `rajaoil`
3. Open document: `others`
4. Find field: `homepageSlider`
5. Verify it's an **array** with objects inside

Each object should have:
- `url` (string) - Required
- `alt` (string) - Required
- `title` (string) - Optional
- `description` (string) - Optional
- `link` (string) - Optional
- `order` (number) - Optional

### Step 5: Test Individual Image URLs

Open one of your Firebase Storage URLs directly in a new browser tab:

```
https://firebasestorage.googleapis.com/v0/b/common-76672.firebasestorage.app/o/rajaoil%2F1762317808279_kzfol_WhatsApp%20Image%202025-10-31%20at%202012-57.28%20PM.jpeg?alt=media&token=f88e63a-9ee6-4288-ab55-e43ef0de5873
```

**If you see:**
- ✅ Image loads = Storage rules are correct
- ❌ "403 Forbidden" or "Permission denied" = Storage rules need to be fixed (see Step 2)

### Step 6: Check Network Tab

1. Open Browser DevTools (F12)
2. Go to **Network** tab
3. Refresh your page
4. Look for image requests (filter by "img")
5. Check the status codes:
   - **200** = Success ✅
   - **403** = Permission denied (fix Storage rules) ❌
   - **404** = File not found (check URL) ❌
   - **CORS error** = CORS configuration needed ❌

### Step 7: Verify Environment Variables

Make sure your `.env.local` file has correct Firebase credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

After updating, **restart your dev server**:
```bash
npm run dev
```

## 🔧 Common Issues & Solutions

### Issue 1: "403 Forbidden" Error

**Cause:** Firebase Storage security rules don't allow public read access

**Solution:** Update Storage rules (see Step 2)

### Issue 2: No Images Showing (Blank Slider)

**Causes:**
1. Firestore data structure is wrong
2. Collection/document/field names don't match
3. Field is not an array
4. Array is empty

**Solution:**
- Check Firestore structure (see Step 3)
- Verify exact naming: `rajaoil` → `others` → `homepageSlider`

### Issue 3: Console Shows "Loading slider..."

**Cause:** Component is stuck in loading state

**Solution:**
- Check browser console for errors
- Verify Firebase is initialized correctly
- Check `.env.local` file
- Restart dev server

### Issue 4: Images in Firestore but Not Rendering

**Cause:** Data structure doesn't match expected format

**Solution:**
Check console logs for:
```
🔥 Firestore Data: undefined or null
```

If undefined, your data isn't being fetched. Check:
1. Collection name: `rajaoil`
2. Document ID: `others`
3. Firebase is connected

### Issue 5: CORS Error

**Error Message:**
```
Access to fetch at '...' from origin '...' has been blocked by CORS policy
```

**Solution:**
This shouldn't happen with Firebase Storage, but if it does:

1. Go to Firebase Console → Storage → Settings
2. CORS should be configured automatically
3. If not, contact Firebase support

## 📝 Debug Checklist

Use this checklist to debug:

- [ ] ✅ Opened browser console (F12)
- [ ] ✅ See "🔥 Firestore Data" logs
- [ ] ✅ See "📸 Number of slides" > 0
- [ ] ✅ Firebase Storage rules allow public read
- [ ] ✅ Firestore structure is correct (rajaoil → others → homepageSlider)
- [ ] ✅ homepageSlider is an array (not string)
- [ ] ✅ Each object has `url` and `alt` fields
- [ ] ✅ Image URLs are accessible (test in new tab)
- [ ] ✅ No 403 errors in Network tab
- [ ] ✅ Environment variables are set
- [ ] ✅ Dev server restarted after changes

## 🎯 Quick Fix Summary

**Most Common Fix (90% of cases):**

1. **Update Firebase Storage Rules:**
   ```javascript
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /{allPaths=**} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```

2. **Publish Rules**
3. **Wait 30 seconds**
4. **Refresh page**

## 💡 Still Not Working?

If images still don't show after following all steps:

1. **Check Console Logs:**
   - Share the console output with me
   - Look for any errors

2. **Verify Firestore Data:**
   - Take a screenshot of your Firestore document
   - Ensure exact structure matches

3. **Test Individual Components:**
   - Does Firestore data load? (check console)
   - Do image URLs work when opened directly?
   - Are there any console errors?

## 📊 Expected Console Output (Success)

When everything works, you should see:

```
🔥 Firestore Data: { homepageSlider: Array(6) }
📊 Loading: false
❌ Error: null
✅ Homepage Slider Data: Array(6)
📸 Number of slides: 6
🎯 Sorted slides: Array(6)
🖼️ Rendering slide with URL: https://firebasestorage...
✅ Image loaded: https://firebasestorage...
🖼️ Rendering slide with URL: https://firebasestorage...
✅ Image loaded: https://firebasestorage...
```

## 🚀 Test Data

If you want to test with placeholder images first, use this data structure in Firestore:

```json
{
  "homepageSlider": [
    {
      "url": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920",
      "alt": "Test image 1",
      "title": "Test Slide 1",
      "order": 1
    },
    {
      "url": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1920",
      "alt": "Test image 2",
      "title": "Test Slide 2",
      "order": 2
    }
  ]
}
```

These Unsplash URLs should work immediately without Storage rules.

---

**Need More Help?**

Share with me:
1. Console output (all logs)
2. Screenshot of Firestore structure
3. Any error messages

I'll help you debug further!
