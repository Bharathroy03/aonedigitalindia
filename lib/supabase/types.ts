/**
 * Supabase TypeScript Database Types
 *
 * These types are generated from the Supabase database schema.
 * They provide full type safety for all Supabase queries.
 *
 * To regenerate after schema changes:
 *   npx supabase gen types typescript --project-id zyqxiuoyrytsbuurcwic > lib/supabase/types.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      brands: {
        Row: {
          id:          string;
          name:        string;
          slug:        string;
          logo:        string | null;
          category:    string[];
          description: string | null;
          featured:    boolean;
          order:       number;
          active:      boolean;
          created_at:  string;
          updated_at:  string;
        };
        Insert: {
          id:          string;
          name:        string;
          slug:        string;
          logo?:       string | null;
          category?:   string[];
          description?: string | null;
          featured?:   boolean;
          order?:      number;
          active?:     boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['brands']['Insert']>;
      };

      categories: {
        Row: {
          id:          string;
          name:        string;
          slug:        string;
          icon:        string | null;
          image:       string | null;
          description: string | null;
          featured:    boolean;
          item_count:  number;
          order:       number;
          active:      boolean;
          created_at:  string;
          updated_at:  string;
        };
        Insert: {
          id:          string;
          name:        string;
          slug:        string;
          icon?:       string | null;
          image?:      string | null;
          description?: string | null;
          featured?:   boolean;
          item_count?: number;
          order?:      number;
          active?:     boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['categories']['Insert']>;
      };

      products: {
        Row: {
          id:             string;
          name:           string;
          slug:           string;
          brand_id:       string | null;
          category_id:    string | null;
          image:          string | null;
          price:          number;
          original_price: number;
          discount:       number;
          currency:       string;
          badge:          string | null;
          rating:         number;
          review_count:   number;
          in_stock:       boolean;
          featured:       boolean;
          description:    string | null;
          specifications: Json;
          order:          number;
          active:         boolean;
          created_at:     string;
          updated_at:     string;
        };
        Insert: {
          id:             string;
          name:           string;
          slug:           string;
          brand_id?:      string | null;
          category_id?:   string | null;
          image?:         string | null;
          price:          number;
          original_price: number;
          discount?:      number;
          currency?:      string;
          badge?:         string | null;
          rating?:        number;
          review_count?:  number;
          in_stock?:      boolean;
          featured?:      boolean;
          description?:   string | null;
          specifications?: Json;
          order?:         number;
          active?:        boolean;
          created_at?:    string;
          updated_at?:    string;
        };
        Update: Partial<Database['public']['Tables']['products']['Insert']>;
      };

      offers: {
        Row: {
          id:             string;
          title:          string;
          subtitle:       string | null;
          description:    string | null;
          discount_label: string | null;
          image:          string | null;
          cta_text:       string;
          cta_link:       string | null;
          valid_from:     string | null;
          valid_until:    string | null;
          featured:       boolean;
          badge:          string | null;
          badge_color:    string;
          order:          number;
          active:         boolean;
          created_at:     string;
          updated_at:     string;
        };
        Insert: {
          id:             string;
          title:          string;
          subtitle?:      string | null;
          description?:   string | null;
          discount_label?: string | null;
          image?:         string | null;
          cta_text?:      string;
          cta_link?:      string | null;
          valid_from?:    string | null;
          valid_until?:   string | null;
          featured?:      boolean;
          badge?:         string | null;
          badge_color?:   string;
          order?:         number;
          active?:        boolean;
          created_at?:    string;
          updated_at?:    string;
        };
        Update: Partial<Database['public']['Tables']['offers']['Insert']>;
      };

      testimonials: {
        Row: {
          id:          string;
          name:        string;
          location:    string | null;
          avatar:      string | null;
          rating:      number;
          review:      string;
          product:     string | null;
          review_date: string;
          verified:    boolean;
          featured:    boolean;
          order:       number;
          active:      boolean;
          created_at:  string;
          updated_at:  string;
        };
        Insert: {
          id:          string;
          name:        string;
          location?:   string | null;
          avatar?:     string | null;
          rating?:     number;
          review:      string;
          product?:    string | null;
          review_date?: string;
          verified?:   boolean;
          featured?:   boolean;
          order?:      number;
          active?:     boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['testimonials']['Insert']>;
      };

      gallery: {
        Row: {
          id:          string;
          title:       string;
          description: string | null;
          image:       string;
          thumbnail:   string | null;
          category:    string;
          featured:    boolean;
          order:       number;
          active:      boolean;
          created_at:  string;
          updated_at:  string;
        };
        Insert: {
          id:          string;
          title:       string;
          description?: string | null;
          image:       string;
          thumbnail?:  string | null;
          category?:   string;
          featured?:   boolean;
          order?:      number;
          active?:     boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['gallery']['Insert']>;
      };

      faq: {
        Row: {
          id:         string;
          question:   string;
          answer:     string;
          category:   string;
          order:      number;
          featured:   boolean;
          active:     boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id:         string;
          question:   string;
          answer:     string;
          category?:  string;
          order?:     number;
          featured?:  boolean;
          active?:    boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['faq']['Insert']>;
      };

      contact_submissions: {
        Row: {
          id:         string;
          name:       string;
          email:      string;
          phone:      string | null;
          subject:    string | null;
          message:    string;
          product:    string | null;
          ip_address: string | null;
          status:     'new' | 'read' | 'replied' | 'archived';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?:        string;
          name:       string;
          email:      string;
          phone?:     string | null;
          subject?:   string | null;
          message:    string;
          product?:   string | null;
          ip_address?: string | null;
          status?:    'new' | 'read' | 'replied' | 'archived';
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['contact_submissions']['Insert']>;
      };

      newsletter_subscribers: {
        Row: {
          id:            string;
          email:         string;
          name:          string | null;
          status:        'active' | 'unsubscribed';
          subscribed_at: string;
          created_at:    string;
        };
        Insert: {
          id?:           string;
          email:         string;
          name?:         string | null;
          status?:       'active' | 'unsubscribed';
          subscribed_at?: string;
          created_at?:   string;
        };
        Update: Partial<Database['public']['Tables']['newsletter_subscribers']['Insert']>;
      };

      socials: {
        Row: {
          id:     string;
          name:   string;
          label:  string | null;
          url:    string;
          icon:   string | null;
          color:  string | null;
          active: boolean;
          order:  number;
        };
        Insert: {
          id:     string;
          name:   string;
          label?: string | null;
          url:    string;
          icon?:  string | null;
          color?: string | null;
          active?: boolean;
          order?:  number;
        };
        Update: Partial<Database['public']['Tables']['socials']['Insert']>;
      };

      navigation: {
        Row: {
          id:           string;
          label:        string;
          href:         string;
          order:        number;
          badge:        string | null;
          has_dropdown: boolean;
          dropdown:     Json;
          active:       boolean;
        };
        Insert: {
          id:           string;
          label:        string;
          href:         string;
          order?:       number;
          badge?:       string | null;
          has_dropdown?: boolean;
          dropdown?:    Json;
          active?:      boolean;
        };
        Update: Partial<Database['public']['Tables']['navigation']['Insert']>;
      };
    };

    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};

// ─── Convenience Row Types ────────────────────────────────────────────────────

export type BrandRow           = Database['public']['Tables']['brands']['Row'];
export type CategoryRow        = Database['public']['Tables']['categories']['Row'];
export type ProductRow         = Database['public']['Tables']['products']['Row'];
export type OfferRow           = Database['public']['Tables']['offers']['Row'];
export type TestimonialRow     = Database['public']['Tables']['testimonials']['Row'];
export type GalleryRow         = Database['public']['Tables']['gallery']['Row'];
export type FAQRow             = Database['public']['Tables']['faq']['Row'];
export type ContactRow         = Database['public']['Tables']['contact_submissions']['Row'];
export type SubscriberRow      = Database['public']['Tables']['newsletter_subscribers']['Row'];
export type SocialRow          = Database['public']['Tables']['socials']['Row'];
export type NavigationRow      = Database['public']['Tables']['navigation']['Row'];

// ─── Insert Types ─────────────────────────────────────────────────────────────

export type ContactInsert    = Database['public']['Tables']['contact_submissions']['Insert'];
export type SubscriberInsert = Database['public']['Tables']['newsletter_subscribers']['Insert'];
