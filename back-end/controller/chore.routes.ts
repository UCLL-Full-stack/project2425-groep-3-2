import express, { NextFunction, Request, Response } from 'express';
import choreService from '../service/chore.service';
import {Chore, User} from '../types';
const choreRouter = express.Router();

/**
 * @swagger
 * /chores:
 *   get:
 *     summary: Get a list of all chores.
 *     responses:
 *       200:
 *         description: A list of chores.
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
 *                   assignedUsers:
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
choreRouter.get('/chores', async (req: Request, res: Response) => {
    try {
        const chores = await choreService.getAllChores();

        return res.status(200).json(chores);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: "error" });
    }
});



/**
 * @swagger
 * /chores/{id}:
 *   get:
 *     summary: Get a chore by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: A chore object.
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
 *                 assignedUsers:
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
 *         description: Chore not found.
 *       500:
 *         description: Internal server error.
 */
choreRouter.get('/chores/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const chore = await choreService.getChoreById(Number(id));

        if (chore) {
            return res.status(200).json(chore);
        } else {
            return res.status(404).json({
                message: 'Chore not found',
            });
        }
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: "error" });
    }
});



/**
 * @swagger
 * /chores:
 *   post:
 *     summary: Add a new chore.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Clean the bathroom"
 *               description:
 *                 type: string
 *                 example: "Make sure to clean the sink and toilet."
 *               points:
 *                 type: number
 *                 example: 5
 *     responses:
 *       201:
 *         description: Chore created successfully.
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
 *                 assignedUsers:
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
choreRouter.post('/chores', async (req: Request, res: Response) => {
    try {
        const { title, description, points } = req.body;
        const newChore = await choreService.addChore(title, description, points);

        // Directly return the newChore if the format matches the required response
        res.status(201).json(newChore);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: "can't add chore" });
    }
});



/**
 * @swagger
 * /chores/assign:
 *   post:
 *     summary: Assign a chore to a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: number
 *                 example: 1
 *               choreId:
 *                 type: number
 *                 example: 1
 *               status:
 *                 type: string
 *                 enum: ['incomplete', 'awaiting acceptance', 'complete']
 *     responses:
 *       200:
 *         description: Chore assigned successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: number
 *                 choreId:
 *                   type: number
 *                 status:
 *                   type: string
 *                 assignedAt:
 *                   type: number
 *       404:
 *         description: User or Chore not found.
 *       500:
 *         description: Internal server error.
 */
choreRouter.post('/chores/assign', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, choreId, status } = req.body;

        const assignment = await choreService.assignChoreToUser(userId, choreId, status);

        return res.status(200).json(assignment);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /chores/user/{userId}:
 *   get:
 *     summary: Get all chores assigned to a user by user ID.
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: A list of chores assigned to the user.
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
 *                   assignedUsers:
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
 *       404:
 *         description: User not found or no chores assigned.
 *       500:
 *         description: Internal server error.
 */
choreRouter.get('/chores/user/:userId', async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const chores = await choreService.getChoresByUserId(Number(userId));
        if (chores.length > 0) {
            return res.status(200).json(chores);
        } else {
            return res.status(404).json({
                message: 'User not found or no chores assigned.',
            });
        }
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: "error" });
    }
});



export { choreRouter };
