# 📊 Google Analytics Setup — Aone Digital India

> GA4 and GTM implementation guide for tracking site performance and conversions.

---

## 📋 Table of Contents

- [Setup Overview](#setup-overview)
- [GA4 Configuration](#ga4-configuration)
- [Google Tag Manager](#google-tag-manager)
- [Key Events to Track](#key-events-to-track)
- [Conversion Goals](#conversion-goals)
- [Privacy Compliance](#privacy-compliance)
- [Reports](#reports)

---

## 🌐 Setup Overview

| Tool | Purpose |
|------|---------|
| **Google Analytics 4 (GA4)** | Website traffic and user behavior |
| **Google Tag Manager (GTM)** | Tag management without code changes |
| **Google Search Console** | Organic search performance |

---

## ⚙️ GA4 Configuration

### Environment Variables

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

### Installation

```tsx
// app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
      </body>
    </html>
  );
}
```

### Analytics Service

```ts
// services/analytics.service.ts
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const trackEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};
```

---

## 🏷️ Google Tag Manager

```tsx
// app/layout.tsx — Add GTM in <head> and <body>
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

// Script in <head>
<Script id="gtm-head" strategy="afterInteractive">
  {`
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${GTM_ID}');
  `}
</Script>

// NoScript fallback in <body>
<noscript>
  <iframe
    src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
    height="0" width="0"
    style={{ display: 'none', visibility: 'hidden' }}
  />
</noscript>
```

---

## 📌 Key Events to Track

### Contact & Lead Events

```ts
// Contact form submitted
trackEvent('form_submit', {
  form_name: 'contact_form',
  page_location: window.location.href,
});

// WhatsApp button clicked
trackEvent('whatsapp_click', {
  button_location: 'floating_button', // or 'navbar', 'contact_section'
});

// Phone number clicked
trackEvent('phone_click', {
  button_location: 'navbar',
});

// Email clicked
trackEvent('email_click', {
  email: 'info@aonedigitalindia.com',
});
```

### Navigation Events

```ts
// Brand card clicked
trackEvent('brand_click', {
  brand_name: 'Samsung',
  page_location: 'brands_section',
});

// Offer banner clicked
trackEvent('offer_click', {
  offer_title: 'Summer Sale',
  offer_id: 'SUMMER2025',
});

// Gallery image viewed
trackEvent('gallery_view', {
  image_id: 'store-front-01',
});
```

---

## 🎯 Conversion Goals

Set these as conversions in GA4:

| Goal | Event Name | Priority |
|------|-----------|---------|
| Contact Form Submit | `form_submit` | 🔴 High |
| WhatsApp Click | `whatsapp_click` | 🔴 High |
| Phone Click | `phone_click` | 🔴 High |
| Directions Click | `directions_click` | 🟡 Medium |
| Newsletter Subscribe | `newsletter_subscribe` | 🟡 Medium |

---

## 🔏 Privacy Compliance

### Cookie Consent Banner

```tsx
// Show before loading GA/GTM
// Only initialize analytics after user consent

const initAnalytics = (consent: boolean) => {
  if (consent) {
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
    });
  } else {
    window.gtag('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
    });
  }
};
```

### Default Consent Mode (GDPR/Privacy)

```tsx
// Initialize with denied consent by default
window.gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  wait_for_update: 500,
});
```

---

## 📈 Key Reports to Monitor

| Report | Location | Frequency |
|--------|---------|-----------|
| Active Users | Realtime | Daily |
| Acquisition | Traffic acquisition | Weekly |
| Conversions | Conversions > Events | Weekly |
| Pages & Screens | Engagement | Monthly |
| Core Web Vitals | Tech > Web vitals | Monthly |
| User Demographics | User attributes | Monthly |

---

> **Last Updated:** 2025
> **Maintained by:** Aone Digital India Development Team
