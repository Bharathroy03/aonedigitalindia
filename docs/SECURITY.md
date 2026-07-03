# 🔒 Security Guide — Aone Digital India

> Security practices, threat model, and implementation guidelines for the website.

---

## 📋 Table of Contents

- [Security Principles](#security-principles)
- [HTTP Security Headers](#http-security-headers)
- [Input Validation](#input-validation)
- [API Security](#api-security)
- [Environment Variables](#environment-variables)
- [Dependency Security](#dependency-security)
- [Content Security Policy](#content-security-policy)
- [CSRF Protection](#csrf-protection)
- [Rate Limiting](#rate-limiting)
- [Security Checklist](#security-checklist)

---

## 🛡️ Security Principles

1. **Defense in Depth** — Multiple layers of security
2. **Least Privilege** — Minimal permissions required
3. **Input Validation** — Never trust user input
4. **Fail Securely** — Errors don't expose sensitive info
5. **Security by Default** — Secure settings out of the box

---

## 🔖 HTTP Security Headers

Configured in `vercel.json` and `next.config.ts`:

```ts
// next.config.ts
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(self)',
  },
];
```

---

## ✅ Input Validation

All user inputs must be validated with Zod:

```ts
// lib/zod/schemas.ts
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100)
    .regex(/^[a-zA-Z\s]+$/, 'Name must contain only letters'),

  email: z
    .string()
    .email('Invalid email address')
    .toLowerCase(),

  phone: z
    .string()
    .regex(
      /^(\+91|0)?[6-9]\d{9}$/,
      'Enter a valid Indian phone number'
    ),

  message: z
    .string()
    .min(10, 'Message too short')
    .max(1000, 'Message too long')
    .trim(),
});
```

### Sanitization

```ts
// Always sanitize HTML in user content
import DOMPurify from 'dompurify';

const sanitized = DOMPurify.sanitize(userInput, {
  ALLOWED_TAGS: [],    // Strip all HTML
  ALLOWED_ATTR: [],
});
```

---

## 🔑 API Security

### Server-Side Secrets

```ts
// ✅ Never expose secrets to the client
// Server-side only (no NEXT_PUBLIC_ prefix)
const apiKey = process.env.SECRET_API_KEY;

// ❌ Never do this — exposes to client
const apiKey = process.env.NEXT_PUBLIC_SECRET_KEY;
```

### API Route Protection

```ts
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Block direct access to admin routes
  if (request.nextUrl.pathname.startsWith('/api/admin')) {
    const token = request.headers.get('x-api-key');
    if (token !== process.env.ADMIN_API_KEY) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
  }

  return NextResponse.next();
}
```

---

## 🤫 Environment Variables

### Rules

1. **Never commit** `.env.local` or `.env.production` to Git
2. Keep `.env.example` up to date with all variable names (no values)
3. Use Vercel's environment variable encryption for production
4. Rotate secrets if accidentally exposed

### .gitignore Coverage

```gitignore
# Environment files
.env
.env.local
.env.*.local
.env.production
```

---

## 📦 Dependency Security

```bash
# Audit for vulnerabilities
npm audit

# Fix automatically
npm audit fix

# Check for outdated packages
npm outdated

# Update to latest secure versions
npm update
```

### Dependabot Setup

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
    ignore:
      - dependency-name: "*"
        update-types: ["version-update:semver-major"]
```

---

## 🛡️ Content Security Policy

```ts
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: https://www.google-analytics.com;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://www.google-analytics.com;
  frame-src https://www.google.com;
`;
```

---

## 🛡️ CSRF Protection

Next.js API routes are protected from CSRF by design (same-origin policy). For additional protection:

```ts
// Verify origin header on sensitive routes
export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  const allowedOrigins = [
    'https://www.aonedigitalindia.com',
    'http://localhost:3000',
  ];

  if (!allowedOrigins.includes(origin ?? '')) {
    return new Response('Forbidden', { status: 403 });
  }
  // ... handle request
}
```

---

## 🚧 Rate Limiting

```ts
// Protect contact form from spam
// Using Upstash Redis rate limiter
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'), // 5 requests per hour
});

export async function POST(request: NextRequest) {
  const ip = request.ip ?? 'anonymous';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }
  // ... handle request
}
```

---

## ✅ Security Checklist

- [ ] All HTTP security headers set
- [ ] HTTPS enforced
- [ ] No secrets in client-side code
- [ ] All user inputs validated with Zod
- [ ] API routes rate-limited
- [ ] Dependencies audited (`npm audit`)
- [ ] `.env` files in `.gitignore`
- [ ] CSP configured
- [ ] CORS restricted to known origins
- [ ] Error messages don't expose stack traces
- [ ] No hardcoded credentials in source code

---

> **Last Updated:** 2025
> **Maintained by:** Aone Digital India Development Team
