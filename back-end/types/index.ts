export type Role = 'parent' | 'child';

export interface User {
    getId(): number; 
    getName(): string; 
    getEmail(): string;
    getPassword(): string;
    getRole(): Role;
    getChores(): Chore[]; 
}

export interface Chore {
    getId(): number;
    getTitle(): string;
    getDescription(): string;
    getPoints(): number;
    getCreatedAt(): number;
    getAssignedUsers(): User[];
}

export type ChoreStatus = 'incomplete' | 'awaiting acceptance' | 'complete';

export interface UserChore {
    userId: number;
    choreId: number;
    status: ChoreStatus; 
    assignedAt: number; 
}

export interface AuthPayload {
    email: string;
    password: string;
}
