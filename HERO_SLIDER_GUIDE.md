# Hero Slider Setup Guide

This guide explains how to set up and manage the hero image slider on your Raja Oil homepage.

## 📸 Overview

The hero slider displays beautiful images at the top of your homepage with:
- ✅ Automatic slideshow
- ✅ Manual navigation (prev/next buttons)
- ✅ Pagination dots
- ✅ Smooth fade transitions
- ✅ Responsive design (mobile-friendly)
- ✅ Optional text overlays
- ✅ Optional clickable links
- ✅ Uses primary brand color (green)

## 🗄️ Firestore Structure

The slider data is stored in Firestore:

```
rajaoil (collection)
  └── others (document)
        └── homepageSlider (field - array)
              ├── [0] (object)
              │     ├── url: "https://..."
              │     ├── alt: "Image description"
              │     ├── title: "Welcome to Raja Oil" (optional)
              │     ├── description: "Premium quality oils" (optional)
              │     ├── link: "/products" (optional)
              │     └── order: 1 (optional)
              ├── [1] (object)
              │     └── ...
              └── [2] (object)
                    └── ...
```

## 🚀 Quick Setup

### Step 1: Create Firestore Collection & Document

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Firestore Database**
4. Click **Start collection**
5. Collection ID: `rajaoil`
6. Click **Next**
7. Document ID: `others`
8. Click **Save**

### Step 2: Add Slider Images

1. In the `others` document, click **Add field**
2. Field name: `homepageSlider`
3. Type: **array**
4. Click **Add**

### Step 3: Add Image Objects to Array

For each slide, add an object to the array with these fields:

#### Required Fields:
- **url** (string): Image URL (can be Firebase Storage URL or external URL)
- **alt** (string): Image description for accessibility

#### Optional Fields:
- **title** (string): Large heading text overlay
- **description** (string): Subtitle text overlay
- **link** (string): Make the slide clickable (URL to navigate to)
- **order** (number): Display order (lower numbers show first)

## 📝 Example Data Structure

Here's how your Firestore data should look:

```javascript
// Firestore Document: rajaoil/others
{
  homepageSlider: [
    {
      url: "https://example.com/slide1.jpg",
      alt: "Premium Coconut Oil",
      title: "Welcome to Raja Oil",
      description: "Premium Quality Oils for Your Kitchen",
      link: "/products",
      order: 1
    },
    {
      url: "https://example.com/slide2.jpg",
      alt: "Olive Oil Collection",
      title: "100% Pure Olive Oil",
      description: "Imported from the finest olive groves",
      link: "/products/olive-oil",
      order: 2
    },
    {
      url: "https://example.com/slide3.jpg",
      alt: "Special Offers",
      title: "Special Offers This Week",
      description: "Up to 30% off on selected products",
      link: "/specials",
      order: 3
    }
  ]
}
```

## 🎨 Adding Images Step-by-Step (Firebase Console)

### Method 1: Using Firebase Storage URLs

1. **Upload images to Firebase Storage:**
   - Go to **Storage** in Firebase Console
   - Create folder: `images/slider/`
   - Upload your images (recommended size: 1920x800px)

2. **Get the download URL:**
   - Click on the uploaded image
   - Click the copy icon next to **Download URL**

3. **Add to Firestore:**
   - Go to Firestore Database
   - Navigate to `rajaoil` → `others`
   - Click on `homepageSlider` array
   - Click **Add item**
   - Add object with fields:
     ```
     url: [paste the download URL]
     alt: "Description of the image"
     title: "Your Title" (optional)
     description: "Your description" (optional)
     link: "/your-link" (optional)
     order: 1
     ```

### Method 2: Using External URLs

You can also use external image URLs (e.g., from Cloudinary, Imgix, etc.):

```javascript
{
  url: "https://images.unsplash.com/photo-1234567890",
  alt: "Beautiful oil bottle",
  title: "Premium Oils",
  order: 1
}
```

## 🖼️ Image Recommendations

### Size & Format:
- **Recommended size**: 1920x800px (desktop) to 1920x1080px
- **Minimum size**: 1200x600px
- **Format**: JPEG or WebP (for best performance)
- **File size**: Keep under 500KB for fast loading

### Aspect Ratio:
- Desktop: 16:9 or wider (e.g., 2.4:1)
- Mobile: Will crop to fit screen

### Tips:
- Use high-quality images
- Ensure text is readable on images (use images with darker areas or gradients)
- Test on mobile devices
- Compress images before uploading

## ⚙️ Slider Configuration

The slider is configured with these settings (in `HeroSlider.tsx`):

```typescript
{
  effect: "fade",              // Smooth fade transitions
  autoplay: {
    delay: 5000,               // 5 seconds per slide
    disableOnInteraction: false
  },
  pagination: true,            // Show dots
  navigation: true,            // Show prev/next arrows
  loop: true                   // Infinite loop
}
```

### To Customize Settings:

Edit `src/components/home/HeroSlider.tsx` and modify the Swiper props:

