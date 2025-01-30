// src/utils/initDb.js
const { PrismaClient } = require('@prisma/client');
const { orgData } = require('./orgData.js');

const prisma = new PrismaClient();

async function main() {
  try {
    // Clean existing data
    console.log('Cleaning existing data...');
    await prisma.metric.deleteMany();
    await prisma.coachingSession.deleteMany();
    await prisma.user.deleteMany();
    await prisma.office.deleteMany();

    const { Luminary_Life_Sales_Org } = orgData;

    // Debug the full structure
    console.log('Full data structure check:');
    for (const [locationName, locationData] of Object.entries(Luminary_Life_Sales_Org)) {
      if (locationName !== 'Total_Agents') {
        console.log(`\n${locationName}:`);
        console.log('Director:', locationData.Director);
        console.log('Manager count:', Object.keys(locationData.Managers).length);
        console.log('Manager names:', Object.keys(locationData.Managers));
      }
    }

    // Process each location (Austin and Charlotte)
    for (const [locationName, locationData] of Object.entries(Luminary_Life_Sales_Org)) {
      if (locationName !== 'Total_Agents' && typeof locationData === 'object' && 'Director' in locationData) {
        console.log(`\nProcessing ${locationName} location...`);
        
        // Create office first
        console.log(`Creating office: ${locationName}`);
        const office = await prisma.office.create({
          data: {
            name: locationName,
            directorId: 'temp',
          },
        });

        // Create director with correct office ID
        console.log(`Creating director: ${locationData.Director}`);
        const director = await prisma.user.create({
          data: {
            name: locationData.Director,
            email: `${locationData.Director.toLowerCase().replace(/ /g, '.')}@luminarylife.com`,
            role: 'DIRECTOR',
            officeId: office.id,
          },
        });

        // Update office with correct director ID
        await prisma.office.update({
          where: { id: office.id },
          data: { directorId: director.id },
        });

        console.log(`\nProcessing managers for ${locationName}...`);
        console.log('Manager data:', locationData.Managers);
        
        // Process each manager and their agents
        for (const [managerName, managerData] of Object.entries(locationData.Managers)) {
          console.log(`\nCreating manager: ${managerName}`);
          const manager = await prisma.user.create({
            data: {
              name: managerName,
              email: `${managerName.toLowerCase().replace(/ /g, '.')}@luminarylife.com`,
              role: managerName.includes('MIT') ? 'MIT' : 'MANAGER',
              officeId: office.id,
            },
          });

          // Create agents for this manager
          console.log(`Creating agents for ${managerName}:`);
          for (const agentName of managerData.Agents) {
            console.log(`Creating agent: ${agentName}`);
            await prisma.user.create({
              data: {
                name: agentName,
                email: `${agentName.toLowerCase().replace(/ /g, '.')}@luminarylife.com`,
                role: 'AGENT',
                officeId: office.id,
                managerId: manager.id,
              },
            });
          }
        }
      }
    }

    console.log('\nDatabase initialization completed successfully');

    // Print detailed statistics
    const userCount = await prisma.user.count();
    const officeCount = await prisma.office.count();
    const directorCount = await prisma.user.count({ where: { role: 'DIRECTOR' }});
    const managerCount = await prisma.user.count({ where: { role: 'MANAGER' }});
    const mitCount = await prisma.user.count({ where: { role: 'MIT' }});
    const agentCount = await prisma.user.count({ where: { role: 'AGENT' }});

    console.log(`\nCreated:`);
    console.log(`- ${officeCount} offices`);
    console.log(`- ${directorCount} directors`);
    console.log(`- ${managerCount} managers`);
    console.log(`- ${mitCount} MITs`);
    console.log(`- ${agentCount} agents`);
    console.log(`- ${userCount} total users`);

  } catch (error) {
    console.error('Error initializing database:', error);
    console.error('Error details:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();