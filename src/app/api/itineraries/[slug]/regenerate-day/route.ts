// ============================================================
// POST /api/itineraries/[slug]/regenerate-day — Regenerate a single day
// Uses SSE streaming to prevent Vercel timeout.
// Auth required. Only the itinerary owner can regenerate days.
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { auth } from '@/lib/auth';
import { generateItineraryStreaming } from '@/lib/ai/openai';
import { buildRAGContext } from '@/lib/services/context-builder';

function jsonError(status: number, title: string, detail: string) {
  return NextResponse.json({ error: { status, title, detail } }, { status });
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  if (!slug) {
    return jsonError(400, 'Bad Request', 'Itinerary slug is required');
  }

  // ── Auth check ─────────────────────────────────────────────
  const session = await auth();
  if (!session?.user?.id) {
    return jsonError(401, 'Unauthorized', 'Authentication required');
  }
  const userId = session.user.id;

  // ── Parse body ─────────────────────────────────────────────
  let body: { dayNumber?: number };
  try {
    body = await req.json();
  } catch {
    return jsonError(400, 'Bad Request', 'Invalid JSON body');
  }

  const { dayNumber } = body;

  if (typeof dayNumber !== 'number' || dayNumber < 1) {
    return jsonError(400, 'Bad Request', 'dayNumber is required and must be a positive integer');
  }

  // ── Find itinerary owned by user ───────────────────────────
  const itinerary = await prisma.itinerary.findFirst({
    where: {
      OR: [
        { shareToken: slug, userId },
        { id: slug, userId },
      ],
    },
    select: {
      id: true,
      title: true,
      destinationSlugs: true,
      durationDays: true,
      travelStyle: true,
      pace: true,
      companionType: true,
      budgetTotalINR: true,
      interests: true,
    },
  });

  if (!itinerary) {
    return jsonError(404, 'Not Found', 'Itinerary not found or does not belong to you');
  }

  if (dayNumber > itinerary.durationDays) {
    return jsonError(
      400,
      'Bad Request',
      `dayNumber ${dayNumber} exceeds itinerary duration of ${itinerary.durationDays} days`
    );
  }

  // ── Find the existing day ──────────────────────────────────
  const day = await prisma.itineraryDay.findFirst({
    where: { itineraryId: itinerary.id, dayNumber },
    include: { items: true },
  });

  if (!day) {
    return jsonError(404, 'Not Found', `Day ${dayNumber} not found in this itinerary`);
  }

  // ── SSE streaming response to prevent Vercel timeout ───────
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: string) => {
        controller.enqueue(encoder.encode(`data: ${event}\n\n`));
      };

      try {
        send(JSON.stringify({ stage: 'context', message: 'Loading destination context...' }));

        // Build destination context + fetch user data in parallel
        const primarySlug = itinerary.destinationSlugs[0];
        const [destinationContext, travelProfile, travelHistory] = await Promise.all([
          primarySlug ? buildRAGContext(primarySlug) : Promise.resolve(''),
          prisma.travelProfile.findUnique({ where: { userId } }),
          prisma.travelHistory.findMany({
            where: { userId },
            include: {
              destination: { include: { region: true } },
              city: true,
            },
            orderBy: { tripDate: 'desc' },
            take: 10,
          }),
        ]);

        send(JSON.stringify({ stage: 'generating', message: 'AI is regenerating day...' }));

        const generated = await generateItineraryStreaming(
          {
            destinationSlugs: itinerary.destinationSlugs,
            durationDays: 1,
            travelStyle: itinerary.travelStyle ?? undefined,
            pace: itinerary.pace ?? undefined,
            companionType: itinerary.companionType ?? undefined,
            interests: itinerary.interests,
            budgetTotalINR: itinerary.budgetTotalINR
              ? Math.round(Number(itinerary.budgetTotalINR) / itinerary.durationDays)
              : undefined,
            userProfile: travelProfile,
            travelHistory: travelHistory as Parameters<typeof generateItineraryStreaming>[0]['travelHistory'],
            destinationContext,
          },
          send
        );

        const generatedDay = generated.days[0];

        if (!generatedDay) {
          send(JSON.stringify({ stage: 'error', message: 'AI failed to generate a replacement day. Please try again.' }));
          controller.close();
          return;
        }

        send(JSON.stringify({ stage: 'saving', message: 'Saving regenerated day...' }));

        // Delete old items and update day
        await prisma.itineraryItem.deleteMany({
          where: { dayId: day.id },
        });

        const updatedDay = await prisma.itineraryDay.update({
          where: { id: day.id },
          data: {
            title: generatedDay.title,
            description: generatedDay.description,
            dailyBudgetINR: generatedDay.dailyBudgetINR,
            weatherAdvisory: generatedDay.weatherAdvisory ?? null,
            items: {
              create: generatedDay.items.map((item, idx) => ({
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
          },
          include: {
            items: { orderBy: { sortOrder: 'asc' } },
            city: true,
          },
        });

        await prisma.itinerary.update({
          where: { id: itinerary.id },
          data: { updatedAt: new Date() },
        });

        send(JSON.stringify({ stage: 'done', data: updatedDay }));
        controller.close();
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Day regeneration failed';
        send(JSON.stringify({ stage: 'error', message }));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
