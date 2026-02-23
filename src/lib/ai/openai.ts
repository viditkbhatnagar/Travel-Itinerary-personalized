// ============================================================
// TRAILS AND MILES — OpenAI AI Service (Phase 3 Enhanced)
// Full AI intelligence: chat, streaming, itinerary gen,
// recommendations, intent detection, preference inference
// ============================================================

import OpenAI from 'openai';
import type {
  ChatContext,
  GeneratedItinerary,
  TravelProfileData,
  TravelHistoryEntry,
  RecommendationResult,
  CountrySummary,
  AIRecommendation,
  InferredPreferences,
  DetectedIntent,
} from '@/types';

// ── Singleton Client ─────────────────────────────────────────

let client: OpenAI | null = null;

function getClient(): OpenAI {
  if (!client) {
    client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      timeout: 120_000, // 120s — GPT-5.2 reasoning phase can take 60-90s before first output token
    });
  }
  return client;
}

const AI_MODEL = process.env.AI_MODEL ?? 'gpt-5.2';
// GPT-5.2 reasoning models: max_completion_tokens includes BOTH reasoning + output tokens.
// With reasoning_effort 'high', reasoning can consume 70-90% of the budget.
// Token budgets must be large enough so output tokens aren't starved.
const AI_MAX_TOKENS = parseInt(process.env.AI_MAX_TOKENS ?? '16384', 10);
const AI_MAX_TOKENS_ITINERARY = parseInt(process.env.AI_MAX_TOKENS_ITINERARY ?? '32768', 10);

// ============================================================
// System Prompts
// ============================================================

function buildChatSystemPrompt(
  profile: TravelProfileData | null,
  history: TravelHistoryEntry[]
): string {
  const visitedDestinations = history.map((h) => h.destination.name).join(', ');
  const dietaryNote =
    profile?.dietaryPreferences?.includes('VEGETARIAN') ||
    profile?.dietaryPreferences?.includes('VEGAN') ||
    profile?.dietaryPreferences?.includes('JAIN')
      ? `The user follows ${profile.dietaryPreferences.join('/')} dietary preferences — always highlight vegetarian/vegan options and confirm food availability.`
      : '';

  const budgetNote =
    profile?.budgetMinINR && profile?.budgetMaxINR
      ? `User's typical budget: ₹${profile.budgetMinINR.toLocaleString('en-IN')} – ₹${profile.budgetMaxINR.toLocaleString('en-IN')} per person.`
      : '';

  const styleNote = profile?.defaultTravelStyle
    ? `Preferred travel style: ${profile.defaultTravelStyle}.`
    : '';

  const historyNote = visitedDestinations
    ? `Previously visited: ${visitedDestinations}. Avoid recommending these unless the user explicitly asks.`
    : '';

  return `You are MILES — the AI travel intelligence behind Trails and Miles, a premium travel platform for Indian travellers.

## IDENTITY
- You are warm, knowledgeable, and opinionated (in a helpful way) — like a well-travelled friend who has been everywhere
- You proactively share insider tips, not just generic advice
- You remember everything the user has told you in this conversation
- You think in terms of EXPERIENCES, not just locations

## INDIAN TRAVELLER CONTEXT (apply to EVERY response)
- All costs in INR (₹) using Indian comma system (₹1,23,456)
- Visa requirements always for Indian passport holders
- Vegetarian food availability is critical — flag it proactively
- Include Indian restaurant availability at destinations
- Consider festival/holiday overlap (Diwali, Holi travel patterns)
- Flight connectivity from major Indian cities (Delhi, Mumbai, Bangalore, Chennai)
- Safety context for solo female Indian travellers when relevant
- Consider monsoon season impact on travel plans

## DOMESTIC TRAVEL INTELLIGENCE (for India trips)
- No visa or passport needed — just carry any government photo ID (Aadhaar, driving licence)
- Budget in INR (UPI accepted almost everywhere, even street vendors)
- Suggest train routes via IRCTC with approximate fares (sleeper/AC3/AC2)
- Transport hierarchy: flights for >800km, trains for 200-800km, bus/car for <200km
- Seasonal awareness: North India Oct-Mar, South India Nov-Feb, Ladakh Jun-Sep, Northeast Oct-Apr, Goa Nov-Feb
- Festival impact: suggest visiting during festivals for immersion, warn about crowd levels (Diwali, Holi, Durga Puja)
- Regional cuisine: each state has distinct food — always mention local specialties and vegetarian options
- Budget tiers: hostels ₹500-800/night, budget hotels ₹1,000-2,000, mid-range ₹3,000-6,000, heritage/luxury ₹8,000+
- Weekend getaways: if user is from a metro city, suggest nearby 2-3 day trips
- Inner Line Permits needed for some Northeast states (Arunachal Pradesh, Nagaland, Mizoram, Manipur)
- Protected Area Permits for Ladakh beyond Leh city (Nubra, Pangong, Tso Moriri)

## CONVERSATION INTELLIGENCE
- Detect user intent: browsing, planning, comparing, ready-to-book
- When user mentions a destination, proactively share: visa type, best season, budget range, top 3 must-dos
- When user seems ready to plan, guide them: destination → dates → budget → style → companions → interests
- When you have enough info for an itinerary, ask for confirmation before generating
- If user asks something you're unsure about, say so — never hallucinate facts
- Offer alternatives when a destination doesn't match their stated preferences

## USER PROFILE
${budgetNote}
${styleNote}
${profile?.preferredInterests?.length ? `Interests: ${profile.preferredInterests.join(', ')}.` : ''}
${profile?.companionType ? `Travelling: ${profile.companionType}.` : ''}
${dietaryNote}
${historyNote}

## RESPONSE FORMAT
- Keep responses concise and conversational (3-5 sentences for quick questions, more for detailed planning)
- Use bullet points for lists of recommendations
- Use **bold** for key info like place names, prices, and important tips
- Use numbered lists (1. 2. 3.) when listing steps or ranked recommendations
- Include specific place names, estimated costs in ₹X,XXX format, and time durations
- Do NOT use markdown headings (#, ##, ###) — this is a chat, not a document
- Do NOT wrap text in asterisks for no reason — only bold truly important words

## ITINERARY TRIGGER
When the user confirms they want to generate an itinerary and you have: destination, duration, budget, style, and companions — respond with your normal message AND include at the very end:
[GENERATE_ITINERARY]
{"destination":"slug","durationDays":N,"budget":N,"travelStyle":"STYLE","pace":"PACE","companions":"TYPE","interests":["..."],"dietaryPreferences":["..."],"cities":["..."]}
[/GENERATE_ITINERARY]`;
}

