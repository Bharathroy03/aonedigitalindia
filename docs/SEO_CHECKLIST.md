# 🔍 SEO Checklist — Aone Digital India

> Complete search engine optimization requirements and checklist for every page.

---

## 📋 Table of Contents

- [Technical SEO](#technical-seo)
- [On-Page SEO](#on-page-seo)
- [Structured Data](#structured-data)
- [Open Graph & Social](#open-graph--social)
- [Local SEO](#local-seo)
- [Performance SEO](#performance-seo)
- [Page-Level Checklist](#page-level-checklist)
- [Tools & Monitoring](#tools--monitoring)

---

## ⚙️ Technical SEO

### Core Requirements

- [ ] **Sitemap** — Dynamic sitemap generated at `/sitemap.xml`
- [ ] **Robots.txt** — Configured at `/robots.txt`
- [ ] **Canonical URLs** — Set on every page to avoid duplicate content
- [ ] **HTTPS** — Enforced via Vercel / hosting provider
- [ ] **Mobile-Friendly** — Responsive design tested on all screen sizes
- [ ] **Core Web Vitals** — LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] **Crawlability** — All important pages accessible to Googlebots

### robots.txt

```txt
User-agent: *
Allow: /

Sitemap: https://www.aonedigitalindia.com/sitemap.xml
```

### Dynamic Sitemap (Next.js)

```ts
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.aonedigitalindia.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.aonedigitalindia.com/brands',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // ... more routes
  ];
}
```

---

## 📝 On-Page SEO

### Metadata Template

```tsx
// app/layout.tsx or page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Aone Digital India — Premium Mobile & Appliances Store',
    template: '%s | Aone Digital India',
  },
  description: 'Shop the latest mobile phones and home appliances at Aone Digital India. Best prices on Samsung, Apple, OnePlus, LG, Whirlpool and more.',
  keywords: [
    'mobile phones', 'home appliances', 'electronics store',
    'Samsung', 'Apple', 'OnePlus', 'Aone Digital India',
  ],
  authors: [{ name: 'Aone Digital India' }],
  creator: 'Aone Digital India',
  publisher: 'Aone Digital India',
  metadataBase: new URL('https://www.aonedigitalindia.com'),
  alternates: {
    canonical: '/',
  },
};
```

### Heading Hierarchy Rules

```
<h1> — One per page (page title / hero heading)
<h2> — Section titles
<h3> — Sub-section titles
<h4> — Card headings
<h5>, <h6> — Rarely used
```

> **Rule:** Never skip heading levels. Never use headings for styling only.

---

## 🔖 Structured Data

### Local Business Schema

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Aone Digital India",
  "description": "Premium Mobile Phones & Home Appliances Store",
  "url": "https://www.aonedigitalindia.com",
  "telephone": "+91XXXXXXXXXX",
  "email": "info@aonedigitalindia.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Store Address Placeholder]",
    "addressLocality": "[City]",
    "addressRegion": "[State]",
    "postalCode": "[PIN Code]",
    "addressCountry": "IN"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "10:00",
      "closes": "20:00"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/aonedigitalindia",
    "https://www.instagram.com/aonedigitalindia"
  ]
}
```

### Product Schema (for featured products)

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Product Name",
  "brand": { "@type": "Brand", "name": "Brand Name" },
  "offers": {
    "@type": "Offer",
    "price": "00000",
    "priceCurrency": "INR",
    "availability": "InStock"
  }
}
```

---

## 📣 Open Graph & Social

```tsx
export const metadata: Metadata = {
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.aonedigitalindia.com',
    siteName: 'Aone Digital India',
    title: 'Aone Digital India — Premium Mobile & Appliances Store',
    description: 'Your trusted electronics destination in India.',
    images: [
      {
        url: '/public/images/og/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Aone Digital India Store',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aone Digital India',
    description: 'Premium Mobile Phones & Home Appliances Store',
    images: ['/public/images/og/og-home.jpg'],
  },
};
```

### OG Image Requirements

- Dimensions: **1200 × 630 px**
- Format: JPG/WebP
- Max size: 200KB
- Include: Logo + Store name + Tagline

---

## 📍 Local SEO

- [ ] **Google Business Profile** claimed and verified
- [ ] **NAP Consistency** — Name, Address, Phone same everywhere
- [ ] **Local Keywords** — Include city name in key pages
- [ ] **Customer Reviews** — Encourage Google reviews
- [ ] **Maps Embed** — Google Maps on contact page
- [ ] **Directions Link** — Direct link to Google Maps directions

---

## ⚡ Performance SEO

- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] FID/INP < 200ms
- [ ] Images in WebP/AVIF format
- [ ] Images have width and height attributes set
- [ ] Critical CSS inlined
- [ ] Font display: swap used
- [ ] Preconnect to external origins

---

## ✅ Page-Level Checklist

For every new page added:

- [ ] Unique `<title>` tag (50–60 chars)
- [ ] Unique `<meta description>` (150–160 chars)
- [ ] Canonical URL set
- [ ] OG image set
- [ ] One `<h1>` per page
- [ ] All images have `alt` attributes
- [ ] Internal links use descriptive anchor text
- [ ] Page added to sitemap
- [ ] Schema markup added if applicable

---

## 🛠️ Tools & Monitoring

| Tool | Purpose |
|------|---------|
| Google Search Console | Monitor indexing and rankings |
| Google Analytics 4 | Traffic and conversion tracking |
| PageSpeed Insights | Core Web Vitals monitoring |
| Ahrefs / SEMrush | Keyword and backlink tracking |
| Screaming Frog | Technical SEO auditing |
| Schema Markup Validator | Test structured data |
| Facebook Debugger | Test OG tags |
| Twitter Card Validator | Test Twitter cards |

---

> **Last Updated:** 2025
> **Maintained by:** Aone Digital India Development Team
