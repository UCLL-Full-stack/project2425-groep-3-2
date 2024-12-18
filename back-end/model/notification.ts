import { Chore } from './chore';
import { Reward } from './reward';
import { User } from './user';
import { NotificationType } from '../types';

export class Notification {
    readonly id?: number;
    readonly userId: number;
    readonly choreId?: number;
    readonly rewardId?: number;
    readonly message: string;
    readonly type: NotificationType;
    readonly read: boolean;
    readonly createdAt?: number;
    readonly user: User; 
    readonly chore?: Chore;  
    readonly reward?: Reward; 

    constructor(notification: {
        id?: number;
        userId: number;
        choreId?: number;
        rewardId?: number;
        message: string;
        type: NotificationType;
        read?: boolean;
        createdAt?: number;
        user: User; 
        chore?: Chore; 
        reward?: Reward;
    }) {
        this.validate(notification);
        this.id = notification.id;
        this.userId = notification.userId;
        this.choreId = notification.choreId;
        this.rewardId = notification.rewardId;
        this.message = notification.message;
        this.type = notification.type;
        this.read = notification.read ?? false;
        this.createdAt = notification.createdAt;
        this.user = notification.user;
        this.chore = notification.chore;
        this.reward = notification.reward;
    }

    validate(notification: {
        userId: number;
        message: string;
        type: string;
    }) {
        if (!notification.userId) {
            throw new Error('User ID is required');
        }
        if (!notification.message?.trim()) {
            throw new Error('Message is required');
        }
        if (!notification.type?.trim()) {
            throw new Error('Type is required');
        }
    }

    equals({
        id,
        userId,
        choreId,
        rewardId,
        message,
        type,
        read,
        createdAt,
        user,
        chore,
        reward
    }: Notification): boolean {
        return (
            this.id === id &&
            this.userId === userId &&
            this.choreId === choreId &&
            this.rewardId === rewardId &&
            this.message === message &&
            this.type === type &&
            this.read === read &&
            this.createdAt === createdAt &&
            this.user.equals(user) &&
            (chore ? chore.id === this.choreId : true) && 
            (reward ? reward.id === this.rewardId : true)
        );
    }

    getSummary(): string {
        return `${this.type}: ${this.message}`;
    }
}
