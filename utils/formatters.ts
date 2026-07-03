/**
 * Utility functions for formatting data across the application.
 * All functions are pure (no side effects) and fully typed.
 */

/**
 * Formats a number as Indian currency (INR).
 * @param amount - The amount in INR
 * @returns Formatted currency string: ₹1,29,999
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats a phone number to Indian standard display format.
 * @param phone - Raw phone number string (10 digits)
 * @returns Formatted string: +91 XXXXX XXXXX
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '').replace(/^91/, '');
  if (cleaned.length !== 10) return phone;
  return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
}

/**
 * Formats a date string to a human-readable format.
 * @param dateStr - ISO date string
 * @returns Formatted date: "15 June 2025"
 */
export function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr));
}

/**
 * Truncates a string to a maximum length with ellipsis.
 * @param text - Input text
 * @param maxLength - Maximum character count
 * @returns Truncated string with "..." appended if needed
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3).trimEnd() + '...';
}

/**
 * Calculates the discount percentage between original and sale prices.
 * @param originalPrice - Original price
 * @param salePrice - Sale/discounted price
 * @returns Discount percentage as integer
 */
export function calculateDiscount(originalPrice: number, salePrice: number): number {
  if (originalPrice <= 0) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

/**
 * Converts a string to a URL-friendly slug.
 * @param str - Input string
 * @returns Lowercase hyphenated slug
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Generates a WhatsApp URL with pre-filled message.
 * @param phone - WhatsApp number (e.g., "91XXXXXXXXXX")
 * @param message - Pre-filled message text
 * @returns WhatsApp URL
 */
export function getWhatsAppUrl(phone: string, message = ''): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}${message ? `?text=${encoded}` : ''}`;
}
