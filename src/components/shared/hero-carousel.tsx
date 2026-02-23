'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HeroCarouselProps {
  images: string[];
  alt: string;
  height?: string;
  interval?: number;
  overlay?: React.ReactNode;
  className?: string;
}

export function HeroCarousel({
  images,
  alt,
  height = 'h-[40vh] min-h-[350px]',
  interval = 6000,
  overlay,
  className,
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(nextImage, interval);
    return () => clearInterval(timer);
  }, [nextImage, interval, images.length]);

  // Single image — static render, no animation
  if (images.length <= 1) {
    return (
      <div className={cn('relative overflow-hidden', height, className)}>
        {images[0] && (
          <Image
            src={images[0]}
            alt={alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 gradient-hero" />
        {overlay}
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden', height, className)}>
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: 1.08 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
            scale: { duration: interval / 1000, ease: 'linear' },
          }}
          className="absolute inset-0"
          style={{ scale: 1 }}
        >
          <Image
            src={images[currentIndex]}
            alt={`${alt} - ${currentIndex + 1}`}
            fill
            priority={currentIndex === 0}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay */}
      <div className="absolute inset-0 gradient-hero z-[1]" />

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[2] flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              i === currentIndex
                ? 'bg-white w-6'
                : 'bg-white/50 hover:bg-white/70 w-2'
            )}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>

      {/* Overlay content */}
      {overlay}
    </div>
  );
}
