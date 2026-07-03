import { z } from 'zod';

/**
 * Zod validation schemas for all forms and API inputs.
 * Centralized schema definitions for reuse across client and server.
 */

// ─── Contact Form Schema ─────────────────────────────────────────────────────

export const contactFormSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name must contain only letters and spaces'),

  email: z
    .string({ required_error: 'Email is required' })
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),

  phone: z
    .string({ required_error: 'Phone number is required' })
    .regex(
      /^(\+91|91|0)?[6-9]\d{9}$/,
      'Please enter a valid 10-digit Indian mobile number'
    ),

  subject: z
    .string({ required_error: 'Subject is required' })
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject cannot exceed 200 characters'),

  message: z
    .string({ required_error: 'Message is required' })
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message cannot exceed 1000 characters')
    .trim(),

  product: z.string().max(200).optional(),

  honeypot: z.string().max(0, 'Bot detected').optional(), // Spam prevention
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// ─── Newsletter Schema ────────────────────────────────────────────────────────

export const newsletterSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),

  name: z.string().min(2).max(100).optional(),
});

export type NewsletterData = z.infer<typeof newsletterSchema>;

// ─── Search Schema ────────────────────────────────────────────────────────────

export const searchSchema = z.object({
  query: z
    .string()
    .min(2, 'Search term must be at least 2 characters')
    .max(100, 'Search term too long')
    .trim(),

  category: z.string().optional(),
  brand: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
});

export type SearchData = z.infer<typeof searchSchema>;
