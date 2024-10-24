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

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    verifyLogin,
};
