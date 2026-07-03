# 🔐 Environment Variables — Aone Digital India

> Reference for all environment variables used in the project.

---

## 📋 Table of Contents

- [Setup](#setup)
- [Variable Reference](#variable-reference)
- [Environments](#environments)
- [Security Rules](#security-rules)

---

## ⚙️ Setup

```bash
# Copy template to local environment file
cp .env.example .env.local
```

> ⚠️ **Never commit `.env.local` to Git.**

---

## 📋 Variable Reference

### Application

| Variable | Required | Example | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_APP_URL` | ✅ | `https://www.aonedigitalindia.com` | Full site URL |
| `NEXT_PUBLIC_SITE_NAME` | ✅ | `Aone Digital India` | Site display name |
| `NODE_ENV` | ✅ | `development` / `production` | Runtime environment |

### Contact & Email

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | ✅ | Resend email service API key |
| `EMAIL_FROM` | ✅ | Sender email address |
| `EMAIL_TO_ADMIN` | ✅ | Admin notification email |
| `EMAIL_TO_SUPPORT` | ❌ | Support team email |
| `EMAIL_REPLY_TO` | ❌ | Reply-to email address |

### Analytics

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | ✅ | Google Analytics 4 ID (G-XXXXXXX) |
| `NEXT_PUBLIC_GTM_ID` | ❌ | Google Tag Manager ID (GTM-XXXXXXX) |

### Maps & Location

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | ✅ | Google Maps Embed API key |
| `NEXT_PUBLIC_STORE_LAT` | ❌ | Store latitude |
| `NEXT_PUBLIC_STORE_LNG` | ❌ | Store longitude |

### Social & Messaging

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | ✅ | WhatsApp number (91XXXXXXXXXX) |
| `NEXT_PUBLIC_PHONE_NUMBER` | ✅ | Store phone number |
| `NEXT_PUBLIC_FACEBOOK_URL` | ❌ | Facebook page URL |
| `NEXT_PUBLIC_INSTAGRAM_URL` | ❌ | Instagram profile URL |

### Rate Limiting (Optional)

| Variable | Required | Description |
|----------|----------|-------------|
| `UPSTASH_REDIS_REST_URL` | ❌ | Upstash Redis URL for rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | ❌ | Upstash Redis token |

---

## 🌍 Environments

| Environment | File | Committed? |
|-------------|------|-----------|
| Development | `.env.local` | ❌ No |
| Staging | Vercel Dashboard | ❌ No |
| Production | Vercel Dashboard | ❌ No |
| Template | `.env.example` | ✅ Yes |

---

## 🔒 Security Rules

1. **Never** commit `.env.local` or `.env.production`
2. **Never** prefix server secrets with `NEXT_PUBLIC_`
3. Rotate API keys immediately if accidentally exposed
4. Use Vercel's encrypted environment variables for production

---

> **Last Updated:** 2025
> **Maintained by:** Aone Digital India Development Team
