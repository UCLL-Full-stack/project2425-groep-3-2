export type Role = 'parent' | 'child';

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: Role;
    chores?: Chore[];
}

export interface Chore {
    id: number;
    title: string;
    description: string;
    points: number;
    createdAt: Date;
    assignedUsers?: User[];
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
