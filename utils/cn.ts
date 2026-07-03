import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS class names with conflict resolution.
 * Combines clsx for conditional classes and tailwind-merge for deduplication.
 *
 * @param inputs - Class names, arrays, or conditional objects
 * @returns Merged class name string
 * @example
 *   cn('px-4 py-2', isActive && 'bg-blue-500', 'px-2') // 'py-2 bg-blue-500 px-2'
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
