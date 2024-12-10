import { Chore, ChoreAssignment } from '@prisma/client';
import choreRepository from '../repository/chore.db';

const getAllChores = async (): Promise<(Chore & { assignedTo: ChoreAssignment[] })[]> => {
    return await choreRepository.getAllChores();
};

const getChoreById = async (id: number): Promise<Chore | null> => {
    return await choreRepository.getChoreById(id);
};

const addChore = async (title: string, description: string, points: number): Promise<Chore> => {
    return await choreRepository.addChore(title, description, points);
};

const assignChoreToUser = async (
    userId: number,
    choreId: number,
    status: string
): Promise<ChoreAssignment> => {
    return await choreRepository.assignChoreToUser(userId, choreId, status);
};

const getChoresByUserId = async (userId: number): Promise<Chore[]> => {
    return await choreRepository.getChoresByUserId(userId);
};

export default {
    getAllChores,
    getChoreById,
    addChore,
    assignChoreToUser,
    getChoresByUserId,
};
