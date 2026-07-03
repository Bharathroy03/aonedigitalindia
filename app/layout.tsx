import type { Metadata } from 'next';
import { Libre_Caslon_Text, Plus_Jakarta_Sans } from 'next/font/google';

import '@/styles/globals.css';

// ─── Fonts ────────────────────────────────────────────────────────────────────

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  preload: true,
});

const libreCaslonText = Libre_Caslon_Text({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '700'],
  preload: true,
});

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default: 'Aone Digital India — Premium Mobile & Home Appliances Store',
    template: '%s | Aone Digital India',
  },
  description:
    'Shop the latest mobile phones and home appliances at Aone Digital India. Best prices on Samsung, Apple, OnePlus, LG, Whirlpool, and more.',
  keywords: [
    'mobile phones',
    'home appliances',
    'electronics store',
    'Samsung',
    'Apple',
    'OnePlus',
    'LG',
    'Whirlpool',
    'Aone Digital India',
  ],
  authors: [{ name: 'Aone Digital India' }],
  creator: 'Aone Digital India',
  publisher: 'Aone Digital India',
  metadataBase: new URL('https://www.aonedigitalindia.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.aonedigitalindia.com',
    siteName: 'Aone Digital India',
    title: 'Aone Digital India — Premium Mobile & Home Appliances Store',
    description: 'Your trusted electronics destination. Genuine products, best prices, excellent service.',
    images: [
      {
        url: '/images/og/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Aone Digital India Store',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aone Digital India',
    description: 'Premium Mobile Phones & Home Appliances Store',
    images: ['/images/og/og-home.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

// ─── Root Layout ──────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${libreCaslonText.variable}`}
    >
      <body className="antialiased">
        {/* Skip link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* Providers will wrap children here */}
        {/* TODO: Add ThemeProvider, AnalyticsProvider */}

        <main id="main-content" role="main">
          {children}
        </main>
      </body>
    </html>
  );
}
