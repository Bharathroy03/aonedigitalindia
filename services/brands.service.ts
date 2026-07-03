/**
 * Brands Service
 *
 * Fetches brand-related data from the Python Flask API backend.
 */

import type { BrandRow } from '@/lib/supabase/types';

const API_URL = process.env.NEXT_PUBLIC_FLASK_API_URL || 'http://127.0.0.1:5000';

/**
 * Get all active brands, ordered by display order.
 */
export async function getAllBrands(): Promise<BrandRow[]> {
  try {
    const res = await fetch(`${API_URL}/api/brands`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (error: any) {
    console.error('[brands.service] getAllBrands failed:', error.message);
    return [];
  }
}

/**
 * Get only featured brands.
 */
export async function getFeaturedBrands(): Promise<BrandRow[]> {
  try {
    const brands = await getAllBrands();
    return brands.filter((b) => b.featured);
  } catch (error: any) {
    console.error('[brands.service] getFeaturedBrands failed:', error.message);
    return [];
  }
}

/**
 * Get a single brand by slug.
 */
export async function getBrandBySlug(slug: string): Promise<BrandRow | null> {
  try {
    const brands = await getAllBrands();
    return brands.find((b) => b.slug === slug) || null;
  } catch (error: any) {
    console.error('[brands.service] getBrandBySlug failed:', error.message);
    return null;
  }
}

/**
 * Get brands filtered by category (e.g., 'mobile', 'appliances').
 */
export async function getBrandsByCategory(category: string): Promise<BrandRow[]> {
  try {
    const brands = await getAllBrands();
    return brands.filter((b) => b.category && b.category.includes(category));
  } catch (error: any) {
    console.error('[brands.service] getBrandsByCategory failed:', error.message);
    return [];
  }
}
