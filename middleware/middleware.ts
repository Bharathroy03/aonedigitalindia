import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * Next.js 15 Middleware
 *
 * Runs on every request before the page is rendered.
 * Handles: security headers, maintenance mode, geo-blocking (if needed)
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ─── Maintenance Mode ─────────────────────────────────────────────────────
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

  if (isMaintenanceMode && pathname !== '/maintenance') {
    return NextResponse.redirect(new URL('/maintenance', request.url));
  }

  // ─── Block API access from unauthorized origins ───────────────────────────
  if (pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin');
    const allowedOrigins = [
      process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.aonedigitalindia.com',
      'http://localhost:3000',
    ];

    // Only check origin for non-GET requests
    if (
      request.method !== 'GET' &&
      origin &&
      !allowedOrigins.includes(origin)
    ) {
      return new NextResponse('Forbidden', { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public folder assets
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