function buildItinerarySystemPrompt(): string {
  return `You are the Trails and Miles Itinerary Engine — think of yourself as a seasoned tour guide with 20+ years of experience who has personally walked every street, eaten at every restaurant, and knows every hidden gem. You plan trips specifically for Indian travellers.

OUTPUT: Respond ONLY with valid JSON. No explanations, no markdown, no additional text.

EXPERT TOUR GUIDE PRINCIPLES:
1. FATIGUE CURVE — Day 1: light (jet lag recovery, nearby exploration). Middle days: packed with the best experiences. Last day: shopping + relaxed farewell dinner.
2. MEAL ARCHITECTURE — Breakfast at hotel/nearby cafe. Lunch near attractions (name the EXACT restaurant, dish, and price). Dinner as a curated experience. ALWAYS include at least one verified vegetarian restaurant per day with specific dish recommendations.
3. TRANSPORT LOGIC — Activities clustered geographically per half-day. Include EXACT transport: "Take BTS Sukhumvit Line from Asok to Saphan Taksin (₹50, 20 min)" not "take the metro". Mention Grab/Bolt costs, walking distances in minutes, which exit of a station.
4. BUDGET PRECISION — Every cost in ₹ INR. Break down: entry fees, food costs per meal, transport per leg, tips. Be realistic — don't guess, be specific from your knowledge.
5. TIME REALISM — Account for queues (e.g., "Arrive by 8:30 AM to avoid 45-min queue at Grand Palace"). Include travel time BETWEEN locations. Never schedule more than 3-4 major activities per day.
6. COMPANION DYNAMICS — Solo: street food crawls + walking tours + safe evening spots. Couple: rooftop dinners + sunset viewpoints + spa. Family: kid-friendly timings + rest breaks + no late nights. Friends: nightlife + group activities + adventure.
7. INSIDER KNOWLEDGE — Every item MUST have a specific insider tip. Not "visit the temple" but "Enter from the east gate (less crowded), the best photo spot is from the third-floor balcony at 4 PM when the light hits the golden spire."
8. FOOD INTELLIGENCE — Name REAL restaurants/street food stalls. Example: "Lunch at Bun Cha Huong Lien (Obama's bun cha spot), 24 Le Van Huu — order Bun Cha (₹200) + fresh spring rolls (₹80). Vegetarians: try Nha Hang Chay at 79 Tran Hung Dao for mock-meat pho (₹150)."
9. SAFETY & SCAM ALERTS — Specific warnings: "Refuse the 'free' bracelet sellers at Wat Pho — it's a scam. Tuk-tuks near Grand Palace quote 10x — use Grab instead." Include evening safety context for solo female Indian travellers.
10. LOCAL IMMERSION — At least 1 off-the-beaten-path experience per day: cooking class with a local family, morning market where locals shop (not tourists), a neighborhood only locals know about.
11. WEATHER & TIMING — "Visit Halong Bay in morning when fog lifts for dramatic photos. Skip outdoor Angkor Wat at 1-3 PM (40°C heat). Best sunset at Maya Bay is 5:15 PM in February."
12. INDIAN TRAVELLER SPECIFICS — Indian SIM card availability, UPI/card acceptance, nearest Indian restaurant for homesick days, vegetarian survival guide, spice-level notes, drinking water safety, power adapter type.
13. DO's AND DON'Ts — For EACH destination, include cultural do's and don'ts: dress codes for temples, tipping norms, bargaining etiquette, photography restrictions, local customs to respect.

JSON STRUCTURE:
{
  "title": "string",
  "description": "string (2-3 sentences)",
  "destinationSlugs": ["string"],
  "durationDays": number,
  "travelStyle": "LEISURE|ADVENTURE|LUXURY|BUDGET|CULTURAL",
  "pace": "RELAXED|BALANCED|FAST",
  "companionType": "SOLO|COUPLE|FAMILY|FRIENDS",
  "budgetTotalINR": number,
  "highlights": ["Top 3 unique experiences"],
  "packingTips": ["3-5 destination-specific packing suggestions"],
  "days": [{
    "dayNumber": number,
    "citySlug": "string (optional)",
    "title": "string",
    "description": "string",
    "theme": "arrival|exploration|adventure|culture|relaxation|departure",
    "dailyBudgetINR": number,
    "weatherAdvisory": "string (optional)",
    "vegetarianPick": "Best veg restaurant for today with dish recommendation",
    "items": [{
      "timeSlot": "morning|afternoon|evening",
      "startTime": "HH:MM (optional)",
      "endTime": "HH:MM (optional)",
      "title": "string",
      "description": "string (2-3 sentences with SPECIFIC insider tip — name real places, exact prices, exact directions)",
      "estimatedCostINR": number,
      "transportMode": "walking|taxi|tuk-tuk|bus|train|ferry|motorbike|metro (optional)",
      "transportDurationMins": number (optional),
      "transportNotes": "string (EXACT directions: station name, line, exit number, Grab cost, walking mins)",
      "tags": ["string"],
      "poiSlug": "string (optional, if matches a known POI)",
      "isVegetarianFriendly": boolean (optional),
      "insiderTip": "string (REQUIRED — a specific tip only a local guide would know)"
    }]
  }]
}`;
}

