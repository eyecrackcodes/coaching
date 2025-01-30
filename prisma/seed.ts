// prisma/seed.ts
import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create offices
  const austin = await prisma.office.create({
    data: {
      name: 'Austin',
      directorId: 'temp',
    },
  });

  const charlotte = await prisma.office.create({
    data: {
      name: 'Charlotte',
      directorId: 'temp',
    },
  });

  // Create initial managers
  const anthonyPatton = await prisma.user.create({
    data: {
      name: 'Anthony Patton',
      email: 'anthony.patton@luminarylife.com',
      role: UserRole.MANAGER,
      officeId: austin.id,
    },
  });

  // Add more managers as needed
  console.log('Database seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });