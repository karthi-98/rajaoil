# Primary Color Guide for Raja Oil

This guide explains how to use the `primary` color variable throughout your application. The primary color is defined as **green** and can be changed in one place to update throughout the entire app.

## 🎨 Where the Primary Color is Defined

The primary color is defined in `src/app/globals.css`:

```css
:root {
  /* Primary color - Green for Raja Oil brand */
  --primary: oklch(0.55 0.15 145);
  --primary-foreground: oklch(0.985 0 0);
}

.dark {
  /* Primary color - Green for dark mode */
  --primary: oklch(0.65 0.18 145);
  --primary-foreground: oklch(0.985 0 0);
}
```

## 🔧 How to Change the Primary Color

To change the primary color across the entire application, simply update the value in `src/app/globals.css`:

```css
:root {
  /* Change this line to your desired color */
  --primary: oklch(0.55 0.15 145);  /* Current: Green */

  /* Examples of other colors:
   * Blue: oklch(0.55 0.15 250)
   * Red: oklch(0.55 0.15 25)
   * Purple: oklch(0.55 0.15 300)
   * Orange: oklch(0.55 0.15 50)
   */
}
```

The color format is **OKLCH** (Lightness, Chroma, Hue):
- **Lightness**: 0 (black) to 1 (white) - Current: 0.55
- **Chroma**: 0 (gray) to ~0.4 (vivid) - Current: 0.15
- **Hue**: 0-360 degrees - Current: 145 (green)

## 📖 Using Primary Color in Your Code

### In Tailwind Classes

Use these utility classes anywhere in your components:

```tsx
// Text color
<p className="text-primary">This text is green</p>

// Background color
<button className="bg-primary text-white">Click me</button>

// Border color
<div className="border border-primary">Bordered box</div>

// Hover states
<button className="hover:text-primary">Hover me</button>
<button className="hover:bg-primary">Hover me</button>
<button className="hover:border-primary">Hover me</button>
```

### In Custom CSS

If you need to use the primary color in custom CSS:

```css
.custom-element {
  color: var(--primary);
  background-color: var(--primary);
  border-color: var(--primary);
}
```

### In Inline Styles (Not Recommended)

If absolutely necessary:

```tsx
<div style={{ color: 'var(--primary)' }}>
  This text uses primary color
</div>
```

## 🎯 Current Usage Examples

### Header Component

The header uses the primary color for:
- **Selected menu items**: `text-primary`
- **Hover states**: `hover:text-primary`
- **Cart icon hover**: `hover:text-primary`

```tsx
// From Header.tsx
<a
  className={`px-4 py-2 rounded-md text-[14px] font-medium ${
    activeMenu === item.name
      ? 'text-primary'  // ✅ Uses primary color when selected
      : 'text-black hover:text-primary'  // ✅ Uses primary on hover
  }`}
>
  {item.name}
</a>
```

## 🎨 Complete Color System

You have access to these color classes:

| Class | Usage | Example |
|-------|-------|---------|
| `text-primary` | Primary text color (green) | `<p className="text-primary">Text</p>` |
| `bg-primary` | Primary background | `<div className="bg-primary">Box</div>` |
| `border-primary` | Primary border | `<div className="border-primary">Box</div>` |
| `hover:text-primary` | Hover text color | `<a className="hover:text-primary">Link</a>` |
| `hover:bg-primary` | Hover background | `<button className="hover:bg-primary">Button</button>` |
| `hover:border-primary` | Hover border | `<div className="hover:border-primary">Box</div>` |

## 🌈 Common UI Patterns

### Buttons

```tsx
// Primary button
<button className="bg-primary text-white px-4 py-2 rounded hover:opacity-90">
  Primary Button
</button>

// Outline button
<button className="border border-primary text-primary px-4 py-2 rounded hover:bg-primary hover:text-white">
  Outline Button
</button>

// Text button
<button className="text-primary hover:underline">
  Text Button
</button>
```

### Links

```tsx
// Default link
<a href="#" className="text-primary hover:underline">
  Click here
</a>

// Nav link
<a href="#" className="text-black hover:text-primary">
  Navigation Link
</a>
```

### Cards

```tsx
// Card with primary accent
<div className="border border-gray-200 rounded-lg p-4">
  <h3 className="text-primary font-semibold">Card Title</h3>
  <p>Card content</p>
</div>

// Card with primary border on hover
<div className="border border-gray-200 hover:border-primary rounded-lg p-4 transition">
  <p>Hover me</p>
</div>
```

### Badges/Tags

```tsx
// Primary badge
<span className="bg-primary text-white px-2 py-1 rounded-full text-xs">
  New
</span>

// Outline badge
<span className="border border-primary text-primary px-2 py-1 rounded-full text-xs">
  Featured
</span>
```

## ✅ Best Practices

### ✅ DO:
- Use `text-primary`, `bg-primary`, `border-primary` classes
- Use the primary color for:
  - Call-to-action buttons
  - Active/selected states
  - Important links
  - Brand elements
  - Hover states
- Test color changes in both light and dark modes

### ❌ DON'T:
- Don't use hardcoded green colors like `text-green-700`
- Don't mix different shades of green
- Don't overuse the primary color (reserve it for important elements)
- Don't forget to update dark mode color when changing primary

## 🧪 Testing Color Changes

To test different colors:

1. Open `src/app/globals.css`
2. Change the hue value (third number) in the `--primary` variable:
   ```css
   --primary: oklch(0.55 0.15 145);  /* Change 145 to any value 0-360 */
   ```
3. Save the file
4. Check your app to see all primary colors update automatically!

### Quick Color Hue Reference:
- **0-30**: Red
- **30-60**: Orange
- **60-120**: Yellow
- **120-180**: Green (145 is current)
- **180-240**: Cyan/Turquoise
- **240-280**: Blue
- **280-330**: Purple
- **330-360**: Magenta

## 🎯 Examples Throughout the App

Here's where the primary color is currently used:

1. **Header** (`src/components/Header.tsx`)
   - Selected menu items: `text-primary`
   - Menu hover states: `hover:text-primary`
   - Cart icon hover: `hover:text-primary`

2. **Future Usage** (you can add to these):
   - Product "Add to Cart" buttons
   - Category filter active states
   - Product price highlights
   - Promotional banners
   - Icons and illustrations
   - Form focus states

## 💡 Pro Tips

1. **Consistency**: Always use `text-primary` instead of hardcoded colors
2. **Contrast**: Ensure sufficient contrast with backgrounds (test with dark mode)
3. **Accessibility**: Use `text-primary-foreground` for text on primary backgrounds
4. **Testing**: Change the hue to 0 (red) to quickly see all primary color usage

## 📝 Summary

- **Primary color location**: `src/app/globals.css` → `:root` → `--primary`
- **How to use**: Add `text-primary`, `bg-primary`, or `border-primary` classes
- **How to change**: Update the OKLCH values in globals.css
- **Benefit**: One change updates the entire application!

---

**Need help?** Check `src/app/globals.css` for the color definition or refer to this guide for usage examples.
