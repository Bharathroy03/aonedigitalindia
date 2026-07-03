# 🎨 Design System — Aone Digital India

> Complete design token system, component patterns, and visual language guidelines.

---

## 📋 Table of Contents

- [Brand Identity](#brand-identity)
- [Color Palette](#color-palette)
- [Typography](#typography)
- [Spacing System](#spacing-system)
- [Border Radius](#border-radius)
- [Shadows & Effects](#shadows--effects)
- [Glassmorphism](#glassmorphism)
- [Gradients](#gradients)
- [Dark & Light Themes](#dark--light-themes)
- [Responsive Breakpoints](#responsive-breakpoints)
- [Component Tokens](#component-tokens)
- [Icons](#icons)

---

## 🏷️ Brand Identity

| Attribute | Value |
|-----------|-------|
| Brand Name | Aone Digital India |
| Tagline | *Your Trusted Electronics Destination* |
| Primary Color | Deep Electric Blue |
| Accent Color | Vibrant Orange-Gold |
| Feel | Premium · Modern · Trustworthy · Energetic |

---

## 🎨 Color Palette

### Primary Brand Colors

```css
:root {
  /* Primary — Electric Blue */
  --color-brand-50:  #eff6ff;
  --color-brand-100: #dbeafe;
  --color-brand-200: #bfdbfe;
  --color-brand-300: #93c5fd;
  --color-brand-400: #60a5fa;
  --color-brand-500: #3b82f6;
  --color-brand-600: #2563eb;   /* Primary */
  --color-brand-700: #1d4ed8;
  --color-brand-800: #1e40af;
  --color-brand-900: #1e3a8a;
  --color-brand-950: #172554;

  /* Accent — Gold */
  --color-accent-50:  #fffbeb;
  --color-accent-100: #fef3c7;
  --color-accent-200: #fde68a;
  --color-accent-300: #fcd34d;
  --color-accent-400: #fbbf24;
  --color-accent-500: #f59e0b;  /* Accent */
  --color-accent-600: #d97706;
  --color-accent-700: #b45309;
  --color-accent-800: #92400e;
  --color-accent-900: #78350f;

  /* Neutral — Slate */
  --color-neutral-50:  #f8fafc;
  --color-neutral-100: #f1f5f9;
  --color-neutral-200: #e2e8f0;
  --color-neutral-300: #cbd5e1;
  --color-neutral-400: #94a3b8;
  --color-neutral-500: #64748b;
  --color-neutral-600: #475569;
  --color-neutral-700: #334155;
  --color-neutral-800: #1e293b;
  --color-neutral-900: #0f172a;
  --color-neutral-950: #020617;

  /* Semantic Colors */
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error:   #ef4444;
  --color-info:    #3b82f6;
}
```

### Tailwind Config Extension

```ts
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          50:  'var(--color-brand-50)',
          600: 'var(--color-brand-600)',
          900: 'var(--color-brand-900)',
          // ... rest
        },
        accent: {
          500: 'var(--color-accent-500)',
          // ... rest
        },
      },
    },
  },
};
```

---

## ✍️ Typography

### Font Stack

```css
:root {
  --font-display:  'Libre Caslon Text', serif;  /* Headings, subheadings & descriptions */
  --font-body:     'Plus Jakarta Sans', sans-serif; /* Buttons, nav & functional elements */
  --font-mono:     'JetBrains Mono', monospace;
}
```

### Type Scale

| Token | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `text-xs` | 12px | 1.5 | 400 | Labels, captions |
| `text-sm` | 14px | 1.5 | 400 | Small body text |
| `text-base` | 16px | 1.6 | 400 | Body text |
| `text-lg` | 18px | 1.6 | 500 | Large body |
| `text-xl` | 20px | 1.4 | 600 | Sub-headings |
| `text-2xl` | 24px | 1.3 | 700 | Section headings |
| `text-3xl` | 30px | 1.2 | 700 | Page headings |
| `text-4xl` | 36px | 1.2 | 800 | Hero headings |
| `text-5xl` | 48px | 1.1 | 800 | Display text |
| `text-6xl` | 60px | 1.0 | 900 | Hero display |

---

## 📐 Spacing System

Based on 4px base unit:

```css
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;
}
```

### Section Spacing

```css
.section-padding {
  padding-block: var(--space-20);  /* 80px top/bottom */
}

@media (min-width: 768px) {
  .section-padding {
    padding-block: var(--space-24); /* 96px on tablet+ */
  }
}
```

---

## 🔲 Border Radius

```css
:root {
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-2xl:  24px;
  --radius-3xl:  32px;
  --radius-full: 9999px;
}
```

---

## 🌟 Shadows & Effects

```css
:root {
  --shadow-sm:  0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md:  0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg:  0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl:  0 20px 25px -5px rgba(0, 0, 0, 0.1);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  /* Colored glow shadows */
  --shadow-brand: 0 8px 32px rgba(37, 99, 235, 0.3);
  --shadow-accent: 0 8px 32px rgba(245, 158, 11, 0.3);
}
```

---

## 💎 Glassmorphism

```css
/* Light glass card */
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-xl);
}

/* Dark glass card */
.glass-card-dark {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

---

## 🌈 Gradients

```css
:root {
  /* Brand hero gradient */
  --gradient-hero: linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #0ea5e9 100%);

  /* Accent gradient */
  --gradient-accent: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);

  /* Dark overlay */
  --gradient-dark-overlay: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%);

  /* Card shine */
  --gradient-shine: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%);
}
```

---

## 🌓 Dark & Light Themes

```css
/* Light Theme */
[data-theme="light"] {
  --bg-primary:   #ffffff;
  --bg-secondary: #f8fafc;
  --bg-tertiary:  #f1f5f9;
  --text-primary:   #0f172a;
  --text-secondary: #475569;
  --text-muted:     #94a3b8;
  --border-color:   #e2e8f0;
}

/* Dark Theme */
[data-theme="dark"] {
  --bg-primary:   #0f172a;
  --bg-secondary: #1e293b;
  --bg-tertiary:  #334155;
  --text-primary:   #f8fafc;
  --text-secondary: #cbd5e1;
  --text-muted:     #64748b;
  --border-color:   #334155;
}
```

---

## 📱 Responsive Breakpoints

```ts
// tailwind.config.ts
screens: {
  'xs':  '375px',   // Small mobile
  'sm':  '640px',   // Mobile landscape
  'md':  '768px',   // Tablet
  'lg':  '1024px',  // Small desktop
  'xl':  '1280px',  // Desktop
  '2xl': '1536px',  // Large desktop
  '3xl': '1920px',  // Wide screen
}
```

---

> **Last Updated:** 2025
> **Maintained by:** Aone Digital India Design Team
