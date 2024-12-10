import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getAllChores = async () => {
    return await prisma.chore.findMany({
        include: {
            assignedTo: {
                include: {
                    user: true,
                },
            },
        },
    });
};

const getChoreById = async (id: number) => {
    return await prisma.chore.findUnique({
        where: { id },
        include: {
            assignedTo: {
                include: {
                    user: true,
                },
            },
        },
    });
};

const addChore = async (title: string, description: string, points: number) => {
    return await prisma.chore.create({
        data: {
            title,
            description,
            points,
        },
    });
};

const assignChoreToUser = async (
    userId: number,
    choreId: number,
    status: string
) => {
    return await prisma.choreAssignment.create({
        data: {
            userId,
            choreId,
            status,
        },
        include: {
            user: true,
            chore: true,
        },
    });
};

const getChoresByUserId = async (userId: number) => {
    const assignments = await prisma.choreAssignment.findMany({
        where: { userId },
        include: {
            chore: true,
        },
    });
    return assignments.map(assignment => assignment.chore);
};

export default {
    getAllChores,
    getChoreById,
    addChore,
    assignChoreToUser,
    getChoresByUserId,
};
