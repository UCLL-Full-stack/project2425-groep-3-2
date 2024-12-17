import { Chore, ChoreAssignment, PrismaClient } from '@prisma/client';

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


const addChore = async (title: string, description: string, points: number) => {
    return await prisma.chore.create({
        data: {
            title,
            description,
            points,
        },
    });
};

const removeChoreAssignment = async (userId: number, choreId: number) => {
    const result = await prisma.choreAssignment.deleteMany({
        where: {
            userId,
            choreId,
        },
    });

    if (result.count === 0) {
        throw new Error('No assignment found to remove');
    }

    return result;
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
const getChoreAssignmentsByUserId = async (userId: number): Promise<ChoreAssignment[]> => {
    return await prisma.choreAssignment.findMany({
        where: { userId },
        include: {
            chore: true,
        },
    });
};
const getChoreAssignmentById = async (assignmentId: number): Promise<ChoreAssignment | null> => {
    return await prisma.choreAssignment.findUnique({
        where: { id: assignmentId },
        include: {
            chore: true,
            user: true,
        },
    });
};

const getChoreById = async (id: number): Promise<Chore | null> => {
    return await prisma.chore.findUnique({
        where: { id },
    });
};

const updateUserWallet = async (userId: number, points: number): Promise<void> => {
    await prisma.user.update({
        where: { id: userId },
        data: {
            wallet: {
                increment: points,
            },
        },
    });
};

const updateChoreAssignmentStatus = async (
    choreAssignmentId: number,
    status: 'pending' | 'completed' | 'incomplete'
): Promise<ChoreAssignment> => {
    return await prisma.choreAssignment.update({
        where: { id: choreAssignmentId },
        data: { status },
    });
};

export default {
    getAllChores,
    getChoreById,
    addChore,
    assignChoreToUser,
    getChoresByUserId,
    removeChoreAssignment,
    updateChoreAssignmentStatus,
    getChoreAssignmentsByUserId,
    getChoreAssignmentById,
    updateUserWallet
};
