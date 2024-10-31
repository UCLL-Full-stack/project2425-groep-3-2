import { User } from '../types';

export class Chore {
    public id: number;
    private title: string;
    private description: string;
    private points: number;
    private createdAt: number;
    private assignedUsers: User[];

    constructor(chore: {
        id: number; 
        title: string;
        description: string;
        points: number;
        createdAt: number;
        assignedUsers?: User[]; 
    }) {
        this.id = chore.id; 
        this.title = chore.title;
        this.description = chore.description;
        this.points = chore.points;
        this.createdAt = chore.createdAt;
        this.assignedUsers = chore.assignedUsers || []; 
    }

    getId(): number {
        return this.id;
    }

    getAssignedUsers(): User[] {
        return this.assignedUsers;
    }

    assignUser(user: User): void {
        if (!this.assignedUsers.includes(user)) {
            this.assignedUsers.push(user);
        }
    }

    getTitle(): string {
        return this.title;
    }

    getDescription(): string {
        return this.description;
    }

    getPoints(): number {
        return this.points;
    }

    getCreatedAt(): number {
        return this.createdAt;
    }


    private validate(chore: { title: string; description: string; points: number }) {
        if (!chore.title?.trim()) {
            throw new Error('Title is required');
        }
        if (!chore.description?.trim()) {
            throw new Error('Description is required');
        }
        if (chore.points < 0) {
            throw new Error('Points must be a positive integer');
        }
    }
}
