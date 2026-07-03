/**
 * lib/supabase/index.ts
 *
 * Central export barrel for all Supabase utilities.
 *
 * Usage:
 *   import { createServerClient, createAdminClient } from '@/lib/supabase';
 *   import type { BrandRow, ProductRow } from '@/lib/supabase';
 */

export { createBrowserClient, supabaseBrowser } from './client';
export { createServerClient, createAdminClient } from './server';
export { updateSession } from './middleware';

export type {
  Database,
  BrandRow,
  CategoryRow,
  ProductRow,
  OfferRow,
  TestimonialRow,
  GalleryRow,
  FAQRow,
  ContactRow,
  SubscriberRow,
  SocialRow,
  NavigationRow,
  ContactInsert,
  SubscriberInsert,
} from './types';
