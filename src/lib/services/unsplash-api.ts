// ============================================================
// Unsplash API service — dynamic image search with aggressive caching
// Requires UNSPLASH_ACCESS_KEY env var (free at unsplash.com/developers)
// Falls back gracefully when key is absent or API fails
// ============================================================

const UNSPLASH_API = 'https://api.unsplash.com';

// In-memory cache — shared within the same process/serverless invocation
const memoryCache = new Map<string, string[]>();

function getAccessKey(): string | undefined {
  return process.env.UNSPLASH_ACCESS_KEY || undefined;
}

/**
 * Core search function — queries Unsplash API with Next.js ISR caching
 */
export async function searchUnsplashImages(
  query: string,
  count: number = 1,
  orientation: 'landscape' | 'portrait' | 'squarish' = 'landscape',
): Promise<string[]> {
  const cacheKey = `${query}::${count}::${orientation}`;
  const cached = memoryCache.get(cacheKey);
  if (cached) return cached;

  const accessKey = getAccessKey();
  if (!accessKey) return [];

  try {
    const params = new URLSearchParams({
      query,
      per_page: String(Math.min(count, 30)),
      orientation,
      content_filter: 'high',
    });

    const res = await fetch(`${UNSPLASH_API}/search/photos?${params}`, {
      headers: { Authorization: `Client-ID ${accessKey}` },
      next: { revalidate: 604800 }, // Cache 7 days
    });

    if (!res.ok) {
      console.warn(`[unsplash-api] Search failed for "${query}": ${res.status}`);
      return [];
    }

    const data = await res.json();
    const urls: string[] = (data.results ?? []).map(
      (photo: { urls: { raw: string } }) =>
        // Use raw URL + custom params for consistent sizing
        `${photo.urls.raw}&w=1920&q=80&fit=crop&auto=format`,
    );

    memoryCache.set(cacheKey, urls);
    return urls;
  } catch (err) {
    console.warn(`[unsplash-api] Search error for "${query}":`, err);
    return [];
  }
}

// ── HIGH-LEVEL HELPERS ────────────────────────────────────

/**
 * Get 5 hero gallery images for a city (for carousel)
 */
export async function fetchCityGallery(
  cityName: string,
  countryName: string,
): Promise<string[]> {
  const query = countryName.toLowerCase() === 'india'
    ? `${cityName} India famous landmarks travel`
    : `${cityName} ${countryName} landmarks travel`;
  return searchUnsplashImages(query, 5, 'landscape');
}

/**
 * Get a single card image for a city
 */
export async function fetchCityCardImage(
  cityName: string,
  countryName: string,
): Promise<string | null> {
  const query = countryName.toLowerCase() === 'india'
    ? `${cityName} India cityscape`
    : `${cityName} ${countryName}`;
  const results = await searchUnsplashImages(query, 1, 'landscape');
  if (results.length === 0) return null;
  // Return at card resolution
  return results[0].replace('w=1920', 'w=800').replace('q=80', 'q=75');
}

/**
 * Get an image for a specific point of interest
 */
export async function fetchPOIImage(
  poiName: string,
  cityName: string,
): Promise<string | null> {
  const query = `${poiName} ${cityName}`;
  const results = await searchUnsplashImages(query, 1, 'landscape');
  if (results.length === 0) return null;
  // Return at POI card resolution
  return results[0].replace('w=1920', 'w=600').replace('q=80', 'q=75');
}

/**
 * Get hero gallery for a country/destination
 */
export async function fetchDestinationGallery(
  countryName: string,
): Promise<string[]> {
  const query = `${countryName} famous landmarks travel photography`;
  return searchUnsplashImages(query, 5, 'landscape');
}
