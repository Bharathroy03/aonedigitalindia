/**
 * Content Services — Categories, Offers, Testimonials, Gallery, FAQ, Nav, Socials
 *
 * Consolidated service that fetches data from Python Flask API backend.
 */

import type {
  CategoryRow,
  OfferRow,
  TestimonialRow,
  GalleryRow,
  FAQRow,
  NavigationRow,
  SocialRow,
} from '@/lib/supabase/types';

const API_URL = process.env.NEXT_PUBLIC_FLASK_API_URL || 'http://127.0.0.1:5000';

// ─── Utility Fetcher ──────────────────────────────────────────────────────────
async function fetchFromApi<T>(path: string, cacheTime = 1800): Promise<T[]> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      next: { revalidate: cacheTime },
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (error: any) {
    console.error(`[content.service] Fetch failed for ${path}:`, error.message);
    return [];
  }
}

// ─── Categories ───────────────────────────────────────────────────────────────

export async function getAllCategories(): Promise<CategoryRow[]> {
  return fetchFromApi<CategoryRow>('/api/categories');
}

export async function getFeaturedCategories(): Promise<CategoryRow[]> {
  const categories = await getAllCategories();
  return categories.filter((c) => c.featured);
}

export async function getCategoryBySlug(slug: string): Promise<CategoryRow | null> {
  const categories = await getAllCategories();
  return categories.find((c) => c.slug === slug) || null;
}

// ─── Offers ───────────────────────────────────────────────────────────────────

export async function getAllOffers(): Promise<OfferRow[]> {
  return fetchFromApi<OfferRow>('/api/offers', 900); // 15 mins cache
}

export async function getFeaturedOffers(limit = 3): Promise<OfferRow[]> {
  const offers = await getAllOffers();
  return offers.filter((o) => o.featured).slice(0, limit);
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export async function getAllTestimonials(): Promise<TestimonialRow[]> {
  return fetchFromApi<TestimonialRow>('/api/testimonials');
}

export async function getFeaturedTestimonials(limit = 4): Promise<TestimonialRow[]> {
  const testimonials = await getAllTestimonials();
  return testimonials.filter((t) => t.featured).slice(0, limit);
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

export async function getAllGallery(): Promise<GalleryRow[]> {
  return fetchFromApi<GalleryRow>('/api/gallery');
}

export async function getFeaturedGallery(limit = 6): Promise<GalleryRow[]> {
  const gallery = await getAllGallery();
  return gallery.filter((g) => g.featured).slice(0, limit);
}

export async function getGalleryByCategory(category: string): Promise<GalleryRow[]> {
  const gallery = await getAllGallery();
  return gallery.filter((g) => g.category === category);
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export async function getAllFAQ(): Promise<FAQRow[]> {
  return fetchFromApi<FAQRow>('/api/faq');
}

export async function getFeaturedFAQ(limit = 7): Promise<FAQRow[]> {
  const faq = await getAllFAQ();
  return faq.filter((f) => f.featured).slice(0, limit);
}

export async function getFAQByCategory(category: string): Promise<FAQRow[]> {
  const faq = await getAllFAQ();
  return faq.filter((f) => f.category === category);
}

// ─── Navigation & Socials ─────────────────────────────────────────────────────

export async function getNavigation(): Promise<NavigationRow[]> {
  return fetchFromApi<NavigationRow>('/api/navigation');
}

export async function getSocials(): Promise<SocialRow[]> {
  return fetchFromApi<SocialRow>('/api/socials');
}
