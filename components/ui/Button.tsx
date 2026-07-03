'use client';

import type { ButtonHTMLAttributes } from 'react';
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

import { cn } from '@/utils/cn';

// ─── Button Variants using CVA ───────────────────────────────────────────────

const buttonVariants = cva(
  'inline-flex items-center justify-center font-display font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden select-none',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 border border-transparent',
        secondary:
          'bg-slate-900 text-slate-100 hover:bg-slate-800 border border-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100',
        outline:
          'border border-slate-300 bg-transparent text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900',
        ghost:
          'bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900',
        danger:
          'bg-rose-600 text-white shadow-lg shadow-rose-500/20 hover:bg-rose-500 hover:shadow-rose-500/30',
        glass:
          'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 hover:border-white/30',
        gold:
          'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 font-bold',
      },
      size: {
        xs: 'h-8 px-3 text-xs rounded-md gap-1.5',
        sm: 'h-9 px-4 text-sm rounded-lg gap-2',
        md: 'h-11 px-6 text-sm rounded-xl gap-2',
        lg: 'h-13 px-8 text-base rounded-2xl gap-2.5',
        xl: 'h-15 px-10 text-lg rounded-3xl gap-3',
      },
      glow: {
        true: 'after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[0_0_20px_rgba(59,130,246,0.5)] after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300',
        false: '',
      },
      fullWidth: {
        true: 'w-full flex',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      glow: false,
      fullWidth: false,
    },
  }
);

// ─── Component Props ──────────────────────────────────────────────────────────

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'style'>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  glowColor?: string;
  magnetic?: boolean;
}

// ─── Button Component ─────────────────────────────────────────────────────────

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant,
      size,
      glow,
      fullWidth,
      isLoading,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    // Basic micro-interaction scale animation using Framer Motion
    const scaleProps = disabled || isLoading
      ? {}
      : {
          whileHover: { scale: 1.02 },
          whileTap: { scale: 0.98 },
        };

    return (
      <motion.button
        ref={ref as any}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        aria-disabled={disabled || isLoading}
        className={cn(buttonVariants({ variant, size, glow, fullWidth, className }))}
        {...scaleProps}
        {...(props as any)}
      >
        {/* Shimmer Effect overlay for primary/gold variants */}
        {(variant === 'primary' || variant === 'gold') && (
          <span className="absolute inset-0 block w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:animate-[shimmer_1.5s_infinite] transition-transform" />
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin text-current shrink-0" />
        )}

        {/* Left Icon */}
        {!isLoading && leftIcon && (
          <span className="inline-flex shrink-0">{leftIcon}</span>
        )}

        {/* Button Content */}
        <span className="truncate">{children}</span>

        {/* Right Icon */}
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
