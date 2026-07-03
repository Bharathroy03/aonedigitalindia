# 📏 Coding Standards — Aone Digital India

> Code style, conventions, and quality rules enforced across the entire codebase.

---

## 📋 Table of Contents

- [General Principles](#general-principles)
- [TypeScript](#typescript)
- [React & Next.js](#react--nextjs)
- [File Organization](#file-organization)
- [Import Order](#import-order)
- [Naming Conventions](#naming-conventions)
- [Comments & Documentation](#comments--documentation)
- [Error Handling](#error-handling)
- [Performance Rules](#performance-rules)
- [Git Conventions](#git-conventions)

---

## 🎯 General Principles

1. **Readability over Cleverness** — Code is read 10x more than it's written
2. **Explicit over Implicit** — Never assume the reader knows your intent
3. **DRY (Don't Repeat Yourself)** — Abstract after the third repetition
4. **SOLID Principles** — Single responsibility, open/closed, etc.
5. **Fail Fast** — Validate inputs early, handle errors immediately

---

## 🔷 TypeScript

### Use Strict Mode

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### Prefer `interface` over `type` for Objects

```ts
// ✅ Preferred for objects
interface Brand {
  id: string;
  name: string;
  logo: string;
  slug: string;
}

// ✅ Use type for unions, intersections, primitives
type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ID = string | number;
```

### Avoid `any` — Use `unknown` Instead

```ts
// ❌ Never
function process(data: any) {}

// ✅ Correct
function process(data: unknown) {
  if (typeof data === 'string') { /* ... */ }
}
```

### Enum Usage

```ts
// ✅ Use const enums for performance
export const enum Theme {
  Light = 'light',
  Dark = 'dark',
}
```

---

## ⚛️ React & Next.js

### Functional Components Only

```tsx
// ✅ Always use functional components
const MyComponent: FC<Props> = ({ title }) => {
  return <h1>{title}</h1>;
};

// ❌ Never use class components
class MyComponent extends React.Component { ... }
```

### Avoid Prop Drilling > 2 Levels

Use Context, Zustand, or composition instead.

### Use `'use client'` Only When Necessary

```tsx
// Only add this when you need:
// - useState, useEffect, useRef
// - Browser APIs
// - Event listeners
'use client';

const InteractiveComponent = () => { ... };
```

### Server Components by Default

Keep components as Server Components (no `'use client'`) whenever possible for performance.

### Image Optimization

```tsx
// ✅ Always use Next.js Image component
import Image from 'next/image';

<Image
  src="/brands/samsung.webp"
  alt="Samsung Logo"
  width={200}
  height={100}
  priority={isAboveFold}
/>

// ❌ Never use raw <img> tags for content images
<img src="..." />
```

---

## 📁 File Organization

```
# Keep related files close together
components/
└── brands/
    ├── BrandsSection.tsx    # Main export
    ├── BrandCard.tsx        # Sub-component
    ├── BrandCard.test.tsx   # Tests
    └── README.md            # Documentation
```

---

## 📦 Import Order

Enforce with ESLint `import/order` rule:

```tsx
// 1. Node built-ins
import path from 'path';

// 2. React & framework
import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 3. Third-party libraries
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

// 4. Internal aliases (@/)
import { Button } from '@/components/ui/Button';
import { useBrands } from '@/hooks/useBrands';
import type { Brand } from '@/types/brand.types';

// 5. Relative imports
import BrandCard from './BrandCard';

// 6. Assets
import brandImage from '@/public/images/brand.png';

// 7. Styles
import styles from './brands.module.css';
```

---

## 🏷️ Naming Conventions

| Entity | Convention | Example |
|--------|-----------|---------|
| Component | PascalCase | `BrandCard`, `HeroSection` |
| Hook | camelCase + `use` | `useScrollPosition` |
| Utility | camelCase | `formatPhoneNumber` |
| Constant | SCREAMING_SNAKE_CASE | `MAX_ITEMS`, `API_BASE_URL` |
| Type/Interface | PascalCase | `BrandProps`, `OfferItem` |
| CSS class | kebab-case | `hero-section`, `brand-card` |
| File | Same as main export | `BrandCard.tsx` |
| Event handler | `handle` prefix | `handleSubmit`, `handleClose` |
| Boolean vars | `is/has/can` prefix | `isLoading`, `hasError` |

---

## 💬 Comments & Documentation

### When to Comment

```tsx
// ✅ Comment WHY, not WHAT
// Delay is needed to allow animation to complete before redirect
setTimeout(() => router.push('/'), 600);

// ❌ Do not comment obvious code
// Increment count by 1
count++;
```

### JSDoc for Exported Functions

```ts
/**
 * Formats a phone number to Indian standard format.
 * @param phone - Raw phone number string
 * @returns Formatted string: +91 XXXXX XXXXX
 * @example formatPhone('9876543210') // '+91 98765 43210'
 */
export function formatPhone(phone: string): string { ... }
```

---

## ⚠️ Error Handling

```tsx
// ✅ Always handle async errors
const fetchBrands = async () => {
  try {
    const data = await getBrands();
    return data;
  } catch (error) {
    console.error('[fetchBrands]', error);
    throw new Error('Failed to fetch brands');
  }
};

// ✅ Use Error Boundaries for UI errors
// See: components/ui/ErrorBoundary.tsx
```

---

## 🚀 Performance Rules

1. **Lazy load** non-critical components with `dynamic()`
2. **Memoize** expensive computations with `useMemo`
3. **Memoize** callbacks with `useCallback`
4. **Virtualize** long lists with `react-virtual`
5. **Use `loading="lazy"`** on below-fold images
6. **Avoid unnecessary re-renders** — check with React DevTools

---

## 🗂️ Git Conventions

### Commit Message Format (Conventional Commits)

```
type(scope): short description

[optional body]
[optional footer]
```

**Types:**
- `feat` — New feature
- `fix` — Bug fix
- `docs` — Documentation only
- `style` — Formatting, no logic change
- `refactor` — Code restructure
- `perf` — Performance improvement
- `test` — Adding/updating tests
- `chore` — Build process, dependency updates

**Examples:**

```bash
feat(navbar): add mobile hamburger menu
fix(contact-form): resolve email validation error
docs(readme): update installation steps
style(hero): apply consistent spacing tokens
perf(images): convert PNGs to WebP format
```

### Branch Naming

```
feature/navbar-mobile-menu
fix/contact-form-validation
docs/update-readme
```

---

> **Last Updated:** 2025
> **Maintained by:** Aone Digital India Development Team
