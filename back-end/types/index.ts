export type Role = 'parent' | 'child' | 'admin';

export type UserInput = {
    id?: number;
    name: string; 
    email: string; 
    password: string; 
    role: Role;  
    wallet?: number; 
    chores?: number[];
};

export type ChoreInput = {
    title: string;  
    description: string; 
    points: number;  
    assignedUserIds?: number[];
};

export type ChoreStatus = 'pending' | 'incomplete' | 'completed';

export type NotificationType = 'CHORE_ASSIGNMENT' | 'REWARD_REDEMPTION';

export type UserChoreInput = {
    userId: number;
    choreId: number;
    status: ChoreStatus; 
};

export type AuthPayload = {
    email: string;
    password: string;
};

export type Chore = {
    id?: number;
    title: string;
    description: string;
    points: number;
    createdAt?: Date;
    updatedAt?: Date;
};
export type NotificationInput = {
    userId: number;
    choreId?: number; 
    rewardId?: number; 
    message: string;
    type: NotificationType;
    read?: boolean; 
    createdAt?: number; 
};
