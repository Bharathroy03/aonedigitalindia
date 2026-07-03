'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import { cn } from '@/utils/cn';

// ─── Grid Background ──────────────────────────────────────────────────────────

interface GridBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number; // size of grid cells in pixels
  color?: string; // color of the lines
  maskColor?: string; // color of the fade-out mask (e.g. radial-gradient)
}

export const GridBackground: React.FC<GridBackgroundProps> = ({
  className,
  size = 40,
  color = 'rgba(99, 102, 241, 0.07)', // default subtle indigo
  maskColor = 'radial-gradient(circle, white 20%, transparent 80%)',
  ...props
}) => {
  return (
    <div
      className={cn(
        'absolute inset-0 -z-10 h-full w-full bg-transparent',
        className
      )}
      style={{
        backgroundImage: `
          linear-gradient(to right, ${color} 1px, transparent 1px),
          linear-gradient(to bottom, ${color} 1px, transparent 1px)
        `,
        backgroundSize: `${size}px ${size}px`,
        maskImage: maskColor,
        WebkitMaskImage: maskColor,
      }}
      {...props}
    />
  );
};

// ─── Dot Pattern Background ───────────────────────────────────────────────────

interface DotBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number; // gap between dots
  dotSize?: number; // size of the dot
  color?: string;
  maskColor?: string;
}

export const DotBackground: React.FC<DotBackgroundProps> = ({
  className,
  size = 24,
  dotSize = 1.5,
  color = 'rgba(99, 102, 241, 0.15)',
  maskColor = 'radial-gradient(circle at center, transparent 20%, var(--bg-primary, #ffffff) 100%)',
  ...props
}) => {
  return (
    <div
      className={cn(
        'absolute inset-0 -z-10 h-full w-full bg-transparent',
        className
      )}
      style={{
        backgroundImage: `radial-gradient(${color} ${dotSize}px, transparent ${dotSize}px)`,
        backgroundSize: `${size}px ${size}px`,
        maskImage: maskColor,
        WebkitMaskImage: maskColor,
      }}
      {...props}
    />
  );
};

// ─── Mesh Gradient / Neon Glow Blobs ──────────────────────────────────────────

interface MeshGradientProps extends React.HTMLAttributes<HTMLDivElement> {
  colors?: string[]; // array of 2 or 3 colors
}

export const MeshGradient: React.FC<MeshGradientProps> = ({
  className,
  colors = ['#3b82f6', '#8b5cf6', '#ec4899'], // default blue, violet, pink
  ...props
}) => {
  return (
    <div
      className={cn(
        'absolute inset-0 -z-10 h-full w-full overflow-hidden bg-transparent pointer-events-none',
        className
      )}
      {...props}
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-30 dark:opacity-20"
        style={{ backgroundColor: colors[0] }}
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -100, 0],
          y: [0, 80, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[150px] opacity-25 dark:opacity-15"
        style={{ backgroundColor: colors[1] }}
      />
      {colors[2] && (
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 50, 0],
            y: [0, 120, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[30%] right-[20%] w-[40%] h-[40%] rounded-full blur-[130px] opacity-20 dark:opacity-10"
          style={{ backgroundColor: colors[2] }}
        />
      )}
    </div>
  );
};

// ─── Parallax Scrolling Background Layer ──────────────────────────────────────

interface ParallaxBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number; // scroll speed ratio (e.g. 0.2 means moves at 20% scroll speed)
  direction?: 'up' | 'down';
}

export const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  className,
  speed = 0.3,
  direction = 'down',
  children,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const travel = direction === 'down' ? 100 * speed : -100 * speed;
  const y = useTransform(scrollYProgress, [0, 1], [0, travel]);

  return (
    <div
      ref={ref}
      className={cn(
        'absolute inset-0 -z-20 h-[120%] w-full overflow-hidden bg-transparent',
        className
      )}
      {...props}
    >
      <motion.div style={{ y }} className="w-full h-full relative">
        {children}
      </motion.div>
    </div>
  );
};
