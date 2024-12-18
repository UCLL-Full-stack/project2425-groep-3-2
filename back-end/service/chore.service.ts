import { Chore, ChoreAssignment, ChoreStatus } from '@prisma/client';
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

const removeChoreAssignment = async (userId: number, choreId: number): Promise<void> => {
    await choreRepository.removeChoreAssignment(userId, choreId);
};


const assignChoreToUser = async (
    userId: number,
    choreId: number,
    status: ChoreStatus, 
): Promise<ChoreAssignment> => {
   
    const assignedStatus = status || 'incomplete';

    return await choreRepository.assignChoreToUser(userId, choreId, assignedStatus);
};


const getChoresByUserId = async (userId: number): Promise<Chore[]> => {
    return await choreRepository.getChoresByUserId(userId);
};
const getChoreAssignmentsByUserId = async (userId: number): Promise<ChoreAssignment[]> => {
    return await choreRepository.getChoreAssignmentsByUserId(userId);
};


const getChoreAssignmentById = async (assignmentId: number): Promise<ChoreAssignment | null> => {
    return await choreRepository.getChoreAssignmentById(assignmentId);
};

const updateChoreAssignmentStatus = async (
    choreAssignmentId: number,
    status: 'pending' | 'completed' | 'incomplete'
): Promise<ChoreAssignment> => {
    const assignment = await getChoreAssignmentById(choreAssignmentId);

    if (!assignment) {
        throw new Error('Chore assignment not found');
    }

    if (assignment.status === 'completed' && status === 'completed') {
        return assignment;
    }
    if (status === 'completed') {
        await addPointsToUserWallet(assignment.userId, assignment.choreId);
    }
    return await choreRepository.updateChoreAssignmentStatus(choreAssignmentId, status);
};

const addPointsToUserWallet = async (userId: number, choreId: number): Promise<void> => {
    const chore = await choreRepository.getChoreById(choreId);
    if (!chore) {
        throw new Error('Chore not found');
    }
    await choreRepository.updateUserWallet(userId, chore.points);
};
export default {
    getAllChores,
    getChoreById,
    addChore,
    assignChoreToUser,
    getChoresByUserId,
    removeChoreAssignment,
    getChoreAssignmentsByUserId,
    updateChoreAssignmentStatus,
    addPointsToUserWallet,
    getChoreAssignmentById
};