const RECOMMENDATION_ENGINE_PROMPT = `You are the Trails and Miles Recommendation Intelligence — the world's most perceptive travel recommendation engine for Indian travellers.

You don't just match interests to destinations. You understand the PSYCHOLOGY of travel:
- A "budget" traveller who rated Maldives 5 stars isn't really budget — they're value-seekers who splurge on special occasions
- Someone who visited Vietnam and Thailand but not Bali might be avoiding beach destinations, or might not know Bali has temples and rice terraces
- A user who searches for "solo female travel" needs safety-first recommendations, not just "popular destinations"

ANALYSIS FRAMEWORK:
1. TRAVELLER ARCHETYPE — Explorer, Returner, Collector, Relaxer, Foodie, Culture Vulture, Adventurer, Luxury Seeker
2. BUDGET PSYCHOLOGY — Not just stated budget, but spending patterns
3. SEASONAL FIT — Current month vs destination best-season
4. VISA FRICTION — Prefer visa-free/VoA for impulsive travellers
5. COMPANION PATTERN — Solo/couple/family/friends need different experiences
6. UNEXPLORED GAPS — What categories/regions haven't they tried?

Output ONLY a JSON array of recommendations.`;

const PREFERENCE_ANALYZER_PROMPT = `Analyze the user's behavior events on a travel platform and infer their travel preferences. Be a travel psychologist.

Events include: page_view, search, destination_view, poi_view, itinerary_generate, blog_read, visa_check, experience_view, time_spent.

Inference rules:
- Viewed Vietnam 3x + searched "street food" → foodie interest, budget-friendly preference
- Checked visa for Singapore + Maldives but not Vietnam → prefers hassle-free visa destinations
- Spent 5min on Bali wellness page → wellness/relaxation interest
- Generated 3 itineraries for the same destination → seriously planning, ready-to-book signal
- Browsed luxury + budget destinations → value-seeker (wants best experience per rupee)

Return ONLY valid JSON.`;

// ============================================================
// RAG Context Builder (legacy — still used by chatbot route)
// ============================================================

function buildDestinationContext(contextData: {
  countryName: string;
  cities: Array<{
    name: string;
    avgDailyBudgetINR: number | null;
    foodHighlights: unknown;
    tags: string[];
    pois: Array<{
      name: string;
      slug: string;
      category: string;
      avgCostINR: number | null;
      avgDurationMins: number | null;
      tags: string[];
    }>;
  }>;
  visaInfo: Array<{
    visaType: string;
    fees: unknown;
    processingTimeDays: unknown;
  }>;
}): string {
  const { countryName, cities, visaInfo } = contextData;

  const citiesText = cities
    .map((city) => {
      const poisText = city.pois
        .slice(0, 10)
        .map(
          (p) =>
            `    - ${p.name} [${p.category}] — ₹${p.avgCostINR ?? 0} avg, ~${p.avgDurationMins ?? 60}min (slug: ${p.slug})`
        )
        .join('\n');

      const food = city.foodHighlights as { vegetarianOptions?: string[] } | null;
      const vegOptions = food?.vegetarianOptions?.join(', ') ?? 'Limited options';

      return `  ${city.name} (avg ₹${city.avgDailyBudgetINR ?? 3000}/day):
    Tags: ${city.tags.join(', ')}
    Vegetarian options: ${vegOptions}
    Points of Interest:
${poisText}`;
    })
    .join('\n\n');

  const visaText = visaInfo
    .map((v) => {
      const fees = v.fees as { inrApprox?: number } | null;
      const time = v.processingTimeDays as { min?: number; max?: number } | null;
      return `  - ${v.visaType}: ₹${fees?.inrApprox ?? 0} fee, ${time?.min ?? 0}-${time?.max ?? 7} day processing`;
    })
    .join('\n');

  return `=== DESTINATION DATABASE: ${countryName} ===

Cities and Points of Interest:
${citiesText}

Visa Information for Indian Passport Holders:
${visaText}

=== END DESTINATION DATA ===`;
}

