/**
 * Global TypeScript type definitions for Aone Digital India.
 * All shared types are defined here and imported via @/types/index.ts
 */

// ─── Brand Types ─────────────────────────────────────────────────────────────

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  category: BrandCategory[];
  description: string;
  featured: boolean;
  order: number;
}

export type BrandCategory = 'mobile' | 'appliances' | 'tv' | 'audio' | 'wearables' | 'laptops';

// ─── Product Types ────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  currency: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured: boolean;
  description: string;
  specifications?: Record<string, string>;
  order: number;
}

// ─── Category Types ───────────────────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  image: string;
  description: string;
  featured: boolean;
  itemCount: number;
  order: number;
}

// ─── Offer Types ──────────────────────────────────────────────────────────────

export interface Offer {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  discountLabel: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  validFrom: string;
  validUntil: string;
  featured: boolean;
  badge: string;
  badgeColor: string;
  order: number;
  active: boolean;
}

// ─── Testimonial Types ────────────────────────────────────────────────────────

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  review: string;
  product?: string;
  date: string;
  verified: boolean;
  featured: boolean;
  order: number;
}

// ─── FAQ Types ────────────────────────────────────────────────────────────────

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  featured: boolean;
}

// ─── Gallery Types ────────────────────────────────────────────────────────────

export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  image: string;
  thumbnail: string;
  category: string;
  featured: boolean;
  order: number;
}

// ─── Navigation Types ─────────────────────────────────────────────────────────

export interface NavLink {
  id: string;
  label: string;
  href: string;
  order: number;
  badge?: string;
  hasDropdown?: boolean;
  dropdown?: DropdownLink[];
}

export interface DropdownLink {
  label: string;
  href: string;
}

// ─── Contact Types ────────────────────────────────────────────────────────────

export interface ContactInfo {
  company: {
    name: string;
    tagline: string;
    website: string;
    email: string;
    supportEmail: string;
    phone: string;
    whatsapp: string;
    address: {
      street: string;
      city: string;
      state: string;
      pinCode: string;
      country: string;
      full: string;
    };
    coordinates: {
      lat: number;
      lng: number;
    };
    googleMapsUrl: string;
    googleMapsEmbed: string;
  };
  businessHours: BusinessHours[];
}

export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

// ─── Social Media Types ───────────────────────────────────────────────────────

export interface SocialLink {
  id: string;
  name: string;
  label: string;
  url: string;
  icon: string;
  color: string;
  active: boolean;
  order: number;
}

// ─── Common Types ─────────────────────────────────────────────────────────────

export type ThemeMode = 'light' | 'dark' | 'system';

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
