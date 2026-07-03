-- ============================================================
-- AONE DIGITAL INDIA — SUPABASE DATABASE SCHEMA
-- ============================================================
-- Run this file in the Supabase SQL Editor to create all tables.
-- Dashboard → SQL Editor → New query → Paste → Run
-- Project URL: https://zyqxiuoyrytsbuurcwic.supabase.co
-- ============================================================

-- Enable useful extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLE: brands
-- ============================================================
CREATE TABLE IF NOT EXISTS public.brands (
  id           TEXT PRIMARY KEY,
  name         TEXT NOT NULL,
  slug         TEXT UNIQUE NOT NULL,
  logo         TEXT,
  category     TEXT[] DEFAULT '{}',
  description  TEXT,
  featured     BOOLEAN DEFAULT false,
  "order"      INTEGER DEFAULT 0,
  active       BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.brands IS 'Mobile phone and appliance brand catalog';

-- ============================================================
-- TABLE: categories
-- ============================================================
CREATE TABLE IF NOT EXISTS public.categories (
  id           TEXT PRIMARY KEY,
  name         TEXT NOT NULL,
  slug         TEXT UNIQUE NOT NULL,
  icon         TEXT,
  image        TEXT,
  description  TEXT,
  featured     BOOLEAN DEFAULT false,
  item_count   INTEGER DEFAULT 0,
  "order"      INTEGER DEFAULT 0,
  active       BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.categories IS 'Product categories (smartphones, appliances, etc.)';

-- ============================================================
-- TABLE: products
-- ============================================================
CREATE TABLE IF NOT EXISTS public.products (
  id             TEXT PRIMARY KEY,
  name           TEXT NOT NULL,
  slug           TEXT UNIQUE NOT NULL,
  brand_id       TEXT REFERENCES public.brands(id) ON DELETE SET NULL,
  category_id    TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
  image          TEXT,
  price          NUMERIC(12, 2) NOT NULL DEFAULT 0,
  original_price NUMERIC(12, 2) NOT NULL DEFAULT 0,
  discount       INTEGER DEFAULT 0,
  currency       TEXT DEFAULT 'INR',
  badge          TEXT,
  rating         NUMERIC(3, 1) DEFAULT 0,
  review_count   INTEGER DEFAULT 0,
  in_stock       BOOLEAN DEFAULT true,
  featured       BOOLEAN DEFAULT false,
  description    TEXT,
  specifications JSONB DEFAULT '{}',
  "order"        INTEGER DEFAULT 0,
  active         BOOLEAN DEFAULT true,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.products IS 'Featured product listings';

-- ============================================================
-- TABLE: offers
-- ============================================================
CREATE TABLE IF NOT EXISTS public.offers (
  id             TEXT PRIMARY KEY,
  title          TEXT NOT NULL,
  subtitle       TEXT,
  description    TEXT,
  discount_label TEXT,
  image          TEXT,
  cta_text       TEXT DEFAULT 'Shop Now',
  cta_link       TEXT,
  valid_from     DATE,
  valid_until    DATE,
  featured       BOOLEAN DEFAULT false,
  badge          TEXT,
  badge_color    TEXT DEFAULT 'blue',
  "order"        INTEGER DEFAULT 0,
  active         BOOLEAN DEFAULT true,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.offers IS 'Promotional offers and deals';

-- ============================================================
-- TABLE: testimonials
-- ============================================================
CREATE TABLE IF NOT EXISTS public.testimonials (
  id           TEXT PRIMARY KEY,
  name         TEXT NOT NULL,
  location     TEXT,
  avatar       TEXT,
  rating       INTEGER DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  review       TEXT NOT NULL,
  product      TEXT,
  review_date  DATE DEFAULT CURRENT_DATE,
  verified     BOOLEAN DEFAULT false,
  featured     BOOLEAN DEFAULT false,
  "order"      INTEGER DEFAULT 0,
  active       BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.testimonials IS 'Customer reviews and testimonials';

-- ============================================================
-- TABLE: gallery
-- ============================================================
CREATE TABLE IF NOT EXISTS public.gallery (
  id          TEXT PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT,
  image       TEXT NOT NULL,
  thumbnail   TEXT,
  category    TEXT DEFAULT 'store',
  featured    BOOLEAN DEFAULT false,
  "order"     INTEGER DEFAULT 0,
  active      BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.gallery IS 'Store photo gallery images';

-- ============================================================
-- TABLE: faq
-- ============================================================
CREATE TABLE IF NOT EXISTS public.faq (
  id          TEXT PRIMARY KEY,
  question    TEXT NOT NULL,
  answer      TEXT NOT NULL,
  category    TEXT DEFAULT 'general',
  "order"     INTEGER DEFAULT 0,
  featured    BOOLEAN DEFAULT false,
  active      BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.faq IS 'Frequently asked questions';

-- ============================================================
-- TABLE: team
-- ============================================================
CREATE TABLE IF NOT EXISTS public.team (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  role        TEXT,
  avatar      TEXT,
  bio         TEXT,
  email       TEXT,
  linkedin    TEXT,
  "order"     INTEGER DEFAULT 0,
  active      BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.team IS 'Team member profiles';

-- ============================================================
-- TABLE: contact_submissions
-- (Stores form submissions from website)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  subject     TEXT,
  message     TEXT NOT NULL,
  product     TEXT,
  ip_address  TEXT,
  status      TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.contact_submissions IS 'Incoming customer inquiries from the contact form';

-- ============================================================
-- TABLE: newsletter_subscribers
-- ============================================================
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email         TEXT UNIQUE NOT NULL,
  name          TEXT,
  status        TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.newsletter_subscribers IS 'Email newsletter subscribers';

-- ============================================================
-- TABLE: socials
-- ============================================================
CREATE TABLE IF NOT EXISTS public.socials (
  id        TEXT PRIMARY KEY,
  name      TEXT NOT NULL,
  label     TEXT,
  url       TEXT NOT NULL,
  icon      TEXT,
  color     TEXT,
  active    BOOLEAN DEFAULT true,
  "order"   INTEGER DEFAULT 0
);

COMMENT ON TABLE public.socials IS 'Social media links';

-- ============================================================
-- TABLE: navigation
-- ============================================================
CREATE TABLE IF NOT EXISTS public.navigation (
  id           TEXT PRIMARY KEY,
  label        TEXT NOT NULL,
  href         TEXT NOT NULL,
  "order"      INTEGER DEFAULT 0,
  badge        TEXT,
  has_dropdown BOOLEAN DEFAULT false,
  dropdown     JSONB DEFAULT '[]',
  active       BOOLEAN DEFAULT true
);

COMMENT ON TABLE public.navigation IS 'Main navigation link structure';

-- ============================================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
DO $$
DECLARE
  t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'brands', 'categories', 'products', 'offers',
    'testimonials', 'gallery', 'faq', 'team',
    'contact_submissions', 'newsletter_subscribers'
  ]
  LOOP
    EXECUTE format('
      CREATE TRIGGER handle_updated_at
      BEFORE UPDATE ON public.%I
      FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
    ', t);
  END LOOP;
END $$;

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE public.brands                ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers                ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faq                   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.socials               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.navigation            ENABLE ROW LEVEL SECURITY;

-- ── Public READ policies (anon can read active content) ─────────────────────

CREATE POLICY "Public can read active brands"
  ON public.brands FOR SELECT USING (active = true);

CREATE POLICY "Public can read active categories"
  ON public.categories FOR SELECT USING (active = true);

CREATE POLICY "Public can read active products"
  ON public.products FOR SELECT USING (active = true);

CREATE POLICY "Public can read active offers"
  ON public.offers FOR SELECT USING (active = true);

CREATE POLICY "Public can read active testimonials"
  ON public.testimonials FOR SELECT USING (active = true);

CREATE POLICY "Public can read active gallery"
  ON public.gallery FOR SELECT USING (active = true);

CREATE POLICY "Public can read active faq"
  ON public.faq FOR SELECT USING (active = true);

CREATE POLICY "Public can read active team"
  ON public.team FOR SELECT USING (active = true);

CREATE POLICY "Public can read active socials"
  ON public.socials FOR SELECT USING (active = true);

CREATE POLICY "Public can read active navigation"
  ON public.navigation FOR SELECT USING (active = true);

-- ── INSERT policies (public can submit forms) ────────────────────────────────

CREATE POLICY "Anyone can submit contact form"
  ON public.contact_submissions FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can subscribe to newsletter"
  ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);

-- ── No public read on sensitive tables ──────────────────────────────────────
-- contact_submissions and newsletter_subscribers are read-only by service_role
-- (server-side API routes use the service_role key)

-- ============================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================
CREATE INDEX idx_brands_slug       ON public.brands (slug);
CREATE INDEX idx_brands_featured   ON public.brands (featured) WHERE active = true;
CREATE INDEX idx_categories_slug   ON public.categories (slug);
CREATE INDEX idx_products_slug     ON public.products (slug);
CREATE INDEX idx_products_brand    ON public.products (brand_id);
CREATE INDEX idx_products_category ON public.products (category_id);
CREATE INDEX idx_products_featured ON public.products (featured) WHERE active = true;
CREATE INDEX idx_offers_active     ON public.offers (active, valid_until);
CREATE INDEX idx_testimonials_feat ON public.testimonials (featured) WHERE active = true;
CREATE INDEX idx_gallery_category  ON public.gallery (category) WHERE active = true;
CREATE INDEX idx_faq_category      ON public.faq (category) WHERE active = true;
CREATE INDEX idx_contact_status    ON public.contact_submissions (status, created_at);
CREATE INDEX idx_newsletter_email  ON public.newsletter_subscribers (email);

-- ============================================================
-- DONE
-- ============================================================
-- Next step: Run the seed script to populate data from JSON files.
-- See: scripts/seed-supabase.ts
-- ============================================================
