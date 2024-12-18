import express, { NextFunction, Request, Response } from 'express';
import rewardService from '../service/reward.service';
import { PrismaClient } from '@prisma/client';

const rewardRouter = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   security:
 *     - BearerAuth: []
 */

/**
 * @swagger
 * /rewards:
 *   get:
 *     summary: Get a list of all rewards.
 *     description: Fetch all available rewards in the system.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of rewards.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   points:
 *                     type: number
 *                   createdAt:
 *                     type: number
 *                   redeemedByUsers:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: number
 *                         name:
 *                           type: string
 *                         email:
 *                           type: string
 *                         role:
 *                           type: string
 *       500:
 *         description: Internal server error.
 */
rewardRouter.get('/rewards', async (req: Request, res: Response) => {
    try {
        const rewards = await rewardService.getAllRewards();
        return res.status(200).json(rewards);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: 'Error fetching rewards' });
    }
});

/**
 * @swagger
 * /rewards/{id}:
 *   get:
 *     summary: Get a reward by ID.
 *     description: Fetch a specific reward by its unique identifier.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A single reward object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 points:
 *                   type: number
 *                 createdAt:
 *                   type: number
 *                 redeemedByUsers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       role:
 *                         type: string
 *       404:
 *         description: Reward not found.
 *       500:
 *         description: Internal server error.
 */
rewardRouter.get('/rewards/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const reward = await rewardService.getRewardById(Number(id));

        if (reward) {
            return res.status(200).json(reward);
        } else {
            return res.status(404).json({ message: 'Reward not found' });
        }
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: 'Error fetching reward' });
    }
});

/**
 * @swagger
 * /rewards:
 *   post:
 *     summary: Add a new reward.
 *     description: Create a new reward with the given details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Extra TV Time"
 *               description:
 *                 type: string
 *                 example: "An additional 30 minutes of TV time."
 *               points:
 *                 type: number
 *                 example: 3
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Reward created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 points:
 *                   type: number
 *                 createdAt:
 *                   type: number
 *                 redeemedByUsers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       role:
 *                         type: string
 *       500:
 *         description: Internal server error.
 */
rewardRouter.post('/rewards', async (req: Request, res: Response) => {
    try {
        const { title, description, points } = req.body;
        const newReward = await rewardService.addReward(title, description, points);
        res.status(201).json(newReward);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: 'Error adding reward' });
    }
});

/**
 * @swagger
 * /rewards/{id}/redeem:
 *   post:
 *     summary: Redeem a reward by a user.
 *     description: Redeem a reward by a specific user.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: userId
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Reward redeemed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reward redeemed successfully."
 *       400:
 *         description: Error redeeming reward.
 *       404:
 *         description: Reward or user not found.
 *       500:
 *         description: Internal server error.
 */
rewardRouter.post('/rewards/:id/redeem', async (req: Request, res: Response) => {
    try {
        const { id } = req.params; 
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const userIdNumber = Number(userId);
        console.log('Converted User ID (Number):', userIdNumber);

        const user = await prisma.user.findUnique({ where: { id: userIdNumber } });
        const reward = await rewardService.getRewardById(Number(id)); 
        if (!user || !reward) {
            return res.status(404).json({ message: 'Reward or User not found' });
        }
        const redemptionResult = await rewardService.redeemReward(userIdNumber, Number(id));
        

        if ('userReward' in redemptionResult) {
            return res.status(200).json({
                message: 'Reward redeemed successfully',
                userReward: redemptionResult.userReward, 
            });
        } else {
            return res.status(400).json(redemptionResult);
        }
    } catch (error: unknown) {
        console.error('Error during reward redemption:', error);
        res.status(500).json({ message: 'Error redeeming reward', error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
});




/**
 * @swagger
 * /rewards/{id}/redeemed-users:
 *   get:
 *     summary: Get all users who have redeemed a specific reward.
 *     description: Fetch a list of users who have redeemed a specific reward.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of users who have redeemed the reward.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *       404:
 *         description: Reward not found.
 *       500:
 *         description: Internal server error.
 */
rewardRouter.get('/rewards/:id/redeemed-users', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const redeemedUsers = await rewardService.getRedeemedUsers(Number(id));

        if (redeemedUsers.length === 0) {
            return res.status(404).json({ message: 'No users have redeemed this reward' });
        }

        return res.status(200).json(redeemedUsers);
    } catch (error) {
        console.error('Error fetching redeemed users:', error);
        return res.status(500).json({ message: 'Error fetching redeemed users', error: "error.message" });
    }
});

/**
 * @swagger
 * /users/{userId}/rewards:
 *   get:
 *     summary: Get all rewards for a specific user.
 *     description: Fetch a list of all rewards redeemed by a specific user.
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of rewards associated with the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   points:
 *                     type: number
 *                   createdAt:
 *                     type: number
 *       400:
 *         description: Invalid user ID.
 *       404:
 *         description: No rewards found for the user.
 *       500:
 *         description: Internal server error.
 */

rewardRouter.get('/users/:userId/rewards', async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        
        if (isNaN(Number(userId))) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const rewards = await rewardService.getRewardsByUser(Number(userId));

        if (rewards.length === 0) {
            return res.status(404).json({ message: 'No rewards found for this user' });
        }

        return res.status(200).json(rewards);
    } catch (error) {
        console.error('Error fetching rewards for user:', error);
        return res.status(500).json({ message: 'Error fetching rewards for user', error: "error.message" });
    }
});
/**
 * @swagger
 * /rewards/{id}:
 *   delete:
 *     summary: Delete a specific reward from the user's rewards.
 *     description: Remove the reward from the user's redeemed list, but not from the reward list itself.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: userId
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Reward deleted from user's rewards successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reward deleted from user's rewards successfully."
 *       400:
 *         description: User ID is required.
 *       404:
 *         description: Reward or UserReward not found.
 *       500:
 *         description: Internal server error.
 */
rewardRouter.delete('/rewards/:id', async (req: Request, res: Response) => {
    const { id } = req.params; 
    const { userId } = req.query; 
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const userReward = await prisma.userReward.findFirst({
            where: {
                rewardId: Number(id),
                userId: Number(userId),
            },
        });

        if (!userReward) {
            return res.status(404).json({ message: 'Reward or UserReward not found' });
        }

        await prisma.userReward.delete({
            where: {
                id: userReward.id,
            },
        });
        return res.status(200).json({ message: 'Reward deleted from user\'s rewards successfully' });
    } catch (error) {
        console.error('Error deleting reward:', error);
        return res.status(500).json({ message: 'Error deleting reward', error: "error.message" });
    }
});

export default rewardRouter;
