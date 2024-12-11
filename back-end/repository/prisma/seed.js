const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();
const saltRounds = 10;

async function main() {
    await prisma.choreAssignment.deleteMany();
    await prisma.user.deleteMany();
    await prisma.chore.deleteMany();
    
    console.log('Cleared existing data from users, chores, and assignments.');

    const existingUsers = await prisma.user.findMany({
        where: {
            email: {
                in: [
                    'john.doe@test.com',
                    'jane.smith@test.com',
                    'bobby.smith@test.com',
                    'alice.johnson@test.com',
                ],
            },
        },
    });

    const users = [
        { name: 'John Doe', email: 'john.doe@test.com', password: 'password123', role: 'parent', wallet: 0 },
        { name: 'Jane Smith', email: 'jane.smith@test.com', password: 'password456', role: 'child', wallet: 0 },
        { name: 'Bobby Smith', email: 'bobby.smith@test.com', password: 'password789', role: 'child', wallet: 0 },
        { name: 'Alice Johnson', email: 'alice.johnson@test.com', password: 'password234', role: 'child', wallet: 0 },
    ];

    const usersToCreate = users.filter(
        user => !existingUsers.some(existingUser => existingUser.email === user.email)
    );

    if (usersToCreate.length > 0) {
        const usersWithHashedPasswords = await Promise.all(
            usersToCreate.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, saltRounds);
                return {
                    ...user,
                    password: hashedPassword,
                };
            })
        );

        const createdUsers = await prisma.user.createMany({
            data: usersWithHashedPasswords,
            skipDuplicates: true,
        });
        console.log(`Created ${createdUsers.count} users`);
    } else {
        console.log('No new users to create');
    }

    const chores = await prisma.chore.createMany({
        data: [
            { title: 'Clean the kitchen', description: 'Wipe down the counters and clean the dishes.', points: 5 },
            { title: 'Take out the trash', description: 'Dispose of the trash in the kitchen.', points: 3 },
            { title: 'Vacuum the living room', description: 'Vacuum the carpets and tidy up the furniture.', points: 4 },
            { title: 'Mow the lawn', description: 'Mow the grass in the front and backyard.', points: 6 },
            { title: 'Clean the bathroom', description: 'Scrub the sink, toilet, and shower.', points: 7 },
        ],
        skipDuplicates: true,
    });

    console.log(`Created ${chores.count} chores`);

    const john = await prisma.user.findUnique({ where: { email: 'john.doe@test.com' } });
    const jane = await prisma.user.findUnique({ where: { email: 'jane.smith@test.com' } });
    const bobby = await prisma.user.findUnique({ where: { email: 'bobby.smith@test.com' } });
    const alice = await prisma.user.findUnique({ where: { email: 'alice.johnson@test.com' } });

    const kitchen = await prisma.chore.findFirst({ where: { title: 'Clean the kitchen' } });
    const trash = await prisma.chore.findFirst({ where: { title: 'Take out the trash' } });
    const vacuum = await prisma.chore.findFirst({ where: { title: 'Vacuum the living room' } });
    const lawn = await prisma.chore.findFirst({ where: { title: 'Mow the lawn' } });
    const bathroom = await prisma.chore.findFirst({ where: { title: 'Clean the bathroom' } });

    if (!john || !jane || !bobby || !alice || !kitchen || !trash || !vacuum || !lawn || !bathroom) {
        throw new Error('Some users or chores were not found');
    }

    await prisma.choreAssignment.createMany({
        data: [
            { userId: jane.id, choreId: kitchen.id, status: 'pending' },
            { userId: jane.id, choreId: trash.id, status: 'completed' },
            { userId: bobby.id, choreId: vacuum.id, status: 'pending' },
            { userId: alice.id, choreId: lawn.id, status: 'pending' },
            { userId: john.id, choreId: bathroom.id, status: 'in_progress' },
            { userId: bobby.id, choreId: trash.id, status: 'pending' },
            { userId: alice.id, choreId: kitchen.id, status: 'completed' },
        ],
        skipDuplicates: true,
    });

    console.log('Assigned chores to users');

    const completedChores = await prisma.choreAssignment.findMany({
        where: { status: 'completed' },
        include: {
            chore: true,
            user: true,
        },
    });

    for (const assignment of completedChores) {
        const updatedUser = await prisma.user.update({
            where: { id: assignment.userId },
            data: {
                wallet: { increment: assignment.chore.points },
            },
        });
        console.log(`Updated wallet for ${updatedUser.name}: ${updatedUser.wallet}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
