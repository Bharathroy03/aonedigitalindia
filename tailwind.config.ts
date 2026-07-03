import type { Config } from 'tailwindcss';

const config: Config = {
  // ─── Content Paths ───────────────────────────────────────────────────
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
    './providers/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  // ─── Dark Mode ───────────────────────────────────────────────────────
  darkMode: ['class', '[data-theme="dark"]'],

  theme: {
    extend: {
      // ─── Colors ──────────────────────────────────────────────────────
      colors: {
        brand: {
          50:  'var(--color-brand-50)',
          100: 'var(--color-brand-100)',
          200: 'var(--color-brand-200)',
          300: 'var(--color-brand-300)',
          400: 'var(--color-brand-400)',
          500: 'var(--color-brand-500)',
          600: 'var(--color-brand-600)',
          700: 'var(--color-brand-700)',
          800: 'var(--color-brand-800)',
          900: 'var(--color-brand-900)',
          950: 'var(--color-brand-950)',
        },
        accent: {
          50:  'var(--color-accent-50)',
          100: 'var(--color-accent-100)',
          200: 'var(--color-accent-200)',
          300: 'var(--color-accent-300)',
          400: 'var(--color-accent-400)',
          500: 'var(--color-accent-500)',
          600: 'var(--color-accent-600)',
          700: 'var(--color-accent-700)',
          800: 'var(--color-accent-800)',
          900: 'var(--color-accent-900)',
        },
      },

      // ─── Typography ──────────────────────────────────────────────────
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body:    ['var(--font-body)', 'sans-serif'],
        mono:    ['var(--font-mono)', 'monospace'],
      },

      fontSize: {
        'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-xl':  ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg':  ['3rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-md':  ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm':  ['1.875rem', { lineHeight: '1.25' }],
        'display-xs':  ['1.5rem', { lineHeight: '1.3' }],
      },

      // ─── Screens ─────────────────────────────────────────────────────
      screens: {
        xs:   '375px',
        sm:   '640px',
        md:   '768px',
        lg:   '1024px',
        xl:   '1280px',
        '2xl':'1536px',
        '3xl':'1920px',
      },

      // ─── Spacing ─────────────────────────────────────────────────────
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },

      // ─── Border Radius ───────────────────────────────────────────────
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      // ─── Shadows ─────────────────────────────────────────────────────
      boxShadow: {
        'brand':        '0 8px 32px rgba(37, 99, 235, 0.3)',
        'brand-lg':     '0 16px 64px rgba(37, 99, 235, 0.4)',
        'accent':       '0 8px 32px rgba(245, 158, 11, 0.3)',
        'glass':        '0 8px 32px rgba(0, 0, 0, 0.12)',
        'glass-dark':   '0 8px 32px rgba(0, 0, 0, 0.4)',
        'card':         '0 4px 24px rgba(0, 0, 0, 0.08)',
        'card-hover':   '0 12px 48px rgba(0, 0, 0, 0.15)',
      },

      // ─── Animations ──────────────────────────────────────────────────
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          from: { transform: 'translateY(100%)' },
          to:   { transform: 'translateY(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(37, 99, 235, 0.4)' },
          '50%':      { boxShadow: '0 0 0 12px rgba(37, 99, 235, 0)' },
        },
        'shimmer': {
          from: { backgroundPosition: '-200% 0' },
          to:   { backgroundPosition: '200% 0' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
      },

      animation: {
        'fade-in':     'fade-in 0.6s ease-out forwards',
        'slide-up':    'slide-up 0.5s ease-out',
        'float':       'float 3s ease-in-out infinite',
        'pulse-glow':  'pulse-glow 2s ease-in-out infinite',
        'shimmer':     'shimmer 2s linear infinite',
        'spin-slow':   'spin-slow 10s linear infinite',
      },

      // ─── Backdrop Blur ───────────────────────────────────────────────
      backdropBlur: {
        xs: '2px',
      },

      // ─── Container ───────────────────────────────────────────────────
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm:  '1.5rem',
          md:  '2rem',
          lg:  '2rem',
          xl:  '2rem',
          '2xl': '2rem',
        },
      },

      // ─── Z-Index ─────────────────────────────────────────────────────
      zIndex: {
        '60':  '60',
        '70':  '70',
        '80':  '80',
        '90':  '90',
        '100': '100',
      },
    },
  },

  plugins: [],
};

export default config;
