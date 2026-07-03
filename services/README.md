# Services

External service integrations for Aone Digital India.

## Available Services

| Service | File | Description |
|---------|------|-------------|
| Email | `email.service.ts` | Send emails via Resend |
| Analytics | `analytics.service.ts` | Track events via GA4 |
| WhatsApp | `whatsapp.service.ts` | Generate WhatsApp links |

## Guidelines

- Services are server-side only unless prefixed `client-`
- All API keys loaded from environment variables
- Every service function returns typed results
- Error handling included
