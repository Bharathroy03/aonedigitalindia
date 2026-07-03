# ♿ Accessibility Guide — Aone Digital India

> WCAG 2.1 AA compliance standards and implementation guidelines.

---

## 📋 Table of Contents

- [Why Accessibility Matters](#why-accessibility-matters)
- [WCAG 2.1 Principles](#wcag-21-principles)
- [Color Contrast](#color-contrast)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Readers](#screen-readers)
- [Images & Media](#images--media)
- [Forms](#forms)
- [Focus Management](#focus-management)
- [Testing Checklist](#testing-checklist)
- [Tools](#tools)

---

## 🌍 Why Accessibility Matters

1. **Legal** — Web accessibility laws apply in India (RPWD Act 2016)
2. **Reach** — ~15% of the global population has a disability
3. **SEO** — Accessible sites rank better (semantic HTML, alt text)
4. **UX** — Good accessibility = good UX for everyone

**Target:** WCAG 2.1 Level AA compliance

---

## 📐 WCAG 2.1 Principles

| Principle | Meaning |
|-----------|---------|
| **Perceivable** | Information must be presentable in ways users can perceive |
| **Operable** | Interface must be operable by keyboard and assistive tech |
| **Understandable** | Content and UI must be understandable |
| **Robust** | Content must work with current and future assistive tech |

---

## 🎨 Color Contrast

### Minimum Ratios (WCAG AA)

| Context | Ratio |
|---------|-------|
| Normal text (< 18pt) | **4.5:1** |
| Large text (≥ 18pt / 14pt bold) | **3:1** |
| UI components, graphics | **3:1** |

### Our Brand Color Compliance

```
Brand Blue #2563eb on White #ffffff  → Ratio: 5.1:1 ✅
Brand Blue #2563eb on Dark #0f172a  → Ratio: 6.8:1 ✅
Accent Gold #f59e0b on Dark #0f172a → Ratio: 8.5:1 ✅
```

> ⚠️ **Never use** light gray text on white — fails WCAG.

---

## ⌨️ Keyboard Navigation

All interactive elements must be reachable and operable by keyboard:

```tsx
// ✅ Custom interactive element — always add role and handlers
<div
  role="button"
  tabIndex={0}
  aria-label="Open brand details"
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') handleClick();
  }}
>
  View Brand
</div>

// ✅ Better — use native HTML elements when possible
<button
  type="button"
  onClick={handleClick}
  aria-label="Open brand details"
>
  View Brand
</button>
```

### Focus Order

- Must follow logical reading order (top-to-bottom, left-to-right)
- Skip navigation link must be first focusable element

```tsx
// Skip link (add to top of layout)
<a href="#main-content" className="skip-link">
  Skip to main content
</a>
```

### Custom CSS for Focus Styles

```css
/* Never remove focus outline — style it instead */
:focus-visible {
  outline: 2px solid var(--color-brand-600);
  outline-offset: 3px;
  border-radius: 4px;
}
```

---

## 🔊 Screen Readers

### ARIA Attributes Reference

```tsx
// Landmark roles
<header role="banner">
<nav role="navigation" aria-label="Main navigation">
<main role="main" id="main-content">
<footer role="contentinfo">

// Live regions for dynamic updates
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>

// Loading states
<button aria-busy={isLoading} disabled={isLoading}>
  {isLoading ? 'Sending...' : 'Submit'}
</button>

// Icon buttons — always label
<button aria-label="Open WhatsApp chat">
  <WhatsAppIcon aria-hidden="true" />
</button>

// Expanded/collapsed states
<button aria-expanded={isOpen} aria-controls="menu-id">
  Menu
</button>
<nav id="menu-id" hidden={!isOpen}>...</nav>
```

---

## 🖼️ Images & Media

```tsx
// ✅ Meaningful images — describe the content
<Image
  src="/store-front.jpg"
  alt="Aone Digital India store exterior at MG Road, showing Samsung and Apple product displays"
/>

// ✅ Decorative images — hide from screen readers
<Image
  src="/decoration.svg"
  alt=""
  aria-hidden="true"
/>

// ✅ Brand logos
<Image
  src="/brands/samsung.png"
  alt="Samsung logo"
/>

// ✅ Videos — provide captions
<video controls>
  <source src="/promo.mp4" type="video/mp4" />
  <track kind="captions" src="/captions.vtt" srclang="en" label="English" />
</video>
```

---

## 📝 Forms

```tsx
// ✅ Always associate labels with inputs
<div>
  <label htmlFor="name">
    Full Name <span aria-label="required">*</span>
  </label>
  <input
    id="name"
    type="text"
    name="name"
    required
    aria-required="true"
    aria-describedby="name-error"
    autoComplete="name"
  />
  {errors.name && (
    <p id="name-error" role="alert" className="text-error">
      {errors.name.message}
    </p>
  )}
</div>
```

### Form Error Announcements

```tsx
// Announce validation errors to screen readers
<div role="alert" aria-live="assertive">
  {formError && <p>{formError}</p>}
</div>
```

---

## 🎯 Focus Management

```tsx
// After modal opens — move focus to first interactive element
useEffect(() => {
  if (isOpen) {
    firstFocusableRef.current?.focus();
  }
}, [isOpen]);

// After modal closes — return focus to trigger
useEffect(() => {
  if (!isOpen) {
    triggerRef.current?.focus();
  }
}, [isOpen]);

// Trap focus inside modal
// Use: @radix-ui/react-focus-trap or custom hook
```

---

## ✅ Testing Checklist

### Automated Tests

- [ ] Run axe-core in Jest tests
- [ ] Lighthouse Accessibility score > 95
- [ ] ESLint jsx-a11y plugin passes

### Manual Tests

- [ ] Tab through entire page — all elements reachable
- [ ] Enter/Space activate all buttons
- [ ] Escape closes all modals and menus
- [ ] Screen reader test (NVDA/JAWS on Windows, VoiceOver on Mac)
- [ ] Zoom to 200% — layout still usable
- [ ] High contrast mode — content still visible
- [ ] Forms work without mouse

---

## 🛠️ Tools

| Tool | Use |
|------|-----|
| axe DevTools (Chrome) | Automated accessibility audit |
| Lighthouse | Comprehensive audit |
| NVDA | Free screen reader (Windows) |
| VoiceOver | Built-in screen reader (Mac/iOS) |
| TalkBack | Screen reader (Android) |
| Color Contrast Analyzer | Check color ratios |
| WAVE | Visual accessibility feedback |

---

> **Last Updated:** 2025
> **Maintained by:** Aone Digital India Development Team
