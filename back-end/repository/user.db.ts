import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
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
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    return await prisma.user.create({
        data: {
            name: userData.name,
            email: userData.email,
            password: hashedPassword,  
            role: userData.role,
        },
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
