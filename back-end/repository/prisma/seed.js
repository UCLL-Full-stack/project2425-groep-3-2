const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();
const saltRounds = 10;

async function main() {
    await prisma.notification.deleteMany();
    await prisma.userReward.deleteMany();
    await prisma.choreAssignment.deleteMany();
    await prisma.reward.deleteMany();
    await prisma.chore.deleteMany();
    await prisma.user.deleteMany();

    console.log('Cleared existing data from notifications, userReward, choreAssignments, rewards, chores, and users.');

    const users = [
        { name: 'John Doe', email: 'john.doe@test.com', password: 'password123', role: 'parent', wallet: 0 },
        { name: 'Jane Smith', email: 'jane.smith@test.com', password: 'password456', role: 'child', wallet: 0 },
        { name: 'Bobby Smith', email: 'bobby.smith@test.com', password: 'password789', role: 'child', wallet: 0 },
        { name: 'Alice Johnson', email: 'alice.johnson@test.com', password: 'password234', role: 'child', wallet: 0 },
    ];

    const rewards = [
        { title: 'Extra TV Time', description: 'An additional 30 minutes of TV time.', points: 3 },
        { title: 'Extra Snack', description: 'Enjoy an extra snack of your choice.', points: 2 },
        { title: 'One Hour Later Bedtime', description: 'Stay up one hour later tonight.', points: 5 },
        { title: 'Half Hour Later Bedtime', description: 'Stay up half an hour later tonight.', points: 3 },
    ];

    await prisma.reward.createMany({
        data: rewards,
        skipDuplicates: true,
    });

    console.log('Created rewards.');

    const usersWithHashedPasswords = await Promise.all(
        users.map(async (user) => {
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

    console.log(`Created ${createdUsers.count} users.`);

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

    console.log('Created chores.');

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
            { userId: jane.id, choreId: kitchen.id, status: 'incomplete' },
            { userId: jane.id, choreId: trash.id, status: 'completed' },
            { userId: bobby.id, choreId: vacuum.id, status: 'pending' },
            { userId: alice.id, choreId: lawn.id, status: 'pending' },
            { userId: bobby.id, choreId: trash.id, status: 'incomplete' },
            { userId: alice.id, choreId: kitchen.id, status: 'incomplete' },
        ],
        skipDuplicates: true,
    });

    console.log('Assigned chores to users.');

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

        const availableRewards = await prisma.reward.findMany({
            where: { points: { lte: updatedUser.wallet } },
        });

        for (const reward of availableRewards) {
            await prisma.userReward.create({
                data: {
                    userId: updatedUser.id,
                    rewardId: reward.id,
                },
            });
            console.log(`Redeemed reward "${reward.title}" for ${updatedUser.name}`);
        }
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
