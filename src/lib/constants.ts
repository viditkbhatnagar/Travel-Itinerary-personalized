// ============================================================
// TRAILS AND MILES — UI Constants & Options
// Used by onboarding, itinerary builder, and recommendation UI
// ============================================================

// ── Travel Style Options ─────────────────────────────────────

export const TRAVEL_STYLES = [
  {
    value: 'LEISURE' as const,
    label: 'Leisure',
    description: 'Relaxed sightseeing with plenty of downtime',
    icon: 'palm-tree',
    color: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  },
  {
    value: 'ADVENTURE' as const,
    label: 'Adventure',
    description: 'Adrenaline-filled activities and outdoor exploration',
    icon: 'mountain',
    color: 'bg-amber-50 border-amber-200 text-amber-700',
  },
  {
    value: 'LUXURY' as const,
    label: 'Luxury',
    description: 'Premium experiences, fine dining, and 5-star comfort',
    icon: 'crown',
    color: 'bg-purple-50 border-purple-200 text-purple-700',
  },
  {
    value: 'BUDGET' as const,
    label: 'Budget',
    description: 'Maximum experiences for minimum spend',
    icon: 'wallet',
    color: 'bg-blue-50 border-blue-200 text-blue-700',
  },
  {
    value: 'CULTURAL' as const,
    label: 'Cultural',
    description: 'Temples, museums, local traditions, and heritage',
    icon: 'landmark',
    color: 'bg-rose-50 border-rose-200 text-rose-700',
  },
] as const;

// ── Pace Options ─────────────────────────────────────────────

export const PACE_OPTIONS = [
  {
    value: 'RELAXED' as const,
    label: 'Slow & Savour',
    description: '2-3 things a day, lots of coffee breaks',
    icon: 'coffee',
  },
  {
    value: 'BALANCED' as const,
    label: 'Balanced',
    description: 'See the highlights without rushing',
    icon: 'scale',
  },
  {
    value: 'FAST' as const,
    label: 'See It All',
    description: "I'll sleep on the flight home",
    icon: 'zap',
  },
] as const;

// ── Companion Options ────────────────────────────────────────

export const COMPANION_OPTIONS = [
  {
    value: 'SOLO' as const,
    label: 'Solo',
    description: 'Travelling on my own',
    icon: 'user',
  },
  {
    value: 'COUPLE' as const,
    label: 'Couple',
    description: 'Romantic getaway for two',
    icon: 'heart',
  },
  {
    value: 'FAMILY' as const,
    label: 'Family',
    description: 'With kids or parents',
    icon: 'users',
  },
  {
    value: 'FRIENDS' as const,
    label: 'Friends',
    description: 'Group trip with friends',
    icon: 'users',
  },
] as const;

// ── Interest Tags ────────────────────────────────────────────

export const INTEREST_TAGS = [
  { value: 'beaches', label: 'Beaches', icon: 'waves' },
  { value: 'mountains', label: 'Mountains', icon: 'mountain-snow' },
  { value: 'culture', label: 'Culture & Heritage', icon: 'landmark' },
  { value: 'food', label: 'Street Food & Cuisine', icon: 'utensils' },
  { value: 'adventure', label: 'Adventure Sports', icon: 'compass' },
  { value: 'nature', label: 'Nature & Wildlife', icon: 'tree-pine' },
  { value: 'nightlife', label: 'Nightlife & Bars', icon: 'wine' },
  { value: 'wellness', label: 'Wellness & Spa', icon: 'flower' },
  { value: 'shopping', label: 'Shopping & Markets', icon: 'shopping-bag' },
  { value: 'history', label: 'History & Museums', icon: 'scroll' },
  { value: 'islands', label: 'Islands & Diving', icon: 'palm-tree' },
  { value: 'wildlife', label: 'Wildlife & Safaris', icon: 'binoculars' },
  { value: 'photography', label: 'Photography', icon: 'camera' },
  { value: 'temples', label: 'Temples & Spirituality', icon: 'flame' },
  { value: 'luxury', label: 'Luxury Stays', icon: 'gem' },
  { value: 'trekking', label: 'Trekking & Hiking', icon: 'footprints' },
  { value: 'water-sports', label: 'Water Sports', icon: 'sailboat' },
  { value: 'art', label: 'Art & Architecture', icon: 'palette' },
  { value: 'local-life', label: 'Local Life & Homestays', icon: 'home' },
  { value: 'festivals', label: 'Festivals & Events', icon: 'party-popper' },
] as const;

// ── Dietary Preferences ──────────────────────────────────────

