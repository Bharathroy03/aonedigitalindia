/**
 * POST /api/contact
 *
 * Handles contact form submissions.
 * Validates input → Saves to Supabase → Sends email notification.
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { saveContactSubmission } from '@/services/submissions.service';
import { sendContactEmail } from '@/services/email.service';

// ─── Validation Schema ────────────────────────────────────────────────────────

const contactSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(2, 'Name must be at least 2 characters')
    .max(100),

  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email address')
    .toLowerCase(),

  phone: z
    .string({ required_error: 'Phone is required' })
    .regex(/^(\+91|91|0)?[6-9]\d{9}$/, 'Enter a valid Indian mobile number'),

  subject: z
    .string({ required_error: 'Subject is required' })
    .min(5)
    .max(200),

  message: z
    .string({ required_error: 'Message is required' })
    .min(10)
    .max(1000),

  product: z.string().max(200).optional(),

  // Honeypot spam prevention
  honeypot: z.string().max(0, 'Bot detected').optional(),
});

// ─── Rate limiting (basic in-memory, use Upstash in production) ───────────────

const requestCounts = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const limit = requestCounts.get(ip);

  if (!limit || now > limit.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 }); // 1 hour
    return false;
  }

  if (limit.count >= 5) return true; // 5 requests per hour

  limit.count++;
  return false;
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') ?? 'anonymous';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse & validate body
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: parsed.error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    const { honeypot, ...formData } = parsed.data;

    // Honeypot check
    if (honeypot && honeypot.length > 0) {
      // Silently succeed to fool bots
      return NextResponse.json({ success: true });
    }

    // 1. Save to Supabase
    const submission = await saveContactSubmission({
      ...formData,
      ipAddress: ip,
    });

    if (!submission.success) {
      console.error('[api/contact] Failed to save submission:', submission.error);
      // Continue even if DB save fails — still send email
    }

    // 2. Send email notification (non-blocking on DB failure)
    await sendContactEmail(formData).catch((err: unknown) => {
      console.error('[api/contact] Email failed:', err);
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! We will contact you within 24 hours.',
        reference: submission.id
          ? `AONE-${submission.id.split('-')[0].toUpperCase()}`
          : undefined,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[api/contact] Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

// Only POST is supported
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
