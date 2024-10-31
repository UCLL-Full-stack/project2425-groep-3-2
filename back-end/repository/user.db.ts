import { User } from '../model/user';
import { Role } from '../types';

const users: User[] = [
    new User({
        id: 1,
        name: 'John Doe',
        email: 'john.doe@test.com',
        password: 'password123',
        role: 'parent',
    }),
    new User({
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@test.com',
        password: 'password456',
        role: 'child',
    }),
    new User({
        id: 3,
        name: 'Bobby Smith',
        email: 'bobby.smith@test.com',
        password: 'password789',
        role: 'child',
    }),
];


const getAllUsers = (): User[] => {
    return users;
};


const getUserById = (id: number): User | null => {
    const user = users.find(user => user.getId() === id);
    return user || null;
};


const getUserByEmail = (email: string): User | null => {
    const user = users.find(user => user.getEmail() === email);
    return user || null;
};


const createUser = (userData: {
    name: string;
    email: string;
    password: string;
    role: Role;
}): User => {
    const newUser = new User({
        id: users.length + 1,
        ...userData,
    });
    users.push(newUser);
    return newUser;
};


const updateUser = (id: number, userData: { name?: string; email?: string; role?: string }): User | null => {
    const userIndex = users.findIndex(user => user.getId() === id);
    if (userIndex === -1) {
        return null; 
    }

    const existingUser = users[userIndex];
    const updatedUser = new User({
        id: existingUser.getId(),
        name: userData.name || existingUser.getName(),
        email: userData.email || existingUser.getEmail(),
        password: existingUser.getPassword(), 
        role: userData.role as Role|| existingUser.getRole(),
    });

    users[userIndex] = updatedUser;
    return updatedUser;
};


const deleteUser = (id: number): void => {
    const userIndex = users.findIndex(user => user.getId() === id);
    if (userIndex !== -1) {
        users.splice(userIndex, 1); 
    }
};

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
};
