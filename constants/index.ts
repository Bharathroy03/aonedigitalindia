/**
 * Application-wide constants for Aone Digital India.
 * Use these instead of hardcoding values throughout the codebase.
 */

// ─── Site Information ─────────────────────────────────────────────────────────

export const SITE = {
  NAME: 'Aone Digital India',
  TAGLINE: 'Your Trusted Electronics Destination',
  URL: process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.aonedigitalindia.com',
  DESCRIPTION: 'Shop the latest mobile phones and home appliances at Aone Digital India.',
  EMAIL: 'info@aonedigitalindia.com',
  SUPPORT_EMAIL: 'support@aonedigitalindia.com',
  PHONE: '+91 XXXXX XXXXX',
  WHATSAPP: '91XXXXXXXXXX',
  LOGO: '/logos/logo.svg',
  OG_IMAGE: '/images/og/og-home.jpg',
} as const;

// ─── Contact ──────────────────────────────────────────────────────────────────

export const CONTACT = {
  PHONE: process.env.NEXT_PUBLIC_PHONE_NUMBER ?? '+91 XXXXX XXXXX',
  WHATSAPP: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '91XXXXXXXXXX',
  EMAIL: process.env.NEXT_PUBLIC_EMAIL ?? 'info@aonedigitalindia.com',
  ADDRESS: process.env.NEXT_PUBLIC_STORE_ADDRESS ?? '[Store Address Placeholder]',
} as const;

// ─── Social Media ─────────────────────────────────────────────────────────────

export const SOCIALS = {
  FACEBOOK: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? 'https://www.facebook.com/aonedigitalindia',
  INSTAGRAM: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? 'https://www.instagram.com/aonedigitalindia',
  YOUTUBE: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? 'https://www.youtube.com/@aonedigitalindia',
  WHATSAPP: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '91XXXXXXXXXX'}`,
} as const;

// ─── Navigation Routes ────────────────────────────────────────────────────────

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  BRANDS: '/brands',
  CATEGORIES: '/categories',
  OFFERS: '/offers',
  GALLERY: '/gallery',
  CONTACT: '/contact',
} as const;

// ─── API Routes ───────────────────────────────────────────────────────────────

export const API_ROUTES = {
  CONTACT: '/api/contact',
  NEWSLETTER: '/api/newsletter',
  ANALYTICS: '/api/analytics',
} as const;

// ─── Business Hours ───────────────────────────────────────────────────────────

export const BUSINESS_HOURS = {
  WEEKDAYS: { open: '10:00', close: '20:00' },
  SATURDAY: { open: '10:00', close: '20:00' },
  SUNDAY:   { open: '11:00', close: '18:00' },
} as const;

// ─── Analytics Event Names ────────────────────────────────────────────────────

export const ANALYTICS_EVENTS = {
  FORM_SUBMIT: 'form_submit',
  WHATSAPP_CLICK: 'whatsapp_click',
  PHONE_CLICK: 'phone_click',
  EMAIL_CLICK: 'email_click',
  BRAND_CLICK: 'brand_click',
  OFFER_CLICK: 'offer_click',
  GALLERY_VIEW: 'gallery_view',
  DIRECTIONS_CLICK: 'directions_click',
  NEWSLETTER_SUBSCRIBE: 'newsletter_subscribe',
} as const;

// ─── Pagination ───────────────────────────────────────────────────────────────

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  MAX_LIMIT: 50,
} as const;

// ─── Image Sizes ──────────────────────────────────────────────────────────────

export const IMAGE_SIZES = {
  THUMBNAIL: { width: 200, height: 200 },
  CARD: { width: 400, height: 300 },
  HERO: { width: 1920, height: 1080 },
  OG: { width: 1200, height: 630 },
  BRAND_LOGO: { width: 200, height: 100 },
} as const;

// ─── Animation Durations (ms) ─────────────────────────────────────────────────

export const ANIMATION = {
  HOVER: 150,
  FAST: 200,
  BASE: 300,
  SLOW: 500,
  HERO: 800,
  COUNTER: 2000,
} as const;
