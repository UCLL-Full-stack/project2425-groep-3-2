import { User } from '@prisma/client';
import userRepository from '../repository/user.db';
import choreRepository from '../repository/chore.db';  // Import chore repository
import bcrypt from 'bcrypt';
import generateJWTToken from '../util/jwt';
import { Role } from '../types';

interface AuthenticatorResponse {
    user: User;
    token: string;
    role: string;
}

const getAllUsers = async (): Promise<User[]> => {
    return await userRepository.getAllUsers();
};

const getUserById = async (id: number): Promise<{
    id: number;
    name: string;
    email: string;
    role: string;
    wallet: number;
} | null> => {
    return await userRepository.getUserById(id);
};

const getUserByEmail = async (email: string): Promise<User | null> => {
    return await userRepository.getUserByEmail(email);
};

const authenticate = async (email: string, password: string): Promise<AuthenticatorResponse> => {
    const user = await getUserByEmail(email);

    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error('Invalid credentials');
    }

    const token = generateJWTToken(user.email, user.role);
    return {
        user,
        token,
        role: user.role,
    };
};

const createUser = async (userData: { name: string; email: string; password: string; role: string }): Promise<User> => {
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

const getChoreAssignmentsByUserId = async (userId: number) => {
    return await choreRepository.getChoreAssignmentsByUserId(userId);
};

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    authenticate,
    createUser,
    updateUser,
    deleteUser,
    getChoreAssignmentsByUserId,
};