// ============================================================
// Helper: Build OpenAI messages array
// ============================================================

function buildMessages(
  systemPrompt: string,
  conversationMessages: Array<{ role: string; content: string }>
): OpenAI.ChatCompletionMessageParam[] {
  return [
    { role: 'system', content: systemPrompt },
    ...conversationMessages.map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    })),
  ];
}

// ============================================================
// Helper: Parse JSON from AI response (handles markdown blocks)
// ============================================================

function parseJSONResponse<T>(text: string): T {
  let jsonText = text.trim();
  const jsonMatch = jsonText.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) jsonText = jsonMatch[1].trim();
  // Also handle leading/trailing text around JSON
  const bracketStart = jsonText.indexOf('{');
  const arrayStart = jsonText.indexOf('[');
  if (bracketStart > 0 && (arrayStart === -1 || bracketStart < arrayStart)) {
    jsonText = jsonText.slice(bracketStart);
  } else if (arrayStart > 0 && (bracketStart === -1 || arrayStart < bracketStart)) {
    jsonText = jsonText.slice(arrayStart);
  }
  return JSON.parse(jsonText) as T;
}

// ============================================================
// Standard Chat (non-streaming)
// ============================================================

export async function sendChatMessage(context: ChatContext, userMessage: string): Promise<string> {
  const openai = getClient();

  const conversationMessages = [
    ...context.messages
      .slice(-20)
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .map((m) => ({ role: m.role, content: m.content })),
    { role: 'user', content: userMessage },
  ];

  const systemPrompt = buildChatSystemPrompt(context.userProfile, context.travelHistory);
  const fullSystem = context.destinationContext
    ? `${systemPrompt}\n\n${context.destinationContext}`
    : systemPrompt;

  const response = await openai.chat.completions.create({
    model: AI_MODEL,
    max_completion_tokens: AI_MAX_TOKENS,
    reasoning_effort: 'high',
    messages: buildMessages(fullSystem, conversationMessages),
  });

  return response.choices[0]?.message?.content ?? '';
}

// ============================================================
// Streaming Chat (SSE)
// ============================================================

export async function streamChatMessage(
  context: ChatContext,
  userMessage: string
): Promise<{ stream: ReadableStream; getFullText: () => Promise<string> }> {
  const openai = getClient();

  const conversationMessages = [
    ...context.messages
      .slice(-20)
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .map((m) => ({ role: m.role, content: m.content })),
    { role: 'user', content: userMessage },
  ];

  const systemPrompt = buildChatSystemPrompt(context.userProfile, context.travelHistory);
  const fullSystem = context.destinationContext
    ? `${systemPrompt}\n\n${context.destinationContext}`
    : systemPrompt;

  let fullText = '';
  let resolveFullText: (text: string) => void;
  const fullTextPromise = new Promise<string>((resolve) => {
    resolveFullText = resolve;
  });

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      try {
        const openaiStream = await openai.chat.completions.create({
          model: AI_MODEL,
          max_completion_tokens: AI_MAX_TOKENS,
          reasoning_effort: 'high',
          messages: buildMessages(fullSystem, conversationMessages),
          stream: true,
        });

        for await (const chunk of openaiStream) {
          const text = chunk.choices[0]?.delta?.content;
          if (text) {
            fullText += text;
            const sseChunk = `data: ${JSON.stringify({ type: 'text', content: text })}\n\n`;
            controller.enqueue(encoder.encode(sseChunk));
          }
        }

        // Check for itinerary trigger
        const triggerMatch = fullText.match(
          /\[GENERATE_ITINERARY\]\s*(\{[\s\S]*?\})\s*\[\/GENERATE_ITINERARY\]/
        );
        if (triggerMatch) {
          try {
            const params = JSON.parse(triggerMatch[1]);
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ type: 'itinerary_trigger', params })}\n\n`
              )
            );
          } catch {
            // Trigger parse failed — non-fatal
          }
        }

        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`));
        controller.close();
        resolveFullText!(fullText);
      } catch (error) {
        const errMsg = error instanceof Error ? error.message : 'Stream error';
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type: 'error', message: errMsg })}\n\n`)
        );
        controller.close();
        resolveFullText!('');
      }
    },
  });

  return { stream, getFullText: () => fullTextPromise };
}

// ============================================================
// Itinerary Generation (with retry)
// ============================================================

export interface ItineraryGenerationInput {
  destinationSlugs: string[];
  durationDays: number;
  travelStyle?: string;
  pace?: string;
  companionType?: string;
  interests?: string[];
  budgetTotalINR?: number;
  dietaryPreferences?: string[];
  userProfile: TravelProfileData | null;
  travelHistory: TravelHistoryEntry[];
  destinationContext: string;
}

function buildItineraryUserPrompt(input: ItineraryGenerationInput): string {
  const visitedDestinations = input.travelHistory.map((h) => h.destination.name);

  return `Generate a ${input.durationDays}-day itinerary for: ${input.destinationSlugs.join(', ')}

