/**
 * Supabase Server Client
 *
 * Use this client in:
 * - Server Components
 * - Route Handlers (app/api/*)
 * - Server Actions
 *
 * This client automatically reads cookies for session management.
 * For admin operations (bypassing RLS), use createAdminClient() instead.
 *
 * @example
 *   // Server Component
 *   import { createServerClient } from '@/lib/supabase/server';
 *   const supabase = await createServerClient();
 *   const { data } = await supabase.from('brands').select('*');
 */

import { cookies } from 'next/headers';
import { createServerClient as createSupabaseServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

import type { Database } from './types';

// ─── Server Client (session-aware, uses anon key + RLS) ──────────────────────

export async function createServerClient() {
  const cookieStore = await cookies();

  return createSupabaseServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing sessions.
          }
        },
      },
    }
  );
}

// ─── Admin Client (service_role — bypasses RLS) ───────────────────────────────
// Use ONLY in server-side code for admin operations (form submissions, etc.)
// NEVER expose to the client side.

export function createAdminClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set');
  }

  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
