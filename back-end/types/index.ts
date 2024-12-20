export type Role = 'parent' | 'child' | 'admin';

export type UserInput = {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  wallet?: number;
  chores?: number[];
  rewards?: number[];
};

export type ChoreInput = {
  title: string;
  description: string;
  points: number;
  assignedUserIds?: number[];
};

export type ChoreStatus = 'pending' | 'incomplete' | 'completed';

export type NotificationType = 'CHORE_ASSIGNMENT' | 'REWARD_REDEMPTION' | 'REWARD_USAGE';

export type ChoreAssignmentInput = {
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
  choreId?: number | null | undefined;
  rewardId?: number | null | undefined;
  message: string;
  type: NotificationType;
  read?: boolean;
  createdAt?: Date;
  extraData?: string | null;
};

export type Reward = {
  id?: number;
  title: string;
  description: string;
  points: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type RewardInput = {
  title: string;
  description: string;
  points?: number;
};

export interface RedeemRewardResponse {
  success: boolean;
  message: string;
}

export interface RedeemRewardSuccessResponse extends RedeemRewardResponse {
  userReward: UserReward;
}

export type UserReward = {
  id?: number;
  userId: number;
  rewardId: number;
  redeemedAt: Date;
};

export type UserRewardInput = {
  userId: number;
  rewardId: number;
  redeemedAt?: Date;
};
