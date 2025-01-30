// src/utils/checkDb.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkDatabase() {
    try {
        // Get counts by role
        const directors = await prisma.user.findMany({ where: { role: 'DIRECTOR' } });
        const managers = await prisma.user.findMany({ where: { role: 'MANAGER' } });
        const mits = await prisma.user.findMany({ where: { role: 'MIT' } });
        const agents = await prisma.user.findMany({ where: { role: 'AGENT' } });
        const offices = await prisma.office.findMany();

        console.log('\nDatabase Contents Summary:');
        console.log('------------------------');
        console.log('Offices:', offices.length);
        console.log('Directors:', directors.length);
        console.log('Managers:', managers.length);
        console.log('MITs:', mits.length);
        console.log('Agents:', agents.length);
        
        // List all offices and their directors
        console.log('\nOffices and Directors:');
        console.log('------------------------');
        for (const office of offices) {
            const director = directors.find(d => d.id === office.directorId);
            console.log(`${office.name}: Director - ${director?.name}`);
        }

        // List all managers and their agent count
        console.log('\nManagers and Agent Counts:');
        console.log('------------------------');
        for (const manager of [...managers, ...mits]) {
            const managerAgents = await prisma.user.count({
                where: { managerId: manager.id }
            });
            console.log(`${manager.name}: ${managerAgents} agents`);
        }

    } catch (error) {
        console.error('Error checking database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkDatabase();