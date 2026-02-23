'use client';

import { motion } from 'framer-motion';
import { DynamicIcon } from '@/components/ui/dynamic-icon';
import { cn } from '@/lib/utils';
import { icon3dEntrance, iconInlineEntrance, smoothSpring } from '@/lib/animations';

type AnimatedIconVariant = 'card' | 'inline' | 'overlay';
type AnimatedIconSize = 'sm' | 'md' | 'lg';

interface AnimatedIconProps {
  name: string;
  variant?: AnimatedIconVariant;
  size?: AnimatedIconSize;
  selected?: boolean;
  className?: string;
  /** Slow idle breathe animation — use sparingly (max 2-3 on screen) */
  idle?: boolean;
}

const SIZING = {
  card: {
    sm: { container: 'h-9 w-9', iconSize: 18 },
    md: { container: 'h-11 w-11', iconSize: 22 },
    lg: { container: 'h-13 w-13', iconSize: 28 },
  },
  inline: {
    sm: { container: '', iconSize: 12 },
    md: { container: '', iconSize: 16 },
    lg: { container: '', iconSize: 20 },
  },
  overlay: {
    sm: { container: 'h-8 w-8', iconSize: 16 },
    md: { container: 'h-10 w-10', iconSize: 20 },
    lg: { container: 'h-12 w-12', iconSize: 24 },
  },
} as const;

export function AnimatedIcon({
  name,
  variant = 'card',
  size = 'md',
  selected = false,
  className,
  idle = false,
}: AnimatedIconProps) {
  const sizing = SIZING[variant][size];

  // ── Card variant: neumorphic 3D container ──
  if (variant === 'card') {
    return (
      <motion.div
        variants={icon3dEntrance}
        whileHover={{ scale: 1.08, transition: smoothSpring }}
        whileTap={{ scale: 0.95, transition: smoothSpring }}
        className={cn(
          'icon-3d-container',
          sizing.container,
          selected && 'icon-3d-container-selected',
          idle && 'animate-breathe',
          className,
        )}
        aria-hidden="true"
      >
        <DynamicIcon
          name={name}
          size={sizing.iconSize}
          className="text-forest"
          strokeWidth={selected ? 2 : 1.5}
        />
      </motion.div>
    );
  }

  // ── Inline variant: subtle scale entrance, no container ──
  if (variant === 'inline') {
    return (
      <motion.span
        variants={iconInlineEntrance}
        className={cn('inline-flex items-center', className)}
        aria-hidden="true"
      >
        <DynamicIcon
          name={name}
          size={sizing.iconSize}
          className="transition-colors duration-200"
          strokeWidth={selected ? 2.2 : 1.5}
        />
      </motion.span>
    );
  }

  // ── Overlay variant: frosted glass circle ──
  return (
    <motion.div
      variants={icon3dEntrance}
      className={cn(
        'icon-3d-overlay',
        sizing.container,
        className,
      )}
      aria-hidden="true"
    >
      <DynamicIcon
        name={name}
        size={sizing.iconSize}
        className="text-white"
        strokeWidth={1.5}
      />
    </motion.div>
  );
}
