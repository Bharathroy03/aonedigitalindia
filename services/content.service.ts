/**
 * Content Services — Categories, Offers, Testimonials, Gallery, FAQ
 *
 * Consolidated service for all read-only content queries.
 */

import { createServerClient } from '@/lib/supabase/server';
import type {
  CategoryRow,
  OfferRow,
  TestimonialRow,
  GalleryRow,
  FAQRow,
  NavigationRow,
  SocialRow,
} from '@/lib/supabase/types';

// ─── Categories ───────────────────────────────────────────────────────────────

export async function getAllCategories(): Promise<CategoryRow[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('active', true)
    .order('order', { ascending: true });

  if (error) { console.error('[categories] getAllCategories:', error.message); return []; }
  return data ?? [];
}

export async function getFeaturedCategories(): Promise<CategoryRow[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('active', true)
    .eq('featured', true)
    .order('order', { ascending: true });

  if (error) { console.error('[categories] getFeaturedCategories:', error.message); return []; }
  return data ?? [];
}

export async function getCategoryBySlug(slug: string): Promise<CategoryRow | null> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .single();

  if (error) { console.error('[categories] getCategoryBySlug:', error.message); return null; }
  return data;
}

// ─── Offers ───────────────────────────────────────────────────────────────────

export async function getAllOffers(): Promise<OfferRow[]> {
  const supabase = await createServerClient();
  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('offers')
    .select('*')
    .eq('active', true)
    .gte('valid_until', today) // Only return non-expired offers
    .order('order', { ascending: true });

  if (error) { console.error('[offers] getAllOffers:', error.message); return []; }
  return data ?? [];
}

export async function getFeaturedOffers(limit = 3): Promise<OfferRow[]> {
  const supabase = await createServerClient();
  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('offers')
    .select('*')
    .eq('active', true)
    .eq('featured', true)
    .gte('valid_until', today)
    .order('order', { ascending: true })
    .limit(limit);

  if (error) { console.error('[offers] getFeaturedOffers:', error.message); return []; }
  return data ?? [];
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export async function getAllTestimonials(): Promise<TestimonialRow[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('active', true)
    .order('order', { ascending: true });

  if (error) { console.error('[testimonials] getAllTestimonials:', error.message); return []; }
  return data ?? [];
}

export async function getFeaturedTestimonials(limit = 4): Promise<TestimonialRow[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('active', true)
    .eq('featured', true)
    .order('order', { ascending: true })
    .limit(limit);

  if (error) { console.error('[testimonials] getFeaturedTestimonials:', error.message); return []; }
  return data ?? [];
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

export async function getAllGallery(): Promise<GalleryRow[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .eq('active', true)
    .order('order', { ascending: true });

  if (error) { console.error('[gallery] getAllGallery:', error.message); return []; }
  return data ?? [];
}

export async function getFeaturedGallery(limit = 6): Promise<GalleryRow[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .eq('active', true)
    .eq('featured', true)
    .order('order', { ascending: true })
    .limit(limit);

  if (error) { console.error('[gallery] getFeaturedGallery:', error.message); return []; }
  return data ?? [];
}

export async function getGalleryByCategory(category: string): Promise<GalleryRow[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .eq('active', true)
    .eq('category', category)
    .order('order', { ascending: true });

  if (error) { console.error('[gallery] getGalleryByCategory:', error.message); return []; }
  return data ?? [];
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export async function getAllFAQ(): Promise<FAQRow[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('faq')
    .select('*')
    .eq('active', true)
    .order('order', { ascending: true });

  if (error) { console.error('[faq] getAllFAQ:', error.message); return []; }
  return data ?? [];
}

export async function getFeaturedFAQ(limit = 7): Promise<FAQRow[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('faq')
    .select('*')
    .eq('active', true)
    .eq('featured', true)
    .order('order', { ascending: true })
    .limit(limit);

  if (error) { console.error('[faq] getFeaturedFAQ:', error.message); return []; }
  return data ?? [];
}

export async function getFAQByCategory(category: string): Promise<FAQRow[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('faq')
    .select('*')
    .eq('active', true)
    .eq('category', category)
    .order('order', { ascending: true });

  if (error) { console.error('[faq] getFAQByCategory:', error.message); return []; }
  return data ?? [];
}

// ─── Navigation & Socials ─────────────────────────────────────────────────────

export async function getNavigation(): Promise<NavigationRow[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('navigation')
    .select('*')
    .eq('active', true)
    .order('order', { ascending: true });

  if (error) { console.error('[navigation] getNavigation:', error.message); return []; }
  return data ?? [];
}

export async function getSocials(): Promise<SocialRow[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('socials')
    .select('*')
    .eq('active', true)
    .order('order', { ascending: true });

  if (error) { console.error('[socials] getSocials:', error.message); return []; }
  return data ?? [];
}
