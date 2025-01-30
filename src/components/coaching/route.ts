// src/app/api/coaching/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    const session = await prisma.coachingSession.create({
      data: {
        coachId: data.coachId, // This should come from the authenticated user
        coacheeId: data.coacheeId,
        date: new Date(data.date),
        type: data.type,
        notes: data.notes,
        status: 'SCHEDULED',
      },
      include: {
        coachee: true,
      },
    });

    return NextResponse.json(session);
  } catch (error) {
    console.error('Error creating coaching session:', error);
    return NextResponse.json(
      { error: 'Error creating coaching session' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const sessions = await prisma.coachingSession.findMany({
      include: {
        coach: true,
        coachee: true,
        metrics: true,
      },
      orderBy: {
        date: 'desc',
      },
    });

    return NextResponse.json(sessions);
  } catch (error) {
    console.error('Error fetching coaching sessions:', error);
    return NextResponse.json(
      { error: 'Error fetching coaching sessions' },
      { status: 500 }
    );
  }
}