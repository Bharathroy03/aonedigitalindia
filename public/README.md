# 📦 Public Assets

Static assets served directly at the root URL.

## Folder Structure

```
public/
├── images/
│   ├── store/          ← Store exterior & interior photos
│   ├── products/       ← Product photos (WebP format)
│   ├── hero/           ← Hero section background images
│   ├── backgrounds/    ← Page background images/patterns
│   ├── og/             ← Open Graph share images (1200×630px)
│   └── social/         ← Social media preview images
│
├── brands/             ← Brand logo files (SVG or WebP, transparent)
├── icons/              ← Custom icon files (SVG preferred)
├── videos/             ← Promo videos (MP4, WebM)
├── banners/            ← Offer & promotion banners
├── logos/              ← Company logo variants (light/dark/icon)
└── favicon/            ← All favicon sizes
    ├── favicon.ico
    ├── favicon-16x16.png
    ├── favicon-32x32.png
    ├── apple-touch-icon.png  (180×180)
    └── icon-512x512.png      (PWA)
```

## Image Guidelines

| Type | Format | Max Size | Dimensions |
|------|--------|----------|------------|
| Product photos | WebP | 200KB | 800×800 |
| Hero images | WebP/AVIF | 400KB | 1920×1080 |
| Brand logos | SVG/WebP | 50KB | 200×100 |
| OG images | JPG | 200KB | 1200×630 |
| Thumbnails | WebP | 50KB | 400×300 |

## Naming Convention

- Use lowercase and hyphens: `samsung-galaxy-s25.webp`
- Include brand and variant: `samsung-logo-color.svg`
- Include dimensions for OG: `og-home-1200x630.jpg`
