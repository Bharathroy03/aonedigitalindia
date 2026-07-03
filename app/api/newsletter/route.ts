/**
 * POST /api/newsletter
 *
 * Handles newsletter subscriptions.
 * Validates email → Saves to Supabase newsletter_subscribers table.
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { subscribeToNewsletter } from '@/services/submissions.service';

// ─── Validation ───────────────────────────────────────────────────────────────

const newsletterSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),

  name: z.string().min(2).max(100).optional(),
});

// ─── Handler ──────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = newsletterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email address',
          details: parsed.error.errors,
        },
        { status: 400 }
      );
    }

    const { email, name } = parsed.data;

    // Save to Supabase (upsert handles duplicates)
    const result = await subscribeToNewsletter(email, name);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed! Thank you for joining Aone Digital India.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[api/newsletter] Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
