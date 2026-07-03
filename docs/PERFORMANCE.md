# ⚡ Performance Guide — Aone Digital India

> Targets, budgets, optimization strategies, and monitoring for site performance.

---

## 📋 Table of Contents

- [Performance Targets](#performance-targets)
- [Core Web Vitals](#core-web-vitals)
- [Image Optimization](#image-optimization)
- [JavaScript Optimization](#javascript-optimization)
- [CSS Optimization](#css-optimization)
- [Font Optimization](#font-optimization)
- [Caching Strategy](#caching-strategy)
- [Bundle Analysis](#bundle-analysis)
- [Monitoring](#monitoring)

---

## 🎯 Performance Targets

| Metric | Target | Minimum Acceptable |
|--------|--------|-------------------|
| Lighthouse Performance | > 90 | > 75 |
| Lighthouse Accessibility | > 95 | > 90 |
| Lighthouse SEO | > 95 | > 90 |
| Lighthouse Best Practices | > 90 | > 80 |
| First Contentful Paint (FCP) | < 1.8s | < 3s |
| Largest Contentful Paint (LCP) | < 2.5s | < 4s |
| Total Blocking Time (TBT) | < 200ms | < 600ms |
| Cumulative Layout Shift (CLS) | < 0.1 | < 0.25 |
| Time to First Byte (TTFB) | < 600ms | < 1.8s |
| JS Bundle (gzip) | < 200KB | < 300KB |
| CSS Bundle (gzip) | < 50KB | < 100KB |

---

## 📊 Core Web Vitals

### LCP — Largest Contentful Paint

Optimize the hero image (most common LCP element):

```tsx
// Always prioritize hero image
<Image
  src="/hero/hero-main.webp"
  alt="Aone Digital India Store"
  width={1920}
  height={1080}
  priority          // Preloads this image
  fetchPriority="high"
  quality={85}
/>
```

### CLS — Cumulative Layout Shift

```tsx
// Always specify image dimensions to prevent layout shift
<Image
  src="/brand.png"
  alt="Brand"
  width={200}       // Must be set
  height={100}      // Must be set
/>

// Reserve space for dynamic content
<div style={{ minHeight: '400px' }}>
  {/* Dynamic content */}
</div>
```

### FID/INP — Interaction to Next Paint

- Break up long tasks (< 50ms each)
- Defer non-critical JavaScript
- Use `startTransition` for non-urgent state updates

---

## 🖼️ Image Optimization

### Format Priority

```
1. AVIF  — Best compression (not all browsers)
2. WebP  — Best balance (use for all production images)
3. PNG   — For images requiring transparency (logos)
4. JPEG  — Fallback for photos only
```

### Compression Settings

```ts
// next.config.ts
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
};
```

### Lazy Loading Strategy

```tsx
// Above-the-fold images: priority=true, no lazy loading
// Below-the-fold images: loading="lazy" (default with Next/Image)

<Image
  src="/gallery/store-1.webp"
  alt="Store Interior"
  width={600}
  height={400}
  loading="lazy"    // Default — no need to specify
/>
```

---

## 📦 JavaScript Optimization

### Code Splitting with `dynamic()`

```tsx
import dynamic from 'next/dynamic';

// Lazy load heavy components
const GalleryModal = dynamic(() => import('@/components/gallery/GalleryModal'), {
  loading: () => <div className="animate-pulse h-96 bg-neutral-200 rounded-lg" />,
  ssr: false,  // Only load on client if needed
});

const GoogleMap = dynamic(() => import('@/components/contact/GoogleMap'), {
  ssr: false,
  loading: () => <div className="h-96 bg-neutral-100 rounded-lg animate-pulse" />,
});
```

### React Performance Patterns

```tsx
// Memoize expensive calculations
const filteredBrands = useMemo(
  () => brands.filter((b) => b.featured),
  [brands]
);

// Memoize callbacks
const handleFilter = useCallback(
  (category: string) => { /* ... */ },
  [/* dependencies */]
);

// Memo for expensive pure components
const BrandCard = memo(({ name, logo }: BrandCardProps) => {
  return <div>...</div>;
});
```

---

## 🎨 CSS Optimization

### Tailwind CSS Purging

Tailwind automatically purges unused styles in production — ensure content paths are correct:

```ts
// tailwind.config.ts
content: [
  './app/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './sections/**/*.{js,ts,jsx,tsx,mdx}',
],
```

### Critical CSS

Next.js automatically inlines critical CSS. For custom critical styles, add to `app/layout.tsx`:

```tsx
<style dangerouslySetInnerHTML={{
  __html: `
    /* Critical above-fold styles */
    .hero-section { min-height: 100vh; }
  `
}} />
```

---

## 🔤 Font Optimization

```tsx
// app/layout.tsx
import { Inter, Outfit } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',     // Prevent FOIT
  preload: true,
  variable: '--font-body',
});

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '600', '700', '800', '900'],
});
```

---

## 🗄️ Caching Strategy

### Static Assets (Vercel)

```json
// vercel.json
{
  "headers": [
    {
      "source": "/public/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

### API Route Caching

```ts
// app/api/brands/route.ts
export async function GET() {
  const data = await getBrands();

  return Response.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
```

---

## 📊 Bundle Analysis

```bash
# Install bundle analyzer
npm install @next/bundle-analyzer

# Analyze
ANALYZE=true npm run build
```

### Bundle Budget Enforcement

```json
// package.json
"scripts": {
  "size-check": "npx bundlesize"
}
```

---

## 📈 Monitoring

- **Google Search Console** — Core Web Vitals field data
- **PageSpeed Insights** — Page-level audits
- **Vercel Analytics** — Real-user monitoring
- **Vercel Speed Insights** — Performance metrics

---

> **Last Updated:** 2025
> **Maintained by:** Aone Digital India Development Team
