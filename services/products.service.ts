/**
 * Products Service
 *
 * Fetches product data from the Python Flask API backend.
 */

import type { ProductRow } from '@/lib/supabase/types';

const API_URL = process.env.NEXT_PUBLIC_FLASK_API_URL || 'http://127.0.0.1:5000';

/**
 * Get all active products.
 */
export async function getAllProducts(): Promise<ProductRow[]> {
  try {
    const res = await fetch(`${API_URL}/api/products`, {
      next: { revalidate: 1800 }, // Cache for 30 minutes
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (error: any) {
    console.error('[products.service] getAllProducts failed:', error.message);
    return [];
  }
}

/**
 * Get featured products (for homepage).
 */
export async function getFeaturedProducts(limit = 6): Promise<ProductRow[]> {
  try {
    const res = await fetch(`${API_URL}/api/products?limit=${limit}`, {
      next: { revalidate: 1800 },
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data.filter((p: any) => p.featured);
  } catch (error: any) {
    console.error('[products.service] getFeaturedProducts failed:', error.message);
    return [];
  }
}

/**
 * Get products by category slug.
 */
export async function getProductsByCategory(categoryId: string): Promise<ProductRow[]> {
  try {
    const products = await getAllProducts();
    return products.filter((p) => p.category_id === categoryId);
  } catch (error: any) {
    console.error('[products.service] getProductsByCategory failed:', error.message);
    return [];
  }
}

/**
 * Get products by brand id.
 */
export async function getProductsByBrand(brandId: string): Promise<ProductRow[]> {
  try {
    const products = await getAllProducts();
    return products.filter((p) => p.brand_id === brandId);
  } catch (error: any) {
    console.error('[products.service] getProductsByBrand failed:', error.message);
    return [];
  }
}

/**
 * Get a single product by slug.
 */
export async function getProductBySlug(slug: string): Promise<ProductRow | null> {
  try {
    const products = await getAllProducts();
    return products.find((p) => p.slug === slug) || null;
  } catch (error: any) {
    console.error('[products.service] getProductBySlug failed:', error.message);
    return null;
  }
}
