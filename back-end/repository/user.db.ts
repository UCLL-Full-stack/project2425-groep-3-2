import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getAllUsers = async () => {
    return await prisma.user.findMany();
};

const getUserById = async (id: number) => {
    return await prisma.user.findUnique({
        where: { id },
    });
};

const getUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: { email },
    });
};

const createUser = async (userData: {
    name: string;
    email: string;
    password: string;
    role: string;
}) => {
    return await prisma.user.create({
        data: userData,
    });
};

const updateUser = async (
    id: number,
    userData: { name?: string; email?: string; role?: string }
) => {
    return await prisma.user.update({
        where: { id },
        data: userData,
    });
};

const deleteUser = async (id: number) => {
    await prisma.user.delete({
        where: { id },
    });
};

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
};
