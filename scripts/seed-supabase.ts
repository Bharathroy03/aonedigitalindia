/**
 * Supabase Seed Script — Aone Digital India
 *
 * Populates all Supabase tables from the local JSON data files.
 *
 * Usage:
 *   npx ts-node --project tsconfig.seed.json scripts/seed-supabase.ts
 *
 * Or via npm script:
 *   npm run db:seed
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

function loadEnvLocal() {
  try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      content.split(/\r?\n/).forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;
        const index = trimmed.indexOf('=');
        if (index > 0) {
          const key = trimmed.substring(0, index).trim();
          const val = trimmed.substring(index + 1).trim();
          process.env[key] = val.replace(/^["']|["']$/g, '');
        }
      });
    }
  } catch (err: any) {
    console.error('Failed to parse .env.local:', err.message);
  }
}

loadEnvLocal();

// ─── Local JSON data ──────────────────────────────────────────────────────────
import brands from '../data/brands.json';
import categories from '../data/categories.json';
import products from '../data/products.json';
import offers from '../data/offers.json';
import testimonials from '../data/testimonials.json';
import gallery from '../data/gallery.json';
import faq from '../data/faq.json';
import team from '../data/team.json';
import socials from '../data/socials.json';
import navigation from '../data/navigation.json';

// ─── Supabase client (service_role for seeding) ───────────────────────────────
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false },
});

// ─── Helper ───────────────────────────────────────────────────────────────────

async function upsert(table: string, data: unknown[]) {
  if (!data || data.length === 0) {
    console.log(`  ⏭️  Skipping ${table} — no data`);
    return;
  }

  const { error } = await supabase.from(table).upsert(data as any, {
    onConflict: 'id',
    ignoreDuplicates: false,
  });

  if (error) {
    console.error(`  ❌ Error seeding ${table}:`, error.message);
    throw error;
  }

  console.log(`  ✅ Seeded ${table} — ${data.length} records`);
}

// ─── Transform helpers ────────────────────────────────────────────────────────

function transformProducts(rawProducts: typeof products) {
  return rawProducts.map((p) => ({
    id:             p.id,
    name:           p.name,
    slug:           p.slug,
    brand_id:       p.brand,
    category_id:    p.category,
    image:          p.image,
    price:          p.price,
    original_price: p.originalPrice,
    discount:       p.discount,
    currency:       p.currency,
    badge:          p.badge ?? null,
    rating:         p.rating,
    review_count:   p.reviewCount,
    in_stock:       p.inStock,
    featured:       p.featured,
    description:    p.description,
    specifications: p.specifications ?? {},
    order:          p.order,
    active:         true,
  }));
}

function transformOffers(rawOffers: typeof offers) {
  return rawOffers.map((o) => ({
    id:             o.id,
    title:          o.title,
    subtitle:       o.subtitle,
    description:    o.description,
    discount_label: o.discountLabel,
    image:          o.image,
    cta_text:       o.ctaText,
    cta_link:       o.ctaLink,
    valid_from:     o.validFrom,
    valid_until:    o.validUntil,
    featured:       o.featured,
    badge:          o.badge,
    badge_color:    o.badgeColor,
    order:          o.order,
    active:         o.active,
  }));
}

function transformTestimonials(rawTestimonials: typeof testimonials) {
  return rawTestimonials.map((t) => ({
    id:          t.id,
    name:        t.name,
    location:    t.location,
    avatar:      t.avatar,
    rating:      t.rating,
    review:      t.review,
    product:     t.product ?? null,
    review_date: t.date,
    verified:    t.verified,
    featured:    t.featured,
    order:       t.order,
    active:      true,
  }));
}

function transformNavigation(navData: typeof navigation) {
  return navData.main.map((n) => ({
    id:           n.id,
    label:        n.label,
    href:         n.href,
    order:        n.order,
    badge:        (n as any).badge ?? null,
    has_dropdown: n.hasDropdown ?? false,
    dropdown:     n.dropdown ?? [],
    active:       true,
  }));
}

// ─── Main seed function ───────────────────────────────────────────────────────

async function seed() {
  console.log('\n🌱 Starting Aone Digital India database seed...\n');
  console.log(`📡 Supabase URL: ${supabaseUrl}\n`);

  try {
    // Seed in dependency order (brands/categories before products)
    await upsert('brands', brands);
    await upsert('categories', categories);
    await upsert('products', transformProducts(products));
    await upsert('offers', transformOffers(offers));
    await upsert('testimonials', transformTestimonials(testimonials));
    await upsert('gallery', gallery);
    await upsert('faq', faq);
    await upsert('team', team);
    await upsert('socials', socials);
    await upsert('navigation', transformNavigation(navigation));

    console.log('\n✨ Database seeding complete!\n');
  } catch (err) {
    console.error('\n💥 Seeding failed:', err);
    process.exit(1);
  }
}

seed();
