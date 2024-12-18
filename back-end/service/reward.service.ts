import { Reward, UserReward, User } from '@prisma/client';
import rewardRepository from '../repository/reward.db';

const getAllRewards = async (): Promise<Reward[]> => {
    return await rewardRepository.getAllRewards();
};
const getRewardById = async (rewardId: number): Promise<Reward | null> => {
    return await rewardRepository.getRewardById(rewardId);
};

const addReward = async (title: string, description: string, points: number): Promise<Reward> => {
    return await rewardRepository.addReward(title, description, points);
};
interface RedeemRewardResponse {
    success: boolean;
    message: string;
}

interface RedeemRewardSuccessResponse {
    success: boolean;
    message: string;
    userReward: UserReward;
}

const redeemReward = async (userId: number, rewardId: number): Promise<RedeemRewardResponse | RedeemRewardSuccessResponse> => {
    try {
        const response = await rewardRepository.redeemReward(userId, rewardId);
        if ('success' in response && 'message' in response) {
            return response;
        }
        return { 
            success: true, 
            message: 'Reward redeemed successfully', 
            userReward: response
        };
    } catch (error) {
        console.error('Error redeeming reward:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'An unknown error occurred',
        };
    }
};

const getRedeemedUsers = async (rewardId: number): Promise<User[]> => {
    return await rewardRepository.getRedeemedUsers(rewardId);
};


const getRewardsByUser = async (userId: number): Promise<Reward[]> => {
    const userRewards = await rewardRepository.getRewardsByUser(userId);
    return userRewards.map(userReward => userReward.reward);
};
const deleteReward = async (rewardId: number, userId: number): Promise<Reward> => {
    return await rewardRepository.deleteReward(rewardId, userId);
};
export default {
    getAllRewards,
    getRewardById,
    addReward,
    redeemReward,
    getRedeemedUsers,
    getRewardsByUser, 
    deleteReward,
};