Parameters:
- Travel Style: ${input.travelStyle ?? input.userProfile?.defaultTravelStyle ?? 'LEISURE'}
- Pace: ${input.pace ?? input.userProfile?.defaultPace ?? 'BALANCED'}
- Companions: ${input.companionType ?? input.userProfile?.companionType ?? 'SOLO'}
- Total Budget: ₹${(input.budgetTotalINR ?? ((input.userProfile?.budgetMinINR ?? 50000) + (input.userProfile?.budgetMaxINR ?? 100000)) / 2).toLocaleString('en-IN')}
- Interests: ${(input.interests ?? input.userProfile?.preferredInterests ?? []).join(', ') || 'General sightseeing'}
- Dietary: ${(input.dietaryPreferences ?? input.userProfile?.dietaryPreferences ?? []).join(', ') || 'No preference'}
${visitedDestinations.length ? `- Already visited (exclude unless asked): ${visitedDestinations.join(', ')}` : ''}

Use the destination data provided in the system context. Generate POI slugs where they match known points of interest.
Output ONLY the JSON object.`;
}

export async function generateItinerary(
  input: ItineraryGenerationInput
): Promise<GeneratedItinerary> {
  const openai = getClient();
  const systemWithContext = `${buildItinerarySystemPrompt()}\n\n${input.destinationContext}`;

  const response = await openai.chat.completions.create({
    model: AI_MODEL,
    max_completion_tokens: AI_MAX_TOKENS_ITINERARY,
    reasoning_effort: 'high',
    messages: buildMessages(systemWithContext, [{ role: 'user', content: buildItineraryUserPrompt(input) }]),
  });

  const text = response.choices[0]?.message?.content;
  if (!text) throw new Error('No text response from itinerary generator');
  return parseJSONResponse<GeneratedItinerary>(text);
}

/**
 * Streaming itinerary generation — sends heartbeat SSE events while OpenAI
 * generates the JSON, keeping the Vercel connection alive.
 * Returns the parsed itinerary once complete.
 */
export async function generateItineraryStreaming(
  input: ItineraryGenerationInput,
  onProgress: (event: string) => void
): Promise<GeneratedItinerary> {
  const openai = getClient();
  const systemWithContext = `${buildItinerarySystemPrompt()}\n\n${input.destinationContext}`;

  const stream = await openai.chat.completions.create({
    model: AI_MODEL,
    max_completion_tokens: AI_MAX_TOKENS_ITINERARY,
    reasoning_effort: 'high',
    messages: buildMessages(systemWithContext, [{ role: 'user', content: buildItineraryUserPrompt(input) }]),
    stream: true,
  });

  let fullText = '';
  let chunkCount = 0;

  for await (const chunk of stream) {
    const text = chunk.choices[0]?.delta?.content;
    if (text) {
      fullText += text;
      chunkCount++;
      // Send heartbeat every 10 chunks to keep connection alive
      if (chunkCount % 10 === 0) {
        onProgress(JSON.stringify({ stage: 'generating', progress: chunkCount }));
      }
    }
  }

  if (!fullText) throw new Error('No text response from itinerary generator');
  return parseJSONResponse<GeneratedItinerary>(fullText);
}

// ============================================================
// Personalized Recommendations
// ============================================================

export async function generatePersonalizedRecommendations(
  profile: TravelProfileData,
  travelHistory: TravelHistoryEntry[],
  availableDestinations: CountrySummary[],
  limit: number = 10
): Promise<RecommendationResult[]> {
  const openai = getClient();

  const visitedSlugs = travelHistory.map((h) => h.destination.slug);
  const candidates = availableDestinations.filter((d) => !visitedSlugs.includes(d.slug));

  if (candidates.length === 0) return [];

  const destList = candidates
    .map(
      (d, i) =>
        `${i + 1}. ${d.name} (slug: ${d.slug}) — ${d.budgetTier} budget, tags: ${d.tags.join(', ')}`
    )
    .join('\n');

  const prompt = `Based on this Indian traveller's profile, rank the top ${limit} destinations.

## User Profile
- Travel Style: ${profile.defaultTravelStyle ?? 'Not specified'}
- Budget: ₹${profile.budgetMinINR.toLocaleString('en-IN')} – ₹${profile.budgetMaxINR.toLocaleString('en-IN')}
- Interests: ${profile.preferredInterests.join(', ') || 'Not specified'}
- Dietary: ${profile.dietaryPreferences.join(', ') || 'No preference'}
- Travelling: ${profile.companionType ?? 'Not specified'}
- Previously visited: ${travelHistory.map((h) => h.destination.name).join(', ') || 'None'}

