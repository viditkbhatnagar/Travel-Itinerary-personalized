import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import prisma from '@/lib/db';
import { itinerariesQuerySchema, itineraryBodySchema } from '@/lib/validators';
import {
  success,
  paginated,
  errorResponse,
  withErrorHandler,
  withRateLimit,
  requireAuth,
  optionalAuth,
} from '@/lib/api-utils';
import { generateItineraryStreaming, buildDestinationContext } from '@/lib/ai/openai';
import type { GeneratedItinerary } from '@/types';

// GET /api/itineraries
export const GET = withErrorHandler(async (req: NextRequest) => {
  const user = await optionalAuth(req);
  const { searchParams } = req.nextUrl;
  const query = itinerariesQuerySchema.parse(Object.fromEntries(searchParams));

  const { page, limit, type, destination, style, duration } = query;
  const skip = (page - 1) * limit;

  if (type === 'my' && !user) {
    return errorResponse(401, 'Unauthorized', 'Authentication required to view your itineraries');
  }

  const where = {
    ...(type === 'my' && user ? { userId: user.id, status: { not: 'ARCHIVED' as const } } : {}),
    ...(type === 'samples' ? { isSample: true, status: 'PUBLISHED' as const } : {}),
    ...(type === 'public' ? { isPublic: true, status: 'PUBLISHED' as const } : {}),
    ...(destination ? { destinationSlugs: { has: destination } } : {}),
    ...(style ? { travelStyle: style } : {}),
    ...(duration ? { durationDays: duration } : {}),
  } as Prisma.ItineraryWhereInput;

  const [itineraries, total] = await Promise.all([
    prisma.itinerary.findMany({
      where,
      include: {
        user: { select: { name: true, avatarUrl: true } },
        _count: { select: { days: true } },
      },
      orderBy:
        type === 'my' ? { updatedAt: 'desc' } : { viewCount: 'desc' },
      skip,
      take: limit,
    }),
    prisma.itinerary.count({ where }),
  ]);

  return paginated(itineraries, total, page, limit);
});

