import rewardService from '../service/reward.service';
import rewardRepository from '../repository/reward.db';
import { RewardInput, UserReward, UserInput, RedeemRewardSuccessResponse } from '../types';

jest.mock('../repository/reward.db');

describe('Reward Service', () => {
  const mockReward = {
    id: 1,
    title: 'Free Coffee',
    description: 'Get a free coffee after 100 points',
    points: 100,
  };

  const mockUserReward = {
    userId: 1,
    rewardId: 1,
    redeemedAt: new Date(),
  };

  const mockUser = {
    id: 1,
    name: 'John Doe',
    wallet: 200,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllRewards', () => {
    it('should return a list of rewards', async () => {
      const mockRewards = [mockReward];
      (rewardRepository.getAllRewards as jest.Mock).mockResolvedValue(mockRewards);

      const rewards = await rewardService.getAllRewards();

      expect(rewards).toEqual(mockRewards);
      expect(rewardRepository.getAllRewards).toHaveBeenCalledTimes(1);
    });
  });

  describe('getRewardById', () => {
    it('should return a reward by its ID', async () => {
      (rewardRepository.getRewardById as jest.Mock).mockResolvedValue(mockReward);

      const reward = await rewardService.getRewardById(1);

      expect(reward).toEqual(mockReward);
      expect(rewardRepository.getRewardById).toHaveBeenCalledWith(1);
    });

    it('should return null if the reward does not exist', async () => {
      (rewardRepository.getRewardById as jest.Mock).mockResolvedValue(null);

      const reward = await rewardService.getRewardById(999);

      expect(reward).toBeNull();
    });
  });

  describe('addReward', () => {
    it('should add a new reward', async () => {
      const newReward = { ...mockReward, id: 2 };
      (rewardRepository.addReward as jest.Mock).mockResolvedValue(newReward);

      const reward = await rewardService.addReward('Free Snack', 'Get a free snack after 50 points', 50);

      expect(reward).toEqual(newReward);
      expect(rewardRepository.addReward).toHaveBeenCalledWith('Free Snack', 'Get a free snack after 50 points', 50);
    });
  });

  describe('redeemReward', () => {
    it('should fail to redeem a reward if the user does not have enough points', async () => {
      const mockResponse = {
        success: false,
        message: 'Insufficient points to redeem this reward.',
      };

      mockUser.wallet = 50;
      (rewardRepository.redeemReward as jest.Mock).mockResolvedValue(mockResponse);

      const response = await rewardService.redeemReward(1, 1);

      expect(response.success).toBe(false);
      expect(response.message).toBe('Insufficient points to redeem this reward.');
      expect(rewardRepository.redeemReward).toHaveBeenCalledWith(1, 1);
    });

    it('should fail if the user or reward is not found', async () => {
      const mockResponse = {
        success: false,
        message: 'User or reward not found.',
      };

      (rewardRepository.redeemReward as jest.Mock).mockResolvedValue(mockResponse);

      const response = await rewardService.redeemReward(999, 1);

      expect(response.success).toBe(false);
      expect(response.message).toBe('User or reward not found.');
      expect(rewardRepository.redeemReward).toHaveBeenCalledWith(999, 1);
    });
  });

  describe('getRedeemedUsers', () => {
    it('should return a list of users who redeemed a reward', async () => {
      const mockUsers = [mockUser];
      (rewardRepository.getRedeemedUsers as jest.Mock).mockResolvedValue(mockUsers);

      const users = await rewardService.getRedeemedUsers(1);

      expect(users).toEqual(mockUsers);
      expect(rewardRepository.getRedeemedUsers).toHaveBeenCalledWith(1);
    });
  });

  describe('getRewardsByUser', () => {
    it('should return a list of rewards a user has redeemed', async () => {
      const mockRewards = [mockReward];
      (rewardRepository.getRewardsByUser as jest.Mock).mockResolvedValue([{ reward: mockReward }]);

      const rewards = await rewardService.getRewardsByUser(1);

      expect(rewards).toEqual(mockRewards);
      expect(rewardRepository.getRewardsByUser).toHaveBeenCalledWith(1);
    });
  });

  describe('deleteReward', () => {
    it('should delete a user\'s reward', async () => {
      (rewardRepository.deleteReward as jest.Mock).mockResolvedValue(mockReward);

      const reward = await rewardService.deleteReward(1, 1);

      expect(reward).toEqual(mockReward);
      expect(rewardRepository.deleteReward).toHaveBeenCalledWith(1, 1);
    });

    it('should throw an error if reward or userReward is not found', async () => {
      (rewardRepository.deleteReward as jest.Mock).mockRejectedValue(new Error('Reward not found'));

      await expect(rewardService.deleteReward(999, 1)).rejects.toThrowError('Reward not found');
    });
  });
});