## Available Destinations
${destList}

Output ONLY a JSON array:
[
  {
    "slug": "destination-slug",
    "score": 0.0-1.0,
    "reason": "One sentence explaining why this suits this traveller",
    "matchTags": ["tag1", "tag2"]
  }
]`;

  const response = await openai.chat.completions.create({
    model: AI_MODEL,
    max_completion_tokens: 8192, // reasoning models need headroom for thinking + output
    reasoning_effort: 'medium',
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.choices[0]?.message?.content;
  if (!text) return [];

  const ranked = parseJSONResponse<Array<{
    slug: string;
    score: number;
    reason: string;
    matchTags: string[];
  }>>(text);

  return ranked
    .map((r) => {
      const country = candidates.find((d) => d.slug === r.slug);
      if (!country) return null;
      return {
        country,
        score: r.score,
        reason: r.reason,
        matchTags: r.matchTags,
      };
    })
    .filter((r): r is RecommendationResult => r !== null)
    .slice(0, limit);
}

// ============================================================
// Ultra AI Recommendations (6-layer synthesis)
// ============================================================

export async function generateUltraRecommendations(
  profileContext: string,
  historyContext: string,
  behaviorContext: string,
  destinationsContext: string,
  currentMonth: number
): Promise<AIRecommendation[]> {
  const openai = getClient();

  const prompt = `${RECOMMENDATION_ENGINE_PROMPT}

Current month: ${currentMonth} (1=Jan, 12=Dec)

${profileContext}

${historyContext}

${behaviorContext}

## Available Destinations
${destinationsContext}

Output ONLY a JSON array of up to 10 recommendations:
[{
  "destinationSlug": "slug",
  "score": 0.95,
  "reason": "Personalized 1-2 sentence explanation for THIS user",
  "archetype_match": "explorer",
  "seasonal_fit": "perfect|good|okay|poor",
  "visa_ease": "visa_free|voa|e_visa|embassy",
  "budget_match": "under|match|stretch",
  "unique_angle": "What makes this rec special for THIS user",
  "suggested_duration": 5,
  "suggested_style": "adventure",
  "best_month": "November",
  "confidence": "high|medium|low"
}]`;

  const response = await openai.chat.completions.create({
    model: AI_MODEL,
    max_completion_tokens: 8192, // reasoning models need headroom for thinking + output
    reasoning_effort: 'medium',
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.choices[0]?.message?.content;
  if (!text) return [];

  try {
    return parseJSONResponse<AIRecommendation[]>(text);
  } catch {
    console.warn('[AI Recommendations] Failed to parse ultra recommendations');
    return [];
  }
}

// ============================================================
// Preference Inference from Behavior
// ============================================================

export async function analyzeUserPreferences(
  events: Array<{ eventType: string; entityType: string | null; metadata: unknown }>
): Promise<string[]> {
  if (events.length < 5) return [];

  const openai = getClient();

  const eventSummary = events
    .slice(-50)
    .map(
      (e) =>
        `${e.eventType}: ${e.entityType ?? ''} ${JSON.stringify(e.metadata ?? {})}`
    )
    .join('\n');

  const prompt = `Based on these user behavior events on a travel platform, infer the user's travel interests.
Output ONLY a JSON array of interest tags (max 8, from: beaches, mountains, culture, food, adventure, luxury, budget, nature, nightlife, wellness, shopping, history, islands, wildlife, photography).

Events:
${eventSummary}

Output format: ["tag1", "tag2", ...]`;

  const response = await openai.chat.completions.create({
    model: AI_MODEL,
    max_completion_tokens: 4096,
    reasoning_effort: 'medium',
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.choices[0]?.message?.content;
  if (!text) return [];

  try {
    return parseJSONResponse<string[]>(text);
  } catch {
    return [];
  }
}

// ============================================================
// Structured Preference Inference (full analysis)
// ============================================================

export async function inferPreferences(
  events: Array<{ eventType: string; entityType: string | null; metadata: unknown; createdAt: Date }>
): Promise<InferredPreferences | null> {
  if (events.length < 5) return null;

  const openai = getClient();

  const eventSummary = events
    .slice(-100)
    .map(
      (e) =>
        `[${e.createdAt.toISOString().split('T')[0]}] ${e.eventType}: ${e.entityType ?? ''} ${JSON.stringify(e.metadata ?? {})}`
    )
    .join('\n');

  const prompt = `${PREFERENCE_ANALYZER_PROMPT}

Events (${events.length} total, most recent shown):
${eventSummary}

