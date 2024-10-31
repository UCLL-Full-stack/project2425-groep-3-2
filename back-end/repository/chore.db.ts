import { Chore, UserChore, ChoreStatus } from '../types';
import { Chore as ChoreModel } from '../model/chore'; 
import userRepository from './user.db';


const chores: ChoreModel[] = [
    new ChoreModel({
        id: 1,
        title: 'Clean the kitchen',
        description: 'Wipe down the counters and clean the dishes.',
        points: 5,
        createdAt: Date.now(),
        assignedUsers: [],
    }),
    new ChoreModel({
        id: 2,
        title: 'Take out the trash',
        description: 'Dispose of the trash in the kitchen.',
        points: 3,
        createdAt: Date.now(),
        assignedUsers: [],
    }),
    new ChoreModel({
        id: 3,
        title: 'Vacuum the living room',
        description: 'Vacuum the carpets and tidy up the furniture.',
        points: 4,
        createdAt: Date.now(),
        assignedUsers: [],
    }),
];


const getAllChores = (): ChoreModel[] => {
    return chores;
};

const getChoreById = (id: number): ChoreModel | null => {
    const chore = chores.find(chore => chore.getId() === id);
    return chore || null;
};

const addChore = (title: string, description: string, points: number): ChoreModel => {
    const newChore = new ChoreModel({
        id: Date.now(),
        title,
        description,
        points,
        createdAt: Date.now(),
        assignedUsers: [],
    });
    chores.push(newChore);
    return newChore;
};

const assignChoreToUser = (userId: number, choreId: number, status: ChoreStatus): UserChore => {
    const user = userRepository.getUserById(userId);
    const chore = getChoreById(choreId);

    if (user && chore) {
        const newAssignment: UserChore = {
            userId,
            choreId,
            status,
            assignedAt: Date.now(),
        };
        
        chore.assignUser(user); 
        return newAssignment;
    } else {
        throw new Error('User or Chore not found');
    }
};

const getChoresByUserId = (userId: number): ChoreModel[] => {
    return chores.filter(chore => chore.getAssignedUsers().some(user => user.getId() === userId));
};

export default {
    getAllChores,
    getChoreById,
    addChore,
    assignChoreToUser,
    getChoresByUserId,
};
