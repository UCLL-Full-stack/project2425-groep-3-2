export type Role = 'parent' | 'child';

export type User = {
    equals(arg0: any): unknown;
    id?: number; 
    name?: string; 
    email?: string;
    password?: string;
    role?: Role;
    wallet?: number;
    chores?: Chore[]; 
}

export type Chore ={
    equals(arg0: any): unknown;
    id?: number;
    title?: string;
    description?: string;
    points?: number;
    assignedUsers: User[];
    createdAt?: number;
}

export type ChoreStatus = 'incomplete' | 'awaiting acceptance' | 'complete';

export type  UserChore ={
    user: User;
    chore: Chore;
    status?: ChoreStatus; 
    assignedAt?: number; 
}

export type AuthPayload ={
    email: string;
    password: string;
}
