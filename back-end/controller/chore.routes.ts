import express, { NextFunction, Request, Response } from 'express';
import choreService from '../service/chore.service';
import { Chore, User } from '../types';
const choreRouter = express.Router();

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
 * /chores:
 *   get:
 *     summary: Get a list of all chores.
 *     description: Fetch all the available chores in the system.
 *     security:
 *       - BearerAuth: []
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
        res.status(400).json({ status: 'error', errorMessage: 'Error fetching chores' });
    }
});

/**
 * @swagger
 * /chores/{id}:
 *   get:
 *     summary: Get a chore by ID.
 *     description: Fetch a specific chore by its unique identifier.
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
 *         description: A single chore object.
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
            return res.status(404).json({ message: 'Chore not found' });
        }
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: 'Error fetching chore' });
    }
});

/**
 * @swagger
 * /chores:
 *   post:
 *     summary: Add a new chore.
 *     description: Create a new chore with the given details.
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
 *     security:
 *       - BearerAuth: []
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
        res.status(201).json(newChore);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: 'Error adding chore' });
    }
});

/**
 * @swagger
 * /chores/assign:
 *   post:
 *     summary: Assign a chore to a user.
 *     description: Assign a chore to a specific user with a status.
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
 *     security:
 *       - BearerAuth: []
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
 * /chores/remove-assignment:
 *   post:
 *     summary: Remove a chore assignment from a user.
 *     description: Remove the assignment of a chore from a user.
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
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Chore assignment removed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Chore assignment removed successfully'
 *       404:
 *         description: User or Chore not found.
 *       500:
 *         description: Internal server error.
 */
choreRouter.post('/chores/remove-assignment', async (req, res) => {
    const { userId, choreId } = req.body;
    try {
        await choreService.removeChoreAssignment(userId, choreId);
        res.status(200).json({ message: 'Chore assignment removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to remove chore assignment', error: "error" });
    }
});

/**
 * @swagger
 * /chores/user/{userId}:
 *   get:
 *     summary: Get all chores assigned to a user by user ID.
 *     description: Fetch all chores assigned to a specific user by their ID.
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
            return res.status(404).json({ message: 'User not found or no chores assigned.' });
        }
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: 'Error fetching user chores' });
    }
});

export { choreRouter };
