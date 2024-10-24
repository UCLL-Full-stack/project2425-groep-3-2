import { User } from '../model/user';

const users = [
    new User({
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        role: 'parent',
    }),
    new User({
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        password: 'password456',
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

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
};
