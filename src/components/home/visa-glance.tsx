import { getVisaEntries } from '@/lib/data/visa';
import { VisaGlanceAnimated } from './visa-glance-animated';

const visaPriority: Record<string, number> = {
  VISA_FREE: 0,
  VISA_ON_ARRIVAL: 1,
  E_VISA: 2,
  EMBASSY_VISA: 3,
};

export async function VisaGlance() {
  const entries = await getVisaEntries();

  const flatEntries = entries
    .map((e) => ({
      id: e.id,
      visaType: e.visaType,
      fees: e.fees as { inrApprox?: number } | null,
      country: {
        name: e.country.name,
        slug: e.country.slug,
        heroImageUrl: e.country.heroImageUrl,
      },
    }))
    .sort((a, b) => {
      const pa = visaPriority[a.visaType] ?? 99;
      const pb = visaPriority[b.visaType] ?? 99;
      if (pa !== pb) return pa - pb;
      return a.country.name.localeCompare(b.country.name);
    });

  return (
    <section className="py-[var(--spacing-section)] px-4">
      <div className="mx-auto max-w-7xl">
        <VisaGlanceAnimated entries={flatEntries} />
      </div>
    </section>
  );
}
