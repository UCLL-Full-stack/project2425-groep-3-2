export type Role = 'parent' | 'child';

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: Role;
    wallet: number;
    createdAt: Date;
    updatedAt: Date;
    chores?: ChoreAssignment[];
}

export interface Chore {
    id: number;
    title: string;
    description: string;
    points: number;
    createdAt: Date;
    assignedTo: ChoreAssignment[];
}

export interface ChoreAssignment {
    id: number;
    userId: number;
    choreId: number;
    status: 'pending' | 'completed' | 'incomplete';
    assignedAt: Date;
    user: User; 
    chore: Chore; 
}

export type ChoreStatus = 'incomplete' | 'awaiting acceptance' | 'complete';

export interface UserChore {
    userId: number;
    choreId: number;
    status: ChoreStatus;
    assignedAt: Date;
}

export interface AuthPayload {
    email: string;
    password: string;
}
