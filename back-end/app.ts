import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {userRouter} from './controller/user.routes';
import { choreRouter } from './controller/chore.routes';
import rewardRouter from "./controller/reward.routes";
import {notificationRouter} from "./controller/notification.routes";
import { expressjwt } from 'express-jwt';
const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());

app.get('/status', (req, res) => {
    res.json({ message: 'Courses API is running...' });
});

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Courses API',
            version: '1.0.0', 
        },

    },
    apis: ['./controller/*.routes.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(
    expressjwt({
        secret: process.env.JWT_SECRET || 'default_secret',
        algorithms: ['HS256'],
    }).unless({
        path: [
            '/signup',    
            '/login',      
            '/status',         
            '/api-docs',         
            '/swagger-ui.html',
        ]
    })
);


app.use(bodyParser.json());
app.get('/users', userRouter);
app.get('/users/:id', userRouter);
app.post('/login', userRouter);
app.get('/chores', choreRouter);
app.get('/chores/:id', choreRouter);
app.post('/chores/assign', choreRouter);
app.get('/chores/user/:userId',choreRouter)
app.post('/users', userRouter);
app.put('/users/:id', userRouter);
app.delete('/users/:id', userRouter);
app.get('/chores/assignments/user/:userId',choreRouter);
app.post('/chores/remove-assignment', choreRouter);
app.put('/chores/assignment/:assignmentId/status',choreRouter);
app.get('/chores/assignments/children',choreRouter);
app.get('/rewards/:id/redeemed-users', rewardRouter);
app.post('/rewards/:id/redeem',rewardRouter);
app.post('/rewards', rewardRouter);
app.get('/rewards/:id',rewardRouter);
app.get('/rewards', rewardRouter);
app.delete('/rewards/:id',rewardRouter);
app.get('/users/:userId/rewards',rewardRouter);
app.get('/notifications/all',notificationRouter);
app.post('/notifications',notificationRouter);
app.put('/notifications/:id/read',notificationRouter);
app.get('/notifications/unread',notificationRouter);
app.get('/notifications',notificationRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
