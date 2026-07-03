# 📡 API Documentation — Aone Digital India

> Reference for all API routes implemented in the Next.js App Router.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Base URL](#base-url)
- [Authentication](#authentication)
- [Contact API](#contact-api)
- [Newsletter API](#newsletter-api)
- [Analytics API](#analytics-api)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)

---

## 🌐 Overview

All API routes are built using Next.js 15 Route Handlers (App Router) located in `app/api/`.

**Protocol:** HTTPS only  
**Format:** JSON  
**Encoding:** UTF-8

---

## 🔗 Base URL

```
Production: https://www.aonedigitalindia.com/api
Development: http://localhost:3000/api
```

---

## 🔐 Authentication

Internal APIs use server-side secrets. External calls require:

```http
x-api-key: your_api_key_here
Content-Type: application/json
```

---

## 📧 Contact API

### POST `/api/contact`

Submit a customer inquiry or lead.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "subject": "Product Inquiry",
  "message": "I am interested in Samsung Galaxy S25...",
  "product": "Samsung Galaxy S25 Ultra"
}
```

**Validation Rules:**

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| name | string | ✅ | Min 2, Max 100 chars |
| email | string | ✅ | Valid email format |
| phone | string | ✅ | Valid Indian phone number |
| subject | string | ✅ | Min 5, Max 200 chars |
| message | string | ✅ | Min 10, Max 1000 chars |
| product | string | ❌ | Max 200 chars |

**Success Response (200):**

```json
{
  "success": true,
  "message": "Thank you! We will contact you within 24 hours.",
  "reference": "AONE-2025-001234"
}
```

**Error Response (400):**

```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    { "field": "email", "message": "Invalid email address" }
  ]
}
```

**Implementation:**

```ts
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendContactEmail } from '@/services/email.service';

const contactSchema = z.object({
  name:    z.string().min(2).max(100),
  email:   z.string().email(),
  phone:   z.string().regex(/^(\+91)?[6-9]\d{9}$/),
  subject: z.string().min(5).max(200),
  message: z.string().min(10).max(1000),
  product: z.string().max(200).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = contactSchema.parse(body);

    await sendContactEmail(validated);

    return NextResponse.json({
      success: true,
      message: 'Thank you! We will contact you within 24 hours.',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## 📩 Newsletter API

### POST `/api/newsletter`

Subscribe an email to the newsletter.

**Request Body:**

```json
{
  "email": "customer@example.com",
  "name": "John Doe"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Successfully subscribed to our newsletter!"
}
```

---

## 📊 Analytics API

### POST `/api/analytics`

Track custom events (WhatsApp clicks, phone clicks, etc.).

**Request Body:**

```json
{
  "event": "whatsapp_click",
  "page": "/contact",
  "metadata": {
    "source": "floating_button"
  }
}
```

---

## ⚠️ Error Handling

### Standard Error Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad Request / Validation Error |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Rate Limit Exceeded |
| 500 | Internal Server Error |

---

## 🛡️ Rate Limiting

All API routes enforce rate limiting:

```
Contact API: 5 requests per IP per hour
Newsletter API: 3 requests per IP per day
```

Implementation uses Vercel Edge Config or Upstash Redis.

---

> **Last Updated:** 2025
> **Maintained by:** Aone Digital India Development Team
