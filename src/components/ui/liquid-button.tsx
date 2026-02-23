'use client';

import * as React from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// ── CVA Variants ────────────────────────────────────────────

const liquidButtonVariants = cva(
  'inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-forest-300 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'bg-transparent hover:scale-105 duration-300 transition text-primary',
        secondary:
          'bg-transparent hover:scale-105 duration-300 transition text-orange',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20',
        outline:
          'border border-white/20 bg-transparent hover:scale-105 duration-300 transition text-primary',
        ghost:
          'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        sm: 'h-8 text-xs gap-1.5 px-4',
        default: 'h-9 px-4 py-2',
        lg: 'h-10 rounded-md px-6',
        xl: 'h-12 rounded-md px-8',
        xxl: 'h-14 rounded-md px-10',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// ── Props ───────────────────────────────────────────────────

export interface LiquidButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof liquidButtonVariants> {
  loading?: boolean;
  href?: string;
  external?: boolean;
}

// ── Component ───────────────────────────────────────────────

export function LiquidButton({
  className,
  variant,
  size,
  loading = false,
  href,
  external = false,
  disabled,
  children,
  ...props
}: LiquidButtonProps) {
  const contentClasses = cn(
    'relative',
    liquidButtonVariants({ variant, size, className })
  );

  const inner = (
    <>
      {/* Shadow / depth layer */}
      <div
        className={cn(
          'absolute top-0 left-0 z-0 h-full w-full rounded-full',
          'shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)]',
          'transition-all',
          'dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]'
        )}
      />

      {/* Glass distortion layer */}
      <div
        className="absolute top-0 left-0 isolate -z-10 h-full w-full overflow-hidden rounded-md liquid-glass-container"
      />

      {/* Content */}
      <div className="pointer-events-none z-10 flex items-center gap-2">
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </div>
    </>
  );

  // If href is provided, render as a link
  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={contentClasses}
        >
          {inner}
        </a>
      );
    }

    return (
      <Link href={href} className={contentClasses}>
        {inner}
      </Link>
    );
  }

  // Otherwise render as a button
  return (
    <button
      className={contentClasses}
      disabled={disabled || loading}
      {...props}
    >
      {inner}
    </button>
  );
}
