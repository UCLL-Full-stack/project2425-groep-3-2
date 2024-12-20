export type Role = 'parent' | 'child' | 'admin';

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
  rewards?: UserReward[];
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

export interface Reward {
  id: number;
  title: string;
  description: string;
  points: number;
  createdAt: Date;
  updatedAt: Date;
  redeemedByUsers: UserReward[];
}

export interface UserReward {
  id: number;
  userId: number;
  rewardId: number;
  redeemedAt: Date;
  user: User;
  reward: Reward;
}

export interface AuthPayload {
  email: string;
  password: string;
}

export interface RedeemRewardRequest {
  rewardId: number;
  userId: number;
}

export interface RewardServiceResponse {
  success: boolean;
  message: string;
  redeemedReward?: Reward;
}

export interface UserServiceResponse {
  success: boolean;
  message: string;
  user?: User;
}

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

export type NotificationType = 'CHORE_ASSIGNMENT' | 'REWARD_REDEMPTION' | 'REWARD_USAGE';

export type NotificationInput = {
  userId: number;
  choreId?: number;
  rewardId?: number;
  message: string;
  type: NotificationType;
  read?: boolean;
  createdAt?: number;
};

export type ChoreAssignmentInput = {
  userId: number;
  choreId: number;
  status: Status;
};
