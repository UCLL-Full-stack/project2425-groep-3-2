import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';

const userRouter = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       401:
 *         description: Invalid email or password.
 *       500:
 *         description: Internal server error.
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const user = await userService.verifyLogin(email, password);

        if (user) {
            return res.status(200).json({
                message: 'Login successful',
                user: {
                    id: user.getId(),
                    name: user.getName(),
                    email: user.getEmail(),
                    role: user.getRole(),
                },
            });
        } else {
            return res.status(401).json({
                message: 'Invalid email or password',
            });
        }
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all users.
 *     responses:
 *       200:
 *         description: A list of users.
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
 *       500:
 *         description: Internal server error.
 */
userRouter.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();

        const usersResponse = users.map(user => ({
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            role: user.getRole(),
        }));

        res.status(200).json(usersResponse);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: A user object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
userRouter.get('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(Number(id));

        if (user) {
            return res.status(200).json({
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                role: user.getRole(),
            });
        } else {
            return res.status(404).json({
                message: 'User not found',
            });
        }
    } catch (error) {
        next(error);
    }
});


export { userRouter };
