# 📊 Data Layer

JSON data files powering the Aone Digital India website.

## Files Reference

| File | Purpose |
|------|---------|
| `brands.json` | Brand logos, slugs, categories, and metadata |
| `categories.json` | Product categories with icons and descriptions |
| `offers.json` | Current offers, promotions, and banners |
| `products.json` | Featured products with specs and pricing |
| `testimonials.json` | Customer reviews and ratings |
| `gallery.json` | Store photo gallery metadata |
| `faq.json` | Frequently asked questions |
| `team.json` | Team member profiles |
| `navigation.json` | Navigation link structure |
| `footer.json` | Footer links and content |
| `seo.json` | Page-level SEO metadata |
| `contact.json` | Store contact info and hours |
| `socials.json` | Social media links |

## Usage in Components

```ts
import brands from '@/data/brands.json';
import type { Brand } from '@/types';

const brandsData: Brand[] = brands;
```

## Guidelines

- All files follow their corresponding TypeScript interface in `types/index.ts`
- Validate JSON against TypeScript types before committing
- Keep data sorted by `order` field
- Use `active: false` to hide items without deleting them