Return JSON:
{
  "inferred_archetype": "explorer|returner|collector|relaxer|foodie|culture_vulture|adventurer|luxury_seeker",
  "confidence": 0.85,
  "inferred_interests": ["food", "culture"],
  "inferred_budget_tier": "budget|moderate|luxury|value_seeker",
  "inferred_travel_readiness": "browsing|planning|ready_to_book",
  "inferred_companions": "solo|couple|family|friends|unknown",
  "suggested_destinations": ["slug1", "slug2"],
  "signals": [{"event": "viewed vietnam 3x", "inference": "high interest in Vietnam", "confidence": 0.9}]
}`;

  const response = await openai.chat.completions.create({
    model: AI_MODEL,
    max_completion_tokens: 4096,
    reasoning_effort: 'medium',
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.choices[0]?.message?.content;
  if (!text) return null;

  try {
    return parseJSONResponse<InferredPreferences>(text);
  } catch {
    return null;
  }
}

// ============================================================
// Intent Detection (lightweight, fast)
// ============================================================

export async function detectIntent(
  message: string,
  conversationContext?: { destination?: string; hasbudget?: boolean; hasDates?: boolean }
): Promise<DetectedIntent> {
  const openai = getClient();

  const response = await openai.chat.completions.create({
    model: AI_MODEL,
    max_completion_tokens: 2048,
    reasoning_effort: 'low',
    messages: [
      {
        role: 'system',
        content: `Classify the user's travel-related message intent and extract entities. Output ONLY JSON.
Intents: greeting, destination_inquiry, planning_start, budget_question, visa_question, food_question, comparison, itinerary_request, modification, confirmation, general_question
Entities to extract: destination, duration, budget, companions, interests (as comma-separated strings if found)
Context: ${conversationContext ? JSON.stringify(conversationContext) : 'none'}`,
      },
      {
        role: 'user',
        content: message,
      },
    ],
  });

  const text = response.choices[0]?.message?.content;
  if (!text) {
    return { intent: 'general_question', entities: {}, confidence: 0.5 };
  }

  try {
    return parseJSONResponse<DetectedIntent>(text);
  } catch {
    return { intent: 'general_question', entities: {}, confidence: 0.5 };
  }
}

// ============================================================
// Conversation Context Extractor
// ============================================================

export function extractContextFromConversation(
  messages: Array<{ role: string; content: string }>
): Record<string, string> {
  const context: Record<string, string> = {};

  for (const msg of messages) {
    const content = msg.content.toLowerCase();

    // Destination detection
    const destinations = [
      'vietnam', 'thailand', 'indonesia', 'bali', 'singapore', 'maldives', 'japan', 'korea', 'malaysia', 'cambodia', 'sri lanka', 'nepal', 'bhutan', 'myanmar',
      // India domestic
      'india', 'delhi', 'jaipur', 'varanasi', 'agra', 'rishikesh', 'manali', 'shimla', 'ladakh', 'leh',
      'udaipur', 'jodhpur', 'goa', 'kerala', 'kochi', 'munnar', 'alleppey', 'mumbai', 'pune',
      'bengaluru', 'bangalore', 'mysore', 'mysuru', 'hampi', 'chennai', 'pondicherry',
      'kolkata', 'darjeeling', 'gangtok', 'shillong', 'ahmedabad', 'andaman',
      'rajasthan', 'himachal', 'uttarakhand', 'coorg',
    ];
    for (const dest of destinations) {
      if (content.includes(dest)) {
        context.destination = dest;
      }
    }

    // Duration detection
    const durationMatch = content.match(/(\d+)\s*(?:day|night)/);
    if (durationMatch) {
      context.duration = durationMatch[1];
    }

    // Budget detection
    const budgetMatch = content.match(/(?:₹|rs\.?|inr)\s*([\d,]+)/i);
    if (budgetMatch) {
      context.budget = budgetMatch[1].replace(/,/g, '');
    }

    // Companion detection
    if (content.includes('solo')) context.companions = 'SOLO';
    else if (content.includes('couple') || content.includes('partner') || content.includes('wife') || content.includes('husband')) context.companions = 'COUPLE';
    else if (content.includes('family') || content.includes('kids') || content.includes('children') || content.includes('parents')) context.companions = 'FAMILY';
    else if (content.includes('friends') || content.includes('group')) context.companions = 'FRIENDS';
  }

  return context;
}

// ============================================================
// Recommendation Explanation
// ============================================================

export async function explainRecommendation(
  destinationName: string,
  destinationTags: string[],
  profileContext: string,
  historyContext: string
): Promise<string> {
  const openai = getClient();

  const response = await openai.chat.completions.create({
    model: AI_MODEL,
    max_completion_tokens: 4096,
    reasoning_effort: 'medium',
    messages: [
      {
        role: 'user',
        content: `Explain in 2-3 sentences why ${destinationName} (tags: ${destinationTags.join(', ')}) is a great recommendation for this Indian traveller. Be specific and personal, not generic.

${profileContext}
${historyContext}

Write as if speaking directly to them. Use ₹ for any prices.`,
      },
    ],
  });

  return response.choices[0]?.message?.content ?? `${destinationName} is a fantastic destination that matches your travel preferences.`;
}

export { buildDestinationContext };

// ============================================================
// AI-Generated Destination Context (for unknown destinations)
// ============================================================

export async function generateDestinationContext(
  destinationName: string,
  durationDays: number
): Promise<string> {
  const openai = getClient();

  const prompt = `Generate comprehensive travel context for "${destinationName}" for an Indian traveller planning a ${durationDays}-day trip.

