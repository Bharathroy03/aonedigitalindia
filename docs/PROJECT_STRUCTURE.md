# 📁 Project Structure — Aone Digital India

> Complete folder hierarchy and architectural overview for the Aone Digital India website.

---

## 📋 Table of Contents

- [Root Directory](#root-directory)
- [App Directory](#app-directory)
- [Components](#components)
- [Sections](#sections)
- [Hooks](#hooks)
- [Lib](#lib)
- [Services](#services)
- [Utils](#utils)
- [Context & Providers](#context--providers)
- [Constants & Types](#constants--types)
- [Config & Middleware](#config--middleware)
- [Styles & Fonts](#styles--fonts)
- [Public Assets](#public-assets)
- [Data Layer](#data-layer)
- [Emails](#emails)
- [API](#api)
- [Scripts](#scripts)
- [Tests](#tests)
- [SEO, Analytics & Deployment](#seo-analytics--deployment)

---

## 🌳 Root Directory

```
aone-digital-india/
│
├── app/                        # Next.js 15 App Router (pages, layouts, routes)
├── components/                 # All reusable React components
├── sections/                   # Full-page section compositions
├── hooks/                      # Custom React hooks
├── lib/                        # Third-party library wrappers
├── services/                   # External API service integrations
├── utils/                      # Pure utility/helper functions
├── context/                    # React Context definitions
├── providers/                  # Provider wrapper components
├── constants/                  # App-wide constants & enums
├── types/                      # Global TypeScript types & interfaces
├── config/                     # App & site configuration
├── middleware/                  # Next.js middleware (auth, redirects)
├── styles/                     # Global styles, themes, variables
├── fonts/                      # Local font files
├── public/                     # Static public assets
├── data/                       # JSON data files (brands, products, etc.)
├── emails/                     # Email templates (React Email)
├── api/                        # Standalone API utilities (not App Router)
├── scripts/                    # Build & automation scripts
├── docs/                       # All project documentation
├── tests/                      # Unit, integration, and E2E tests
├── assets/                     # Source design assets
├── seo/                        # SEO config and structured data
├── analytics/                  # Analytics utilities and events
├── deployment/                 # Deployment configs and CI/CD
│
├── .env.example                # Environment variable template
├── .gitignore                  # Git ignore rules
├── .prettierrc                 # Prettier config
├── .eslintrc.json              # ESLint config
├── .editorconfig               # Editor config
├── package.json                # Dependencies & scripts
├── tsconfig.json               # TypeScript config
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS config
├── postcss.config.js           # PostCSS config
├── vercel.json                 # Vercel deployment config
├── robots.txt                  # Search engine crawl rules
├── sitemap.xml                 # XML sitemap
└── manifest.json               # PWA manifest
```

---

## 📱 App Directory

```
app/
├── (root)/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Homepage
│   ├── loading.tsx             # Global loading UI
│   ├── error.tsx               # Global error boundary
│   └── not-found.tsx           # 404 page
│
├── about/
│   └── page.tsx                # About page
│
├── brands/
│   ├── page.tsx                # All brands listing
│   └── [slug]/
│       └── page.tsx            # Individual brand page
│
├── categories/
│   ├── page.tsx                # All categories
│   └── [slug]/
│       └── page.tsx            # Category detail page
│
├── offers/
│   └── page.tsx                # Offers & deals page
│
├── gallery/
│   └── page.tsx                # Photo gallery page
│
├── contact/
│   └── page.tsx                # Contact page
│
├── api/
│   ├── contact/
│   │   └── route.ts            # Contact form handler
│   ├── newsletter/
│   │   └── route.ts            # Newsletter subscription
│   └── analytics/
│       └── route.ts            # Analytics event handler
│
└── sitemap.ts                  # Dynamic sitemap generator
```

---

## 🧩 Components

```
components/
│
├── layout/
│   ├── Layout.tsx              # Main layout wrapper
│   ├── PageWrapper.tsx         # Page transition wrapper
│   └── README.md
│
├── navbar/
│   ├── Navbar.tsx              # Main navigation bar
│   ├── NavLinks.tsx            # Desktop nav links
│   ├── MobileMenu.tsx          # Mobile hamburger menu
│   ├── NavLogo.tsx             # Logo component
│   └── README.md
│
├── hero/
│   ├── Hero.tsx                # Hero section component
│   ├── HeroSlider.tsx          # Hero image slider
│   ├── HeroContent.tsx         # Hero text content
│   └── README.md
│
├── brands/
│   ├── BrandsSection.tsx       # Brands showcase section
│   ├── BrandCard.tsx           # Individual brand card
│   ├── BrandLogo.tsx           # Brand logo display
│   └── README.md
│
├── categories/
│   ├── CategoriesSection.tsx   # Categories overview section
│   ├── CategoryCard.tsx        # Individual category card
│   └── README.md
│
├── offers/
│   ├── OffersSection.tsx       # Featured offers section
│   ├── OfferCard.tsx           # Individual offer card
│   ├── OfferBanner.tsx         # Full-width offer banner
│   └── README.md
│
├── testimonials/
│   ├── TestimonialsSection.tsx # Customer testimonials
│   ├── TestimonialCard.tsx     # Individual testimonial
│   ├── TestimonialSlider.tsx   # Testimonial carousel
│   └── README.md
│
├── gallery/
│   ├── GallerySection.tsx      # Photo gallery section
│   ├── GalleryGrid.tsx         # Masonry/grid layout
│   ├── GalleryModal.tsx        # Lightbox modal
│   └── README.md
│
├── faq/
│   ├── FAQSection.tsx          # FAQ accordion section
│   ├── FAQItem.tsx             # Single FAQ item
│   └── README.md
│
├── contact/
│   ├── ContactSection.tsx      # Contact section
│   ├── ContactForm.tsx         # Lead capture form
│   ├── GoogleMap.tsx           # Embedded Google Map
│   ├── ContactInfo.tsx         # Contact info block
│   └── README.md
│
├── footer/
│   ├── Footer.tsx              # Main footer
│   ├── FooterLinks.tsx         # Footer navigation links
│   ├── FooterSocials.tsx       # Social media icons
│   └── README.md
│
├── ui/
│   ├── Button.tsx              # Primary button component
│   ├── Badge.tsx               # Badge/chip component
│   ├── Card.tsx                # Generic card component
│   ├── Modal.tsx               # Modal/dialog component
│   ├── Spinner.tsx             # Loading spinner
│   ├── Divider.tsx             # Section divider
│   ├── Avatar.tsx              # Avatar image component
│   ├── Toast.tsx               # Toast notification
│   ├── Tooltip.tsx             # Tooltip component
│   ├── Input.tsx               # Form input component
│   ├── Textarea.tsx            # Textarea component
│   ├── Select.tsx              # Select dropdown
│   ├── Checkbox.tsx            # Checkbox component
│   ├── StarRating.tsx          # Star rating display
│   └── README.md
│
└── animations/
    ├── FadeIn.tsx              # Fade-in animation wrapper
    ├── SlideIn.tsx             # Slide-in animation wrapper
    ├── StaggerChildren.tsx     # Staggered list animations
    ├── ScrollReveal.tsx        # Scroll-triggered reveal
    ├── FloatingElement.tsx     # Floating animation
    ├── ParallaxSection.tsx     # Parallax scroll effect
    ├── CountUp.tsx             # Number count-up animation
    ├── TypeWriter.tsx          # Typewriter text effect
    └── README.md
```

---

## 🔧 Hooks, Lib, Services, Utils

```
hooks/
├── useScrollPosition.ts        # Track scroll position
├── useMediaQuery.ts            # Responsive breakpoint detection
├── useTheme.ts                 # Theme toggling
├── useLocalStorage.ts          # Local storage wrapper
├── useIntersectionObserver.ts  # Element visibility detection
├── useWindowSize.ts            # Window dimensions
├── useDebounce.ts              # Debounce value hook
├── useClickOutside.ts          # Detect outside click
├── useContactForm.ts           # Contact form logic
├── useLockBodyScroll.ts        # Prevent body scroll
└── README.md

lib/
├── gsap/
│   ├── gsap.config.ts          # GSAP global setup
│   └── animations.ts           # Reusable GSAP animations
├── framer/
│   ├── variants.ts             # Framer Motion variants
│   └── transitions.ts          # Transition configs
├── zod/
│   └── schemas.ts              # Zod validation schemas
├── seo/
│   └── metadata.ts             # Metadata helpers
└── README.md

services/
├── email.service.ts            # Email sending (Resend/Nodemailer)
├── analytics.service.ts        # Analytics event tracking
├── whatsapp.service.ts         # WhatsApp link generation
└── README.md

utils/
├── cn.ts                       # Class name merger (clsx + twMerge)
├── formatters.ts               # Date, price, string formatters
├── validators.ts               # Input validation helpers
├── seo.utils.ts                # SEO/meta tag helpers
├── image.utils.ts              # Image optimization helpers
├── phone.utils.ts              # Phone number formatting
└── README.md
```

---

## 🗂️ Data Layer

```
data/
├── brands.json                 # Brand logos and metadata
├── categories.json             # Product categories
├── offers.json                 # Current offers and deals
├── products.json               # Featured products
├── testimonials.json           # Customer testimonials
├── gallery.json                # Gallery image data
├── faq.json                    # FAQ questions and answers
├── team.json                   # Team member profiles
├── navigation.json             # Nav link structure
├── footer.json                 # Footer link groups
├── seo.json                    # Page-level SEO metadata
├── contact.json                # Store contact information
└── socials.json                # Social media links
```

---

## 🌐 Public Assets

```
public/
├── images/
│   ├── store/                  # Store exterior/interior photos
│   ├── products/               # Product images
│   ├── hero/                   # Hero section images
│   ├── backgrounds/            # Background images/patterns
│   ├── og/                     # Open Graph share images
│   └── social/                 # Social media images
│
├── brands/                     # Brand logo images (PNG/WebP)
├── icons/                      # Custom icon SVGs
├── videos/                     # Promo/background videos
├── banners/                    # Offer banner images
├── logos/                      # Company logo variants
└── favicon/                    # Favicon files (all sizes)
```

---

> **Last Updated:** 2025
> **Maintained by:** Aone Digital India Development Team
