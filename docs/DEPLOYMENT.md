# 🚀 Deployment Guide — Aone Digital India

> Step-by-step guide for deploying to Vercel and managing production infrastructure.

---

## 📋 Table of Contents

- [Deployment Overview](#deployment-overview)
- [Vercel Deployment](#vercel-deployment)
- [Environment Variables](#environment-variables)
- [Domain Configuration](#domain-configuration)
- [CI/CD Pipeline](#cicd-pipeline)
- [Monitoring & Alerts](#monitoring--alerts)
- [Rollback Procedure](#rollback-procedure)
- [Staging Environment](#staging-environment)

---

## 🌐 Deployment Overview

| Environment | URL | Branch | Purpose |
|-------------|-----|--------|---------|
| Production | https://www.aonedigitalindia.com | `main` | Live site |
| Staging | https://staging.aonedigitalindia.com | `staging` | Pre-release testing |
| Preview | Auto-generated Vercel URL | Feature branches | PR review |

---

## ▲ Vercel Deployment

### First-Time Setup

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy (from project root)
vercel

# Deploy to production
vercel --prod
```

### Automatic Deployments

Vercel auto-deploys when:
- Push to `main` → Production deployment
- Push to `staging` → Staging deployment
- Open a PR → Preview deployment

### vercel.json Configuration

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "regions": ["bom1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    },
    {
      "source": "/public/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/home",
      "destination": "/",
      "permanent": true
    }
  ]
}
```

---

## 🔐 Environment Variables

Set in Vercel Dashboard → Project → Settings → Environment Variables:

| Variable | Environment | Notes |
|----------|-------------|-------|
| `RESEND_API_KEY` | Production, Preview | Email service key |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Production | Google Analytics |
| `NEXT_PUBLIC_GTM_ID` | Production | Google Tag Manager |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | All | Maps embed |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | All | WhatsApp button |
| `NEXT_PUBLIC_APP_URL` | All | Site URL |

---

## 🌍 Domain Configuration

### Custom Domain on Vercel

1. Go to Project Settings → Domains
2. Add `aonedigitalindia.com` and `www.aonedigitalindia.com`
3. Add DNS records at your registrar:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

4. SSL is auto-provisioned by Vercel (Let's Encrypt)

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, staging]
  pull_request:
    branches: [main]

jobs:
  lint-and-type-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run test
```

---

## 📊 Monitoring & Alerts

### Vercel Analytics

Enable in Vercel Dashboard → Analytics:
- Real User Monitoring
- Core Web Vitals
- Page views and visitors

### Uptime Monitoring

Use [UptimeRobot](https://uptimerobot.com) (free):
1. Add monitor for `https://www.aonedigitalindia.com`
2. Set 5-minute check interval
3. Configure email alerts to `info@aonedigitalindia.com`

---

## ⏮️ Rollback Procedure

### Instant Rollback in Vercel

1. Go to Vercel Dashboard → Deployments
2. Find the last working deployment
3. Click `···` → Promote to Production

### Emergency Rollback via CLI

```bash
# List recent deployments
vercel list

# Promote a specific deployment
vercel promote <deployment-url>
```

---

## 🧪 Staging Environment

Before deploying to production:

1. Push changes to `staging` branch
2. Test on staging URL thoroughly:
   - [ ] All pages load correctly
   - [ ] Contact form submits successfully
   - [ ] Animations work smoothly
   - [ ] Mobile responsive layout
   - [ ] Google Maps loads
   - [ ] WhatsApp link works
3. Approve for production merge

---

> **Last Updated:** 2025
> **Maintained by:** Aone Digital India DevOps Team