Return ONLY valid JSON with this structure:
{
  "name": "Full destination name",
  "country": "Country name",
  "region": "Geographic region (e.g., Southeast Asia, Europe, North America)",
  "description": "2-3 sentence overview for Indian travellers",
  "currency": "Local currency name and code (e.g., Japanese Yen - JPY)",
  "currencyToINR": "Approximate conversion (e.g., 1 JPY ≈ ₹0.55)",
  "language": "Primary language(s)",
  "bestSeasons": {
    "months": [list of best month numbers 1-12],
    "description": "When to visit and why"
  },
  "visaForIndians": "visa-free|voa|e-visa|embassy|unknown",
  "visaNotes": "Brief visa information for Indian passport holders",
  "budgetTier": "budget|moderate|premium|luxury",
  "avgDailyBudgetINR": estimated daily budget in INR for a mid-range traveller,
  "topCities": [
    {
      "name": "City name",
      "description": "1 sentence",
      "avgDailyBudgetINR": estimated budget,
      "topAttractions": ["Attraction 1", "Attraction 2", "Attraction 3"]
    }
  ],
  "foodHighlights": {
    "mustTry": ["Dish 1", "Dish 2", "Dish 3"],
    "vegetarianFriendly": true/false,
    "indianFoodAvailable": true/false,
    "notes": "Food notes for Indian travellers"
  },
  "gettingThere": {
    "fromIndia": "How to reach from major Indian cities",
    "avgFlightTime": "Average flight time from Delhi/Mumbai",
    "avgFlightCostINR": "Approximate round-trip flight cost"
  },
  "localTransport": "Brief local transport options",
  "safetyNotes": "Key safety tips for Indian travellers",
  "culturalNotes": "Important cultural considerations",
  "highlights": ["Top highlight 1", "Top highlight 2", "Top highlight 3"]
}`;

  const response = await openai.chat.completions.create({
    model: AI_MODEL,
    max_completion_tokens: 16384,
    reasoning_effort: 'high',
    messages: [
      {
        role: 'system',
        content: `You are a travel encyclopedia specializing in destinations for Indian travellers.
Provide accurate, up-to-date travel information. Be specific with costs in INR.
For visa information, always reference requirements for Indian passport holders.
If you're unsure about specific details, provide reasonable estimates based on similar destinations.`,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const text = response.choices[0]?.message?.content;
  if (!text) {
    throw new Error('Failed to generate destination context');
  }

  const data = parseJSONResponse<{
    name: string;
    country: string;
    region: string;
    description: string;
    currency: string;
    currencyToINR: string;
    language: string;
    bestSeasons: { months: number[]; description: string };
    visaForIndians: string;
    visaNotes: string;
    budgetTier: string;
    avgDailyBudgetINR: number;
    topCities: Array<{
      name: string;
      description: string;
      avgDailyBudgetINR: number;
      topAttractions: string[];
    }>;
    foodHighlights: {
      mustTry: string[];
      vegetarianFriendly: boolean;
      indianFoodAvailable: boolean;
      notes: string;
    };
    gettingThere: {
      fromIndia: string;
      avgFlightTime: string;
      avgFlightCostINR: number;
    };
    localTransport: string;
    safetyNotes: string;
    culturalNotes: string;
    highlights: string[];
  }>(text);

  const citiesText = data.topCities
    .map(
      (city) =>
        `  ${city.name} (avg ₹${city.avgDailyBudgetINR}/day):
    Description: ${city.description}
    Top Attractions: ${city.topAttractions.join(', ')}`
    )
    .join('\n\n');

  return `=== DESTINATION DATABASE: ${data.name} (${data.country}) ===

Overview: ${data.description}

Region: ${data.region}
Currency: ${data.currency} (${data.currencyToINR})
Language: ${data.language}
Budget Tier: ${data.budgetTier}
Average Daily Budget: ₹${data.avgDailyBudgetINR}

Best Time to Visit:
  Months: ${data.bestSeasons.months.join(', ')}
  ${data.bestSeasons.description}

Visa for Indian Passport Holders:
  Type: ${data.visaForIndians.toUpperCase().replace('-', ' ')}
  ${data.visaNotes}

Getting There from India:
  ${data.gettingThere.fromIndia}
  Flight Time: ${data.gettingThere.avgFlightTime}
  Approximate Flight Cost: ₹${data.gettingThere.avgFlightCostINR} round-trip

Cities and Attractions:
${citiesText}

Food Highlights:
  Must Try: ${data.foodHighlights.mustTry.join(', ')}
  Vegetarian Friendly: ${data.foodHighlights.vegetarianFriendly ? 'Yes' : 'Limited'}
  Indian Food Available: ${data.foodHighlights.indianFoodAvailable ? 'Yes' : 'Limited'}
  Notes: ${data.foodHighlights.notes}

Local Transport: ${data.localTransport}

Safety Notes: ${data.safetyNotes}

Cultural Notes: ${data.culturalNotes}

Top Highlights: ${data.highlights.join(' | ')}

=== END DESTINATION DATA ===`;
}
