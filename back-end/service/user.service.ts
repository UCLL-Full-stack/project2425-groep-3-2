import { User } from '../model/user';
import userRepository from '../repository/user.db';


const getAllUsers = (): User[] => {
    return userRepository.getAllUsers();
};


const getUserById = (id: number): User | null => {
    return userRepository.getUserById(id);
};


const getUserByEmail = (email: string): User | null => {
    return userRepository.getUserByEmail(email);
};


const verifyLogin = (email: string, password: string): User | null => {
    const user = userRepository.getUserByEmail(email);
    if (user && user.getPassword() === password) {
        return user;
    }
    return null;
};


const createUser = (userData: {
    name: string;
    email: string;
    password: string;
    role: 'parent' | 'child';
}): User => {
    const newUser = userRepository.createUser(userData);
    return newUser;
};


const updateUser = (id: number, userData: { name?: string; email?: string; role?: 'parent' | 'child' }): User | null => {
    const updatedUser = userRepository.updateUser(id, userData);
    return updatedUser;
};


const deleteUser = (id: number): void => {
    userRepository.deleteUser(id);
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
