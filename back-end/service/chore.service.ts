import { Chore as ChoreModel, UserChore, ChoreStatus } from '../types';
import choreRepository from '../repository/chore.db';

const getAllChores = (): ChoreModel[] => {
    return choreRepository.getAllChores();
};

const getChoreById = (id: number): ChoreModel | null => {
    return choreRepository.getChoreById(id);
};

const addChore = (title: string, description: string, points: number): ChoreModel => {
    return choreRepository.addChore(title, description, points);
};

const assignChoreToUser = (userId: number, choreId: number, status: ChoreStatus): UserChore => {
    return choreRepository.assignChoreToUser(userId, choreId, status);
};

const getChoresByUserId = (userId: number): ChoreModel[] => {
    return choreRepository.getChoresByUserId(userId);
};

export default {
    getAllChores,
    getChoreById,
    addChore,
    assignChoreToUser,
    getChoresByUserId,
};
