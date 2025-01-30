// src/app/api/office/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const offices = await prisma.office.findMany();
    return NextResponse.json(offices);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch offices' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const office = await prisma.office.create({
      data: {
        name: data.name,
        directorId: 'temp', // We'll update this later
      },
    });
    return NextResponse.json(office);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create office' }, { status: 500 });
  }
}