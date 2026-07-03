# 🎭 Animation Guide — Aone Digital India

> Standards and patterns for all animations using Framer Motion and GSAP.

---

## 📋 Table of Contents

- [Philosophy](#philosophy)
- [Tools Overview](#tools-overview)
- [Framer Motion Variants](#framer-motion-variants)
- [GSAP Animations](#gsap-animations)
- [Scroll Animations](#scroll-animations)
- [Page Transitions](#page-transitions)
- [Micro-Interactions](#micro-interactions)
- [Performance](#performance)
- [Reduced Motion](#reduced-motion)

---

## 🎯 Philosophy

> "Animation should feel purposeful — it guides attention, confirms actions, and creates delight."

**Rules:**
1. Never animate for the sake of animating — every animation has a purpose
2. Animations should be **fast** (150–600ms range)
3. Use **easing** for natural feel — avoid linear timing
4. Always respect `prefers-reduced-motion`
5. Animate **opacity** and **transform** only (GPU-composited)

---

## 🛠️ Tools Overview

| Tool | Use Case |
|------|----------|
| **Framer Motion** | Component-level animations, layout animations, gestures |
| **GSAP** | Complex timeline animations, scroll-triggered sequences |
| **CSS Transitions** | Simple hover states, color changes |
| **CSS Animations** | Looping animations (shimmer, pulse) |

---

## 🎬 Framer Motion Variants

Pre-defined variants live in `lib/framer/variants.ts`:

```ts
// lib/framer/variants.ts

import { Variants } from 'framer-motion';

// Fade in from transparent
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// Fade in + slide up
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// Fade in + slide from left
export const slideInFromLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// Stagger container for child animations
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Scale up from 0
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// Card hover effect
export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.03,
    y: -6,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};
```

### Usage

```tsx
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/framer/variants';

const BrandsSection = () => (
  <motion.div
    variants={staggerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-80px' }}
  >
    {brands.map((brand) => (
      <motion.div key={brand.id} variants={fadeInUp}>
        <BrandCard {...brand} />
      </motion.div>
    ))}
  </motion.div>
);
```

---

## ⚡ GSAP Animations

Complex animations and timelines use GSAP (`lib/gsap/animations.ts`):

```ts
// lib/gsap/animations.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

// Hero text reveal animation
export const heroTextReveal = (element: HTMLElement) => {
  const split = new SplitText(element, { type: 'chars,words' });

  return gsap.fromTo(
    split.chars,
    { opacity: 0, y: 20, rotateX: -90 },
    {
      opacity: 1,
      y: 0,
      rotateX: 0,
      stagger: 0.02,
      duration: 0.8,
      ease: 'back.out(1.7)',
    }
  );
};

// Counter animation
export const countUpAnimation = (
  element: HTMLElement,
  target: number,
  suffix = '+'
) => {
  return gsap.to(
    { value: 0 },
    {
      value: target,
      duration: 2,
      ease: 'power2.out',
      onUpdate: function () {
        element.textContent = Math.round(this.targets()[0].value) + suffix;
      },
    }
  );
};
```

---

## 🔄 Scroll Animations

```tsx
// components/animations/ScrollReveal.tsx
'use client';

import { FC, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeInUp } from '@/lib/framer/variants';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const ScrollReveal: FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  className,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        ...fadeInUp,
        visible: {
          ...fadeInUp.visible,
          transition: {
            ...(fadeInUp.visible as any).transition,
            delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
```

---

## 🚪 Page Transitions

```tsx
// app/(root)/layout.tsx
import { AnimatePresence } from 'framer-motion';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      {children}
    </AnimatePresence>
  );
}

// components/animations/PageTransition.tsx
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.3 } },
};
```

---

## 🖱️ Micro-Interactions

### Button Press Effect

```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
>
  Contact Us
</motion.button>
```

### Floating WhatsApp Button

```tsx
// Gentle floating animation
const floatAnimation = {
  y: [0, -8, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};
```

---

## ⚡ Performance

1. Always animate **transform** and **opacity** — never width, height, or margin
2. Use `will-change: transform` sparingly and remove after animation
3. Use `layout` prop only when necessary (expensive)
4. Disable animations on low-end devices using device detection

---

## ♿ Reduced Motion

```tsx
// Always check user preference
import { useReducedMotion } from 'framer-motion';

const MyComponent = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={shouldReduceMotion ? {} : { y: [0, -10, 0] }}
    >
      {/* content */}
    </motion.div>
  );
};
```

```css
/* Global CSS fallback */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## ⏱️ Timing Reference

| Animation Type | Duration | Easing |
|---------------|----------|--------|
| Hover state | 150–200ms | ease-out |
| Button tap | 100ms | spring |
| Tooltip | 200ms | ease |
| Card reveal | 500–600ms | [0.22, 1, 0.36, 1] |
| Page transition | 300–400ms | ease-in-out |
| Hero text | 800ms | back.out(1.7) |
| Counter | 2000ms | power2.out |
| Loader | 600ms | ease |

---

> **Last Updated:** 2025
> **Maintained by:** Aone Digital India Development Team
