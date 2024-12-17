export type Role = 'parent' | 'child';
export type Status = 'pending' | 'completed' | 'incomplete';
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
    status: Status;
    assignedAt: Date;
    user: User; 
    chore: Chore; 
    
}


export interface AuthPayload {
    email: string;
    password: string;
}
