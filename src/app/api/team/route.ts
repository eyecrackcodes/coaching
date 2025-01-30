// src/app/api/team/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { UserRole } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const role = searchParams.get('role');

    const users = await prisma.user.findMany({
      where: {
        role: role as UserRole || undefined,
      },
      include: {
        office: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // First, ensure we have an office
    let office = await prisma.office.findFirst();
    
    if (!office) {
      // Create Austin office if it doesn't exist
      office = await prisma.office.create({
        data: {
          name: 'Austin',
          directorId: 'temp',  // This will be updated later
        },
      });
    }

    // Create the user with the office reference
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        role: data.role,
        managerId: data.managerId || null,
        officeId: office.id,  // Use the office we found or created
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error creating team member:', error);
    return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 });
  }
}