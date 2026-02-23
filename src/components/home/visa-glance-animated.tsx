'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Plane, Shield } from 'lucide-react';
import { GlareCard } from '@/components/ui/glare-card';
import { VisaBadge } from '@/components/shared/visa-badge';
import { resolveImage, getDestinationImage } from '@/lib/unsplash';
import { formatINR } from '@/lib/utils';
import { staggerContainer, fadeUp } from '@/lib/animations';

interface VisaEntry {
  id: string;
  visaType: string;
  fees: { inrApprox?: number } | null;
  country: { name: string; slug: string; heroImageUrl: string | null };
}

interface VisaGlanceAnimatedProps {
  entries: VisaEntry[];
}

/* ── Main exported component ── */
export function VisaGlanceAnimated({ entries }: VisaGlanceAnimatedProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <div ref={sectionRef}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4"
      >
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-forest/10">
              <Shield className="h-5 w-5 text-forest" />
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-forest">
              Indian Passport
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-midnight tracking-tight">
            Visa at a Glance
          </h2>
          <p className="mt-2 text-stone text-base max-w-lg">
            Quick visa requirements for Indian passport holders — know before you go.
          </p>
        </div>
        <Link
          href="/visa"
          className="
            hidden sm:inline-flex items-center gap-2 px-5 py-2.5
            rounded-xl border border-forest/20 bg-forest/5
            text-sm font-medium text-forest
            hover:bg-forest/10 hover:border-forest/30
            transition-all duration-300 shrink-0
            group/link
          "
        >
          <Plane className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          Full Visa Hub
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
        </Link>
      </motion.div>

      {/* Horizontal scroll of GlareCards */}
      <motion.div
        variants={staggerContainer(0.1, 0.1)}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
      >
        {entries.map((entry, i) => {
          const image = resolveImage(
            entry.country.heroImageUrl,
            getDestinationImage(entry.country.slug, 'card')
          );

          return (
            <motion.div key={entry.id} variants={fadeUp} className="shrink-0">
              <Link href={`/visa/${entry.country.slug}`} className="block">
                <GlareCard>
                  {/* Country image */}
                  <div className="relative h-full w-full">
                    <Image
                      src={image}
                      alt={entry.country.name}
                      fill
                      sizes="320px"
                      className="object-cover brightness-[0.45] saturate-[1.15]"
                    />

                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

                    {/* Visa badge — top right */}
                    <div className="absolute top-4 right-4 z-10">
                      <VisaBadge visaType={entry.visaType} size="sm" />
                    </div>

                    {/* Country info — bottom */}
                    <div className="absolute bottom-5 left-5 right-5 z-10">
                      <h3 className="font-display text-2xl font-semibold text-white leading-tight drop-shadow-md">
                        {entry.country.name}
                      </h3>
                      {entry.fees?.inrApprox !== undefined && entry.fees.inrApprox > 0 ? (
                        <p className="font-mono text-sm text-white/80 mt-1.5">
                          {formatINR(entry.fees.inrApprox)}
                        </p>
                      ) : entry.visaType === 'VISA_FREE' ? (
                        <p className="text-sm font-medium text-emerald-400 mt-1.5">
                          Free Entry
                        </p>
                      ) : null}
                    </div>
                  </div>
                </GlareCard>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Mobile CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : undefined}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-6 sm:hidden"
      >
        <Link
          href="/visa"
          className="
            flex items-center justify-center gap-2 w-full py-3
            rounded-xl border border-forest/20 bg-forest/5
            text-sm font-medium text-forest
            active:bg-forest/10 transition-colors
          "
        >
          <Plane className="h-4 w-4" />
          Explore Full Visa Hub
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  );
}