export const DIETARY_OPTIONS = [
  { value: 'VEGETARIAN' as const, label: 'Vegetarian', icon: 'leaf' },
  { value: 'VEGAN' as const, label: 'Vegan', icon: 'sprout' },
  { value: 'JAIN' as const, label: 'Jain', icon: 'sun' },
  { value: 'HALAL' as const, label: 'Halal', icon: 'sparkles' },
  { value: 'NO_PREFERENCE' as const, label: 'No Preference', icon: 'utensils' },
] as const;

// ── Traveller Archetypes (Onboarding) ────────────────────────

export const TRAVELLER_ARCHETYPES = [
  {
    value: 'explorer',
    travelStyle: 'ADVENTURE' as const,
    label: 'The Explorer',
    description: 'I want to discover places nobody talks about',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    value: 'foodie',
    travelStyle: 'CULTURAL' as const,
    label: 'The Foodie',
    description: 'I plan trips around meals',
    color: 'from-orange-500 to-red-500',
  },
  {
    value: 'adventurer',
    travelStyle: 'ADVENTURE' as const,
    label: 'The Adventurer',
    description: 'Give me mountains, rapids, and adrenaline',
    color: 'from-amber-500 to-orange-600',
  },
  {
    value: 'culture-seeker',
    travelStyle: 'CULTURAL' as const,
    label: 'The Culture Seeker',
    description: 'Temples, museums, and local traditions',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    value: 'relaxer',
    travelStyle: 'LEISURE' as const,
    label: 'The Relaxer',
    description: 'Beach, pool, spa — in that order',
    color: 'from-sky-400 to-blue-500',
  },
] as const;

// ── Budget Tiers ─────────────────────────────────────────────

export const BUDGET_TIERS = {
  budget: { min: 15000, max: 50000, label: 'Budget', color: 'text-blue-600' },
  moderate: { min: 50000, max: 200000, label: 'Moderate', color: 'text-emerald-600' },
  luxury: { min: 200000, max: 500000, label: 'Luxury', color: 'text-purple-600' },
} as const;

export const BUDGET_RANGE = { min: 15000, max: 500000 } as const;

export function getBudgetTierLabel(amount: number): string {
  if (amount <= 50000) return 'Budget';
  if (amount <= 200000) return 'Moderate';
  return 'Luxury';
}

// ── Chatbot Quick Prompts ────────────────────────────────────

export const QUICK_PROMPTS = [
  {
    label: 'Plan a 5-day Vietnam trip',
    icon: 'plane',
    message: 'Help me plan a 5-day trip to Vietnam. I love street food and culture.',
  },
  {
    label: 'Best under ₹50K',
    icon: 'wallet',
    message: 'What are the best international destinations I can visit under ₹50,000 per person?',
  },
  {
    label: 'Visa-free for Indians',
    icon: 'file-check',
    message: 'Which visa-free countries can I visit with an Indian passport?',
  },
  {
    label: 'Family beach holiday',
    icon: 'umbrella',
    message: 'Suggest family-friendly beach destinations in Southeast Asia with vegetarian food options.',
  },
] as const;

// ── Onboarding Steps ─────────────────────────────────────────

export const ONBOARDING_STEPS = [
  { id: 1, title: 'Travel Style', description: 'What kind of traveller are you?' },
  { id: 2, title: 'Trip Pace', description: "What's your ideal trip pace?" },
  { id: 3, title: 'Budget', description: "What's your typical trip budget?" },
  { id: 4, title: 'Interests', description: 'What do you love doing while travelling?' },
  { id: 5, title: 'Dietary', description: 'Any dietary preferences?' },
] as const;

// ── Itinerary Builder Steps ──────────────────────────────────

export const BUILDER_STEPS = [
  { id: 1, title: 'Destination', description: 'Where do you want to go?' },
  { id: 2, title: 'Duration', description: 'How long is your trip?' },
  { id: 3, title: 'Style', description: 'How do you like to travel?' },
  { id: 4, title: 'Who & Budget', description: 'Companions and spending' },
  { id: 5, title: 'Interests', description: 'What excites you?' },
  { id: 6, title: 'Review', description: 'Confirm and generate' },
] as const;

// ── Generation Progress Stages ───────────────────────────────

export const GENERATION_STAGES = [
  { message: 'Analyzing your preferences...', duration: 2000 },
  { message: 'Researching destination highlights...', duration: 2000 },
  { message: 'Planning your perfect days...', duration: 3000 },
  { message: 'Optimizing budget allocation...', duration: 2000 },
  { message: 'Adding insider tips...', duration: 1000 },
] as const;
