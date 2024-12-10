import { User } from '@prisma/client';
import userRepository from '../repository/user.db';

const getAllUsers = async (): Promise<User[]> => {
    return await userRepository.getAllUsers();
};

const getUserById = async (id: number): Promise<User | null> => {
    return await userRepository.getUserById(id);
};

const getUserByEmail = async (email: string): Promise<User | null> => {
    return await userRepository.getUserByEmail(email);
};

const verifyLogin = async (email: string, password: string): Promise<User | null> => {
    const user = await userRepository.getUserByEmail(email);
    if (user && user.password === password) {
        return user;
    }
    return null;
};

const createUser = async (userData: {
    name: string;
    email: string;
    password: string;
    role: string;
}): Promise<User> => {
    return await userRepository.createUser(userData);
};

const updateUser = async (
    id: number,
    userData: { name?: string; email?: string; role?: string }
): Promise<User | null> => {
    return await userRepository.updateUser(id, userData);
};

const deleteUser = async (id: number): Promise<void> => {
    await userRepository.deleteUser(id);
};

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    verifyLogin,
    createUser,
    updateUser,
    deleteUser,
};
