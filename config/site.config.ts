import { SITE, CONTACT, SOCIALS, ROUTES } from '@/constants';

/**
 * Primary site configuration object.
 * Aggregates all site-wide settings in one place.
 */
export const siteConfig = {
  name: SITE.NAME,
  tagline: SITE.TAGLINE,
  description: SITE.DESCRIPTION,
  url: SITE.URL,
  email: SITE.EMAIL,
  supportEmail: SITE.SUPPORT_EMAIL,
  phone: CONTACT.PHONE,
  whatsapp: CONTACT.WHATSAPP,
  address: CONTACT.ADDRESS,
  logo: SITE.LOGO,
  ogImage: SITE.OG_IMAGE,
  socials: SOCIALS,
  routes: ROUTES,

  // Feature flags
  features: {
    darkMode: process.env.NEXT_PUBLIC_ENABLE_DARK_MODE === 'true',
    analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    cookieConsent: process.env.NEXT_PUBLIC_ENABLE_COOKIE_CONSENT === 'true',
    maintenanceMode: process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true',
  },

  // Analytics
  analytics: {
    gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '',
    gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? '',
  },
} as const;

export type SiteConfig = typeof siteConfig;
