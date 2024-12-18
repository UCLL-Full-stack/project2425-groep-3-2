import express, { NextFunction, Request, Response } from 'express';
import notificationService from '../service/notification.service';

const notificationRouter = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /notifications:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all notifications for a specific user.
 *     parameters:
 *       - name: userId
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: A list of notifications for the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   message:
 *                     type: string
 *                   type:
 *                     type: string
 *                   read:
 *                     type: boolean
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: No notifications found.
 *       500:
 *         description: Internal server error.
 */
notificationRouter.get('/notifications', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const notifications = await notificationService.getNotificationsByUser(Number(userId));
        res.status(200).json(notifications);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /notifications/unread:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all unread notifications for a specific user.
 *     parameters:
 *       - name: userId
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: A list of unread notifications for the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   message:
 *                     type: string
 *                   type:
 *                     type: string
 *                   read:
 *                     type: boolean
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: No unread notifications found.
 *       500:
 *         description: Internal server error.
 */
notificationRouter.get('/notifications/unread', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const unreadNotifications = await notificationService.getUnreadNotifications(Number(userId));
        res.status(200).json(unreadNotifications);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /notifications/{id}/read:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Mark a notification as read.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Notification marked as read.
 *       404:
 *         description: Notification not found.
 *       500:
 *         description: Internal server error.
 */
notificationRouter.put('/notifications/:id/read', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const updatedNotification = await notificationService.markNotificationAsRead(Number(id));

        if (updatedNotification) {
            return res.status(200).json({
                message: 'Notification marked as read',
                notification: updatedNotification,
            });
        } else {
            return res.status(404).json({ message: 'Notification not found' });
        }
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /notifications:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new notification.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               message:
 *                 type: string
 *                 example: "Your chore is completed."
 *               type:
 *                 type: string
 *                 example: "CHORE_ASSIGNMENT"
 *               choreId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Notification created successfully.
 *       500:
 *         description: Internal server error.
 */
notificationRouter.post('/notifications', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, message, type, choreId, rewardId } = req.body;

        if (!userId || !message || !type) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newNotification = await notificationService.createNotification(userId, message, type, choreId, rewardId);
        res.status(201).json(newNotification);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /notifications/all:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all notifications (admin access).
 *     responses:
 *       200:
 *         description: A list of all notifications.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   message:
 *                     type: string
 *                   type:
 *                     type: string
 *                   read:
 *                     type: boolean
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal server error.
 */
notificationRouter.get('/notifications/all', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notifications = await notificationService.getAllNotifications();
        res.status(200).json(notifications);
    } catch (error) {
        next(error);
    }
});

export { notificationRouter };
