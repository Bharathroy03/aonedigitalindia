# 🗄️ Supabase Integration Guide — Aone Digital India

> Complete guide for the Supabase database integration.

---

## 📋 Table of Contents

- [Architecture Overview](#architecture-overview)
- [Credentials Reference](#credentials-reference)
- [Step 1: Create Tables](#step-1-create-tables)
- [Step 2: Install & Configure](#step-2-install--configure)
- [Step 3: Seed the Database](#step-3-seed-the-database)
- [Client Usage](#client-usage)
- [Security Model](#security-model)
- [Tables Reference](#tables-reference)
- [Regenerate Types](#regenerate-types)

---

## 🏗️ Architecture Overview

```
Browser (React)
    │
    ▼
@supabase/ssr (browser client)
    │  uses ANON key → subject to Row Level Security (RLS)
    ▼
Supabase PostgreSQL
    ▲
    │  uses SERVICE_ROLE key → bypasses RLS
@supabase/ssr (server client)
    │
Next.js Server Components / API Routes
```

**Key Principle:**
- **ANON key** — Safe for browser. All reads go through RLS policies.
- **SERVICE_ROLE key** — Server only. Used for writes (form submissions) and admin reads.

---

## 🔑 Credentials Reference

| Variable | Value | Safe for browser? |
|----------|-------|-------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://zyqxiuoyrytsbuurcwic.supabase.co` | ✅ Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOi...` (anon role) | ✅ Yes (RLS-protected) |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOi...` (service_role) | ❌ **SERVER ONLY** |

> ⚠️ **IMPORTANT**: The key you labeled "PUBLIC" is actually the `service_role` key. It has FULL admin access and bypasses all RLS. It is stored only in `SUPABASE_SERVICE_ROLE_KEY` — never prefixed with `NEXT_PUBLIC_`.

---

## 📋 Step 1: Create Tables

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/zyqxiuoyrytsbuurcwic)
2. Navigate to **SQL Editor** → **New Query**
3. Open `scripts/supabase-schema.sql`
4. Paste the entire content and click **Run**

This creates all 11 tables with:
- Row Level Security (RLS) enabled
- Public read policies for content tables
- Insert policies for form submissions
- Performance indexes
- Auto-updated `updated_at` triggers

---

## ⚙️ Step 2: Install & Configure

```bash
# Install Supabase packages
npm install @supabase/supabase-js @supabase/ssr

# Copy env template
cp .env.example .env.local
# Values are pre-filled for this project
```

---

## 🌱 Step 3: Seed the Database

After creating tables, populate them from the JSON data files:

```bash
npm run db:seed
```

This runs `scripts/seed-supabase.ts` which upserts all JSON data into Supabase.

---

## 💻 Client Usage

### In Server Components (default — preferred)

```tsx
// app/brands/page.tsx
import { getFeaturedBrands } from '@/services/brands.service';

export default async function BrandsPage() {
  const brands = await getFeaturedBrands();

  return (
    <div>
      {brands.map((brand) => (
        <BrandCard key={brand.id} brand={brand} />
      ))}
    </div>
  );
}
```

### In Client Components (with real-time / user interactions)

```tsx
'use client';
import { supabaseBrowser } from '@/lib/supabase/client';

export function BrandsClient() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    supabaseBrowser
      .from('brands')
      .select('*')
      .eq('active', true)
      .order('order')
      .then(({ data }) => setBrands(data ?? []));
  }, []);

  return <div>{/* render */}</div>;
}
```

### In API Routes

```ts
// app/api/contact/route.ts
import { saveContactSubmission } from '@/services/submissions.service';

export async function POST(request: Request) {
  const data = await request.json();
  const result = await saveContactSubmission(data);
  return Response.json(result);
}
```

---

## 🔒 Security Model

### Row Level Security Policies

| Table | Public Read | Public Write | Notes |
|-------|-------------|--------------|-------|
| `brands` | ✅ (active only) | ❌ | |
| `categories` | ✅ (active only) | ❌ | |
| `products` | ✅ (active only) | ❌ | |
| `offers` | ✅ (active only) | ❌ | |
| `testimonials` | ✅ (active only) | ❌ | |
| `gallery` | ✅ (active only) | ❌ | |
| `faq` | ✅ (active only) | ❌ | |
| `contact_submissions` | ❌ | ✅ (INSERT) | Server reads via service_role |
| `newsletter_subscribers` | ❌ | ✅ (INSERT) | Server reads via service_role |
| `socials` | ✅ (active only) | ❌ | |
| `navigation` | ✅ (active only) | ❌ | |

---

## 📊 Tables Reference

| Table | Records | Description |
|-------|---------|-------------|
| `brands` | 12 | Electronics brand catalog |
| `categories` | 8 | Product categories |
| `products` | 3+ | Featured products |
| `offers` | 3+ | Promotional offers |
| `testimonials` | 4+ | Customer reviews |
| `gallery` | 6+ | Store photos |
| `faq` | 7+ | FAQ entries |
| `team` | 0 | Team members |
| `contact_submissions` | — | Form submissions (grows over time) |
| `newsletter_subscribers` | — | Email subscribers |
| `socials` | 5 | Social media links |
| `navigation` | 6 | Nav link structure |

---

## 🔄 Regenerate Types

After modifying the database schema, regenerate TypeScript types:

```bash
# Install Supabase CLI first
npm install -g supabase

# Login
supabase login

# Generate types
npm run db:types
```

---

## 📡 Supabase Dashboard Links

- **Table Editor**: https://supabase.com/dashboard/project/zyqxiuoyrytsbuurcwic/editor
- **SQL Editor**: https://supabase.com/dashboard/project/zyqxiuoyrytsbuurcwic/sql
- **API Docs**: https://supabase.com/dashboard/project/zyqxiuoyrytsbuurcwic/api
- **Auth**: https://supabase.com/dashboard/project/zyqxiuoyrytsbuurcwic/auth/users
- **Storage**: https://supabase.com/dashboard/project/zyqxiuoyrytsbuurcwic/storage/buckets
- **Logs**: https://supabase.com/dashboard/project/zyqxiuoyrytsbuurcwic/logs/explorer

---

> **Last Updated:** July 2025
> **Maintained by:** Aone Digital India Development Team
