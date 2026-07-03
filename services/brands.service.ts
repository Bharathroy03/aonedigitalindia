/**
 * Brands Service
 *
 * All brand-related database queries.
 * These run server-side (Server Components, Route Handlers).
 */

import { createServerClient } from '@/lib/supabase/server';
import type { BrandRow } from '@/lib/supabase/types';

// ─── Types ────────────────────────────────────────────────────────────────────

export type BrandWithRelations = BrandRow;

// ─── Queries ──────────────────────────────────────────────────────────────────

/**
 * Get all active brands, ordered by display order.
 */
export async function getAllBrands(): Promise<BrandRow[]> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('active', true)
    .order('order', { ascending: true });

  if (error) {
    console.error('[brands.service] getAllBrands:', error.message);
    return [];
  }

  return data ?? [];
}

/**
 * Get only featured brands.
 */
export async function getFeaturedBrands(): Promise<BrandRow[]> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('active', true)
    .eq('featured', true)
    .order('order', { ascending: true });

  if (error) {
    console.error('[brands.service] getFeaturedBrands:', error.message);
    return [];
  }

  return data ?? [];
}

/**
 * Get a single brand by slug.
 */
export async function getBrandBySlug(slug: string): Promise<BrandRow | null> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .single();

  if (error) {
    console.error('[brands.service] getBrandBySlug:', error.message);
    return null;
  }

  return data;
}

/**
 * Get brands filtered by category (e.g., 'mobile', 'appliances').
 */
export async function getBrandsByCategory(category: string): Promise<BrandRow[]> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('active', true)
    .contains('category', [category])
    .order('order', { ascending: true });

  if (error) {
    console.error('[brands.service] getBrandsByCategory:', error.message);
    return [];
  }

  return data ?? [];
}
