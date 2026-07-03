/**
 * POST /api/newsletter
 *
 * Proxy API handler that forwards newsletter subscriptions to the Python Flask backend.
 */

import { NextRequest, NextResponse } from 'next/server';

const FLASK_API_URL = process.env.NEXT_PUBLIC_FLASK_API_URL || 'http://127.0.0.1:5000';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Forward to Flask API
    const response = await fetch(`${FLASK_API_URL}/api/newsletter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    return NextResponse.json(result, { status: response.status });
  } catch (error: any) {
    console.error('[api/newsletter] Proxy failure:', error.message);
    return NextResponse.json(
      { success: false, error: 'Could not communicate with backend service.' },
      { status: 502 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
