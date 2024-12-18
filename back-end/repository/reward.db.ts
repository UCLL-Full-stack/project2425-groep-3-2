import { PrismaClient, Reward, User, UserReward, Notification, NotificationType } from '@prisma/client';
import { createNotification } from './notification.db';

const prisma = new PrismaClient();


const getAllRewards = async () => {
    return await prisma.reward.findMany();
};

const getRewardById = async (rewardId: number) => {
    return await prisma.reward.findUnique({
        where: { id: rewardId },
    });
};

const deleteReward = async (rewardId: number, userId: number): Promise<Reward> => {
    const reward = await prisma.reward.findUnique({
        where: { id: rewardId },
    });
    if (!reward) {
        throw new Error('Reward not found');
    }
    try {
        const userReward = await prisma.userReward.findFirst({
            where: {
                userId: userId,
                rewardId: rewardId,
            },
        });

        if (!userReward) {
            throw new Error('UserReward not found for this user');
        }

        await prisma.userReward.delete({
            where: {
                id: userReward.id,
            },
        });
    } catch (error) {
        console.error('Error deleting reward:', error);
        throw error;
    }

    return reward;
};


const addReward = async (title: string, description: string, points: number): Promise<Reward> => {
    return await prisma.reward.create({
        data: {
            title,
            description,
            points,
        },
    });
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
        const user = await prisma.user.findUnique({ where: { id: userId } });
        const reward = await prisma.reward.findUnique({ where: { id: rewardId } });

        if (!user || !reward) {
            return { success: false, message: 'User or reward not found.' };
        }

        if (user.wallet < reward.points) {
            return { success: false, message: 'Insufficient points to redeem this reward.' };
        }

        console.log('User wallet before update:', user.wallet);

        await prisma.user.update({
            where: { id: userId },
            data: {
                wallet: { decrement: reward.points },
            },
        });

        const updatedUser = await prisma.user.findUnique({ where: { id: userId } });
        console.log('User wallet after update:', updatedUser?.wallet);

        const userReward = await prisma.userReward.create({
            data: {
                userId: userId,
                rewardId: rewardId,
                redeemedAt: new Date(),
            },
        });

        console.log('Created UserReward:', userReward);

        const notificationMessage = `${user.name} has bought ${reward.title}`;
        const notificationType = 'REWARD_REDEMPTION';
        
        try {
            await createNotification(userId, notificationMessage, notificationType, undefined, rewardId);
            console.log('Notification created successfully');
        } catch (error) {
            console.error('Error creating notification for redemption:', error);
        }

        return { success: true, message: 'Reward redeemed successfully', userReward };
    } catch (error) {
        console.error('Error redeeming reward:', error);
        return { success: false, message: 'An error occurred while redeeming the reward.' };
    }
};


const getRewardsByUser = async (userId: number) => {
    return await prisma.userReward.findMany({
        where: { userId },
        include: {
            reward: true, 
        },
    });
};
const getRedeemedUsers = async (rewardId: number): Promise<User[]> => {
    return await prisma.user.findMany({
        where: {
            rewards: {
                some: {
                    rewardId: rewardId,
                },
            },
        },
    });
};

export default {
    getAllRewards,
    getRewardById,
    getRedeemedUsers,
    redeemReward,
    addReward,
    getRewardsByUser,
    deleteReward,
};
