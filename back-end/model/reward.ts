import { User } from './user';

export class Reward {
    readonly id?: number;
    readonly title: string;
    readonly description: string;
    readonly points: number;
    readonly createdAt?: number;
    readonly redeemedByUsers: User[];

    constructor(reward: {
        id?: number; 
        title: string;
        description: string;
        points: number;
        createdAt?: number;
        redeemedByUsers: User[]; 
    }) {
        this.validate(reward);
        this.id = reward.id; 
        this.title = reward.title;
        this.description = reward.description;
        this.points = reward.points;
        this.createdAt = reward.createdAt;
        this.redeemedByUsers = reward.redeemedByUsers || []; 
    }

    validate(reward: { title: string; description: string; points: number }) {
        if (!reward.title?.trim()) {
            throw new Error('Title is required');
        }
        if (!reward.description?.trim()) {
            throw new Error('Description is required');
        }
        if (reward.points < 0) {
            throw new Error('Points must be a positive integer');
        }
    }

    equals({
        id,
        title,
        description,
        points,
        createdAt,
        redeemedByUsers
    }: Reward): boolean {
        return (
            this.id === id &&
            this.title === title &&
            this.description === description &&
            this.points === points &&
            this.createdAt === createdAt &&
            this.redeemedByUsers.every((redeemedUser, index) => redeemedUser.equals(redeemedByUsers[index]))
        );
    }

    getRedeemedByUsers(): User[] {
        return this.redeemedByUsers;
    }

    redeemByUser(user: User): void {
        if (!this.redeemedByUsers.some(redeemedUser => redeemedUser.id === user.id)) {
            this.redeemedByUsers.push(user);
        }
    }
}