```tsx
<Swiper
  autoplay={{
    delay: 3000,  // Change to 3 seconds
  }}
  // ... other props
>
```

## 🎯 Features Explained

### 1. Text Overlays
Add `title` and `description` fields to show text on images:

```javascript
{
  url: "...",
  alt: "...",
  title: "Welcome!",           // Large heading
  description: "Subtitle text" // Smaller text below
}
```

The text will appear centered with:
- White color
- Drop shadow for readability
- Gradient background overlay
- Responsive font sizes

### 2. Clickable Slides
Add a `link` field to make the entire slide clickable:

```javascript
{
  url: "...",
  alt: "...",
  link: "/products/coconut-oil"  // Navigate to this page
}
```

### 3. Slide Ordering
Use the `order` field to control display order:

```javascript
{ url: "...", alt: "...", order: 1 }  // Shows first
{ url: "...", alt: "...", order: 2 }  // Shows second
{ url: "...", alt: "...", order: 3 }  // Shows third
```

## 🔧 Customization

### Change Slider Height

Edit `src/components/home/HeroSlider.tsx`:

```tsx
// Current heights:
// Mobile: 400px
// Tablet: 500px
// Desktop: 600px

// Change to:
<div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px]">
```

### Change Autoplay Speed

```tsx
autoplay={{
  delay: 3000,  // 3 seconds instead of 5
}}
```

### Disable Autoplay

```tsx
// Remove or comment out the autoplay prop
// autoplay={{ ... }}
```

### Change Pagination Style

Edit `src/app/globals.css`:

```css
.hero-swiper .swiper-pagination-bullet-active {
  background: var(--primary);  /* Uses your primary color (green) */
  width: 30px;                 /* Width of active bullet */
}
```

## 📱 Responsive Behavior

The slider automatically adapts to different screen sizes:

- **Desktop (1024px+)**: 600px height, full navigation
- **Tablet (768px-1023px)**: 500px height
- **Mobile (< 768px)**: 400px height, smaller navigation buttons

## 🐛 Troubleshooting

### No Images Showing?

1. **Check Firestore:**
   - Collection exists: `rajaoil`
   - Document exists: `others`
   - Field exists: `homepageSlider`
   - Array has items

2. **Check Image URLs:**
   - URLs are valid and accessible
   - Firebase Storage URLs have proper permissions

3. **Check Console:**
   - Open browser DevTools (F12)
   - Look for errors in Console tab

### Images Not Loading?

1. **Firebase Storage Rules:**
   ```javascript
   // Make sure Storage rules allow public read:
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /images/slider/{fileName} {
         allow read: if true;
       }
     }
   }
   ```

2. **CORS Issues:**
   - External URLs might have CORS restrictions
   - Use Firebase Storage for best results

### Slider Not Auto-Playing?

- Check browser autoplay policies
- Some browsers block autoplay with sound
- Images should autoplay without issues

## 💡 Pro Tips

1. **Use Loading Placeholders:**
   - The slider shows a loading state while fetching data
   - Users see "Loading slider..." instead of blank space

2. **Optimize Images:**
   - Use [TinyPNG](https://tinypng.com/) or [Squoosh](https://squoosh.app/) to compress images
   - Aim for < 300KB per image

3. **Test Different Screen Sizes:**
   - Use browser DevTools responsive mode
   - Test on actual mobile devices

4. **Update Content Regularly:**
   - Change slider images seasonally
   - Promote new products or offers

5. **Use Alt Text:**
   - Important for accessibility (screen readers)
   - Helps with SEO

## 📊 Example Use Cases

### 1. Product Showcase
```javascript
{
  url: "https://...",
  alt: "Premium Coconut Oil",
  title: "100% Pure Coconut Oil",
  description: "Cold-pressed for maximum nutrition",
  link: "/products/coconut-oil"
}
```

### 2. Promotional Banner
```javascript
{
  url: "https://...",
  alt: "Flash Sale",
  title: "Weekend Sale!",
  description: "30% off all products",
  link: "/sale"
}
```

### 3. Brand Story
```javascript
{
  url: "https://...",
  alt: "Our Story",
  title: "Family Tradition Since 1990",
  description: "Bringing quality oils to your kitchen"
}
```

## 🔗 Quick Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `url` | string | Yes | Image URL |
| `alt` | string | Yes | Image description |
| `title` | string | No | Large text overlay |
| `description` | string | No | Subtitle text overlay |
| `link` | string | No | Make slide clickable |
| `order` | number | No | Display order |

## 📚 Related Files

- **Component**: `src/components/home/HeroSlider.tsx`
- **Types**: `src/lib/types/firebase.types.ts`
- **Styles**: `src/app/globals.css`
- **Page**: `src/app/page.tsx`

## 🎉 You're Ready!

Your hero slider is now set up and ready to display beautiful images on your homepage. Add your images to Firestore and watch them come to life!

For more information, see:
- `FIREBASE_SETUP.md` - Firebase integration guide
- `CLAUDE.md` - Project best practices
