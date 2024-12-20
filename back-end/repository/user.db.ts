import { PrismaClient, User, UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

const getAllUsers = async () => {
    return await prisma.user.findMany();
};

const getUserById = async (userId: number): Promise<User | null> => {
    return await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            wallet: true,
            password: true,
            createdAt: true,
            updatedAt: true,
        },
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
    role: UserRole;
}) => {
    const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

  const existingUser = await prisma.user.findUnique({
    where: { email: userData.email },
  });

  if (existingUser) {
    throw new Error('Email is already taken');
  }

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
    userData: { name?: string; email?: string; role?: UserRole }
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
