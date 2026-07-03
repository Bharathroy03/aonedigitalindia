# 🧩 Component Guidelines — Aone Digital India

> Standards and best practices for creating, organizing, and documenting React components.

---

## 📋 Table of Contents

- [Component Philosophy](#component-philosophy)
- [File Naming Conventions](#file-naming-conventions)
- [Component Structure](#component-structure)
- [TypeScript Props](#typescript-props)
- [Styling Guidelines](#styling-guidelines)
- [Animation Standards](#animation-standards)
- [Accessibility](#accessibility)
- [Testing](#testing)
- [Documentation](#documentation)
- [Examples](#examples)

---

## 🎯 Component Philosophy

Components in this project follow these principles:

1. **Single Responsibility** — Each component does one thing well
2. **Composability** — Small components combine into larger sections
3. **Accessibility First** — All components must be keyboard and screen-reader friendly
4. **Performance Aware** — Lazy load, memoize, and optimize by default
5. **Type Safe** — Every prop must be TypeScript typed

---

## 📝 File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Component file | PascalCase + `.tsx` | `HeroSection.tsx` |
| Hook file | camelCase with `use` prefix | `useScrollPosition.ts` |
| Util file | camelCase + `.ts` | `formatters.ts` |
| Style file | camelCase + `.module.css` | `hero.module.css` |
| Type file | camelCase + `.types.ts` | `brand.types.ts` |
| Test file | Same name + `.test.tsx` | `HeroSection.test.tsx` |

---

## 🏗️ Component Structure

Every component file must follow this structure:

```tsx
// 1. React & Next.js imports
import { FC, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 2. Third-party library imports
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

// 3. Internal imports (components)
import { Button } from '@/components/ui/Button';

// 4. Hooks, utilities, types
import { useScrollPosition } from '@/hooks/useScrollPosition';
import type { BrandCardProps } from '@/types/brand.types';

// 5. Constants
const ANIMATION_DURATION = 0.4;

// 6. Component definition
const BrandCard: FC<BrandCardProps> = ({ name, logo, slug }) => {
  // State
  const [isHovered, setIsHovered] = useState(false);

  // Hooks
  const scrollY = useScrollPosition();

  // Effects
  useEffect(() => {
    // side effects
  }, []);

  // Handlers
  const handleClick = () => {
    // logic
  };

  // Render
  return (
    <div className="...">
      {/* JSX */}
    </div>
  );
};

export default BrandCard;
```

---

## 🔷 TypeScript Props

Always define props as a named interface or type:

```tsx
// ✅ Correct
interface BrandCardProps {
  name: string;
  logo: string;
  slug: string;
  featured?: boolean;
  className?: string;
  onSelect?: (slug: string) => void;
}

// ❌ Avoid
const Card = (props: any) => { ... };
```

### Optional vs Required Props

```tsx
interface ComponentProps {
  // Required props (no default needed)
  title: string;
  href: string;

  // Optional props (always provide defaults)
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
}
```

---

## 🎨 Styling Guidelines

Use Tailwind CSS with the `cn()` utility for conditional classes:

```tsx
import { cn } from '@/utils/cn';

const Button: FC<ButtonProps> = ({ variant = 'primary', className, children }) => {
  return (
    <button
      className={cn(
        // Base styles
        'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300',
        // Variant styles
        {
          'bg-brand-600 text-white hover:bg-brand-700': variant === 'primary',
          'bg-transparent border-2 border-brand-600 text-brand-600': variant === 'outline',
        },
        // External class override
        className
      )}
    >
      {children}
    </button>
  );
};
```

---

## 🎭 Animation Standards

See [ANIMATION_GUIDE.md](./ANIMATION_GUIDE.md) for full details.

Quick reference:

```tsx
// Use pre-defined Framer Motion variants
import { fadeIn, slideInFromLeft } from '@/lib/framer/variants';

const HeroSection = () => (
  <motion.div
    variants={fadeIn}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-100px' }}
  >
    {/* content */}
  </motion.div>
);
```

---

## ♿ Accessibility

Every component must:

- [ ] Have semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`)
- [ ] Include `aria-label` on interactive elements
- [ ] Support keyboard navigation (`Tab`, `Enter`, `Escape`)
- [ ] Pass color contrast ratio (WCAG AA: 4.5:1)
- [ ] Include `alt` text on all images
- [ ] Announce dynamic changes with `aria-live`

---

## 🧪 Testing

```tsx
// HeroSection.test.tsx
import { render, screen } from '@testing-library/react';
import HeroSection from './HeroSection';

describe('HeroSection', () => {
  it('renders the main heading', () => {
    render(<HeroSection />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders CTA button', () => {
    render(<HeroSection />);
    expect(screen.getByRole('button', { name: /explore/i })).toBeInTheDocument();
  });
});
```

---

## 📚 Documentation

Every component folder must contain a `README.md`:

```markdown
# ComponentName

Brief description of what this component does.

## Usage

\`\`\`tsx
import ComponentName from '@/components/folder/ComponentName';

<ComponentName prop1="value" prop2={true} />
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| prop1 | string | — | Description |
| prop2 | boolean | false | Description |

## Notes

- Any special behavior or caveats
```

---

> **Last Updated:** 2025
> **Maintained by:** Aone Digital India Development Team
