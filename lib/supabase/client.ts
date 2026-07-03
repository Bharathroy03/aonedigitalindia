/**
 * Supabase Browser Client
 *
 * Use this client in Client Components ('use client').
 * Safe for browser use — uses the public ANON key.
 *
 * @example
 *   import { createBrowserClient } from '@/lib/supabase/client';
 *   const supabase = createBrowserClient();
 *   const { data } = await supabase.from('brands').select('*');
 */

'use client';

import { createBrowserClient as createSupabaseBrowserClient } from '@supabase/ssr';

import type { Database } from './types';

export function createBrowserClient() {
  return createSupabaseBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

/**
 * Singleton browser client instance for client components.
 * Import this directly in client components for convenience.
 */
export const supabaseBrowser = createBrowserClient();
