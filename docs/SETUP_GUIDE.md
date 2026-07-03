# ⚙️ Setup Guide — Aone Digital India

> Complete step-by-step guide to set up the development environment from scratch.

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Development Server](#development-server)
- [Build & Production](#build--production)
- [IDE Setup](#ide-setup)
- [Recommended Extensions](#recommended-extensions)
- [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

Ensure the following are installed on your machine:

| Tool     | Version   | Download |
|----------|-----------|----------|
| Node.js  | >= 20.x   | https://nodejs.org |
| npm      | >= 10.x   | Bundled with Node.js |
| pnpm     | >= 9.x    | `npm i -g pnpm` |
| Git      | Latest    | https://git-scm.com |

Verify installations:

```bash
node --version    # v20.x.x
npm --version     # 10.x.x
pnpm --version    # 9.x.x
git --version     # git version 2.x.x
```

---

## 💻 System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| RAM       | 8 GB    | 16 GB       |
| CPU       | 4 cores | 8 cores     |
| Storage   | 10 GB   | 50 GB SSD   |
| OS        | Windows 10, macOS 12, Ubuntu 20.04 | Latest |

---

## 📥 Installation

### Step 1 — Clone the Repository

```bash
git clone https://github.com/your-org/aone-digital-india.git
cd aone-digital-india
```

### Step 2 — Install Dependencies

```bash
# Using npm
npm install

# Using pnpm (recommended)
pnpm install
```

### Step 3 — Setup Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values. See [ENVIRONMENT.md](./ENVIRONMENT.md).

### Step 4 — Run Development Server

```bash
npm run dev
# or
pnpm dev
```

Visit: **http://localhost:3000**

---

## 🔐 Environment Configuration

Critical environment variables you must configure before starting:

```bash
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Aone Digital India"

# Email Service
EMAIL_SERVICE_API_KEY=your_api_key_here
EMAIL_FROM=info@aonedigitalindia.com
EMAIL_TO=info@aonedigitalindia.com

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_key

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=91XXXXXXXXXX
```

---

## 🔨 Build & Production

```bash
# Production build
npm run build

# Start production server
npm run start

# Analyze bundle size
npm run analyze
```

---

## 🖥️ IDE Setup

### VS Code (Recommended)

Install these extensions for the best experience:

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "mikestead.dotenv",
    "eamodio.gitlens",
    "naumovs.color-highlight",
    "PKief.material-icon-theme"
  ]
}
```

### Workspace Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Find process using port 3000
npx kill-port 3000
# or
lsof -i :3000 && kill -9 <PID>
```

### Module Not Found

```bash
rm -rf node_modules .next
npm install
npm run dev
```

### TypeScript Errors

```bash
npm run type-check
```

### Tailwind Not Working

Ensure `tailwind.config.ts` content paths include all your component files.

---

> **Last Updated:** 2025
> **Maintained by:** Aone Digital India Development Team
