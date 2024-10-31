import { User } from '../model/user';

const users = [
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

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
};
