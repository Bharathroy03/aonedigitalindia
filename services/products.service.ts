/**
 * Products Service
 *
 * All product-related database queries.
 */

import { createServerClient } from '@/lib/supabase/server';
import type { ProductRow } from '@/lib/supabase/types';

// ─── Queries ──────────────────────────────────────────────────────────────────

/**
 * Get all active products.
 */
export async function getAllProducts(): Promise<ProductRow[]> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('active', true)
    .order('order', { ascending: true });

  if (error) {
    console.error('[products.service] getAllProducts:', error.message);
    return [];
  }

  return data ?? [];
}

/**
 * Get featured products (for homepage).
 */
export async function getFeaturedProducts(limit = 6): Promise<ProductRow[]> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('active', true)
    .eq('featured', true)
    .order('order', { ascending: true })
    .limit(limit);

  if (error) {
    console.error('[products.service] getFeaturedProducts:', error.message);
    return [];
  }

  return data ?? [];
}

/**
 * Get products by category slug.
 */
export async function getProductsByCategory(categoryId: string): Promise<ProductRow[]> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('active', true)
    .eq('category_id', categoryId)
    .order('order', { ascending: true });

  if (error) {
    console.error('[products.service] getProductsByCategory:', error.message);
    return [];
  }

  return data ?? [];
}

/**
 * Get products by brand id.
 */
export async function getProductsByBrand(brandId: string): Promise<ProductRow[]> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('active', true)
    .eq('brand_id', brandId)
    .order('order', { ascending: true });

  if (error) {
    console.error('[products.service] getProductsByBrand:', error.message);
    return [];
  }

  return data ?? [];
}

/**
 * Get a single product by slug.
 */
export async function getProductBySlug(slug: string): Promise<ProductRow | null> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .single();

  if (error) {
    console.error('[products.service] getProductBySlug:', error.message);
    return null;
  }

  return data;
}
