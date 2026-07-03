import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

/**
 * Next.js 15 Middleware
 *
 * - Refreshes Supabase auth sessions on every request
 * - Enforces maintenance mode
 * - Protects admin API routes
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ─── Maintenance Mode ─────────────────────────────────────────────────────
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
  if (isMaintenanceMode && pathname !== '/maintenance') {
    const url = request.nextUrl.clone();
    url.pathname = '/maintenance';
    return Response.redirect(url);
  }

  // ─── Supabase session refresh (required for Server Components) ────────────
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT static files and images.
     */
    '/((?!_next/static|_next/image|favicon.ico|public/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
};