// POST /api/itineraries — SSE streaming for AI generation
async function postHandler(req: NextRequest) {
  const user = await requireAuth(req);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return errorResponse(400, 'Bad Request', 'Invalid JSON body');
  }

  const data = itineraryBodySchema.parse(body);

  if (!data.generate) {
    // Manual itinerary creation
    const itinerary = await prisma.itinerary.create({
      data: {
        userId: user.id,
        title: data.title,
        description: (data as { description?: string }).description ?? null,
        destinationSlugs: data.destinationSlugs,
        durationDays: data.durationDays,
        travelStyle: data.travelStyle ?? null,
        pace: data.pace ?? null,
        companionType: data.companionType ?? null,
        interests: data.interests ?? [],
        budgetTotalINR: data.budgetTotalINR ?? null,
        isAiGenerated: false,
        status: 'DRAFT',
      },
    });

    return success(itinerary, 201);
  }

  // AI-powered generation — return SSE stream to prevent Vercel timeout
  const generateData = data as Extract<typeof data, { generate: true }>;
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: string) => {
        controller.enqueue(encoder.encode(`data: ${event}\n\n`));
      };

      try {
        // Stage 1: Fetch user profile and destination context
        send(JSON.stringify({ stage: 'context', message: 'Loading destination data...' }));

        const [travelProfile, travelHistory, destinationData] = await Promise.all([
          prisma.travelProfile.findUnique({ where: { userId: user.id } }),
          prisma.travelHistory.findMany({
            where: { userId: user.id },
            include: {
              destination: { include: { region: true } },
              city: true,
            },
            orderBy: { tripDate: 'desc' },
            take: 20,
          }),
          prisma.country.findMany({
            where: {
              slug: { in: generateData.destinationSlugs },
              status: 'PUBLISHED',
            },
            include: {
              cities: {
                where: { status: 'PUBLISHED' },
                include: {
                  pointsOfInterest: {
                    where: { status: 'PUBLISHED' },
                    select: {
                      name: true,
                      slug: true,
                      category: true,
                      avgCostINR: true,
                      avgDurationMins: true,
                      tags: true,
                    },
                    take: 15,
                  },
                },
                take: 5,
              },
              visaInfo: {
                where: { status: 'PUBLISHED' },
                select: { visaType: true, fees: true, processingTimeDays: true },
              },
            },
          }),
        ]);

        // Build context from known destinations (DB data — fast, no AI call)
        const knownSlugs = new Set(destinationData.map((d) => d.slug));
        const unknownSlugs = generateData.destinationSlugs.filter((s) => !knownSlugs.has(s));

        const knownDestinationContext = destinationData
          .map((country) =>
            buildDestinationContext({
              countryName: country.name,
              cities: country.cities.map((city) => ({
                name: city.name,
                avgDailyBudgetINR: city.avgDailyBudgetINR,
                foodHighlights: city.foodHighlights,
                tags: city.tags,
                pois: city.pointsOfInterest.map((p) => ({
                  name: p.name,
                  slug: p.slug,
                  category: p.category,
                  avgCostINR: p.avgCostINR ? Number(p.avgCostINR) : null,
                  avgDurationMins: p.avgDurationMins,
                  tags: p.tags,
                })),
              })),
              visaInfo: country.visaInfo,
            })
          )
          .join('\n\n');

        // For unknown destinations: use a lightweight text hint instead of an expensive AI call
        const unknownHint = unknownSlugs.length > 0
          ? `\n\n=== ADDITIONAL DESTINATIONS (not in database) ===\nUser also wants to visit: ${unknownSlugs.map((s) => s.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')).join(', ')}.\nUse your knowledge to include these destinations in the itinerary.\n=== END ===`
          : '';

        const finalDestinationContext = (knownDestinationContext + unknownHint) ||
          `=== DESTINATION CONTEXT ===\nUser wants to visit: ${generateData.destinationSlugs.join(', ')}\nDestination not in database — use your knowledge to create a comprehensive itinerary.\n=== END DESTINATION CONTEXT ===`;

        // Stage 2: Generate itinerary via streaming OpenAI call
        send(JSON.stringify({ stage: 'generating', message: 'AI is crafting your itinerary...' }));

        const generated: GeneratedItinerary = await generateItineraryStreaming(
          {
            destinationSlugs: generateData.destinationSlugs,
            durationDays: generateData.durationDays,
            travelStyle: generateData.travelStyle,
            pace: generateData.pace,
            companionType: generateData.companionType,
            interests: generateData.interests,
            budgetTotalINR: generateData.budgetTotalINR,
            dietaryPreferences: generateData.dietaryPreferences,
            userProfile: travelProfile,
            travelHistory: travelHistory as Parameters<typeof generateItineraryStreaming>[0]['travelHistory'],
            destinationContext: finalDestinationContext,
          },
          send
        );

        // Stage 3: Save to database
        send(JSON.stringify({ stage: 'saving', message: 'Saving your itinerary...' }));

        const itinerary = await prisma.itinerary.create({
          data: {
            userId: user.id,
            title: generated.title,
            description: generated.description,
            destinationSlugs: generated.destinationSlugs,
            durationDays: generated.durationDays,
            travelStyle: generated.travelStyle,
            pace: generated.pace,
            companionType: generated.companionType,
            budgetTotalINR: generated.budgetTotalINR,
            interests: generateData.interests ?? [],
            isAiGenerated: true,
            status: 'DRAFT',
            days: {
              create: generated.days.map((day) => ({
                dayNumber: day.dayNumber,
                title: day.title,
                description: day.description,
                dailyBudgetINR: day.dailyBudgetINR,
                weatherAdvisory: day.weatherAdvisory ?? null,
                items: {
                  create: day.items.map((item, idx) => ({
                    timeSlot: item.timeSlot,
                    startTime: item.startTime ?? null,
                    endTime: item.endTime ?? null,
                    title: item.title,
                    description: item.description,
                    estimatedCostINR: item.estimatedCostINR,
                    transportMode: item.transportMode ?? null,
                    transportDurationMins: item.transportDurationMins ?? null,
                    transportNotes: item.transportNotes ?? null,
                    tags: item.tags,
                    sortOrder: idx,
                  })),
                },
              })),
            },
          },
          include: {
            days: { include: { items: true, city: true }, orderBy: { dayNumber: 'asc' } },
          },
        });

        // Stage 4: Done — send the final itinerary
        send(JSON.stringify({ stage: 'done', data: itinerary }));
        controller.close();
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Itinerary generation failed';
        send(JSON.stringify({ stage: 'error', message }));
        controller.close();
      }
    },
  });

  // Cast to NextResponse to satisfy withErrorHandler type
  // (NextResponse extends Response — the cast is safe for SSE streams)
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  }) as unknown as NextResponse;
}

export const POST = withRateLimit(
  withErrorHandler(postHandler),
  30,
  60_000
);
