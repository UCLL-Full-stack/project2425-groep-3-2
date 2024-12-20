import { Chore } from '../model/chore';
import { Reward } from '../model/reward';
import { User } from '../model/user';

describe('Chore', () => {
  let user1: User, user2: User; 

  beforeEach(() => {
    user1 = new User({
      id: 1,
      name: 'User One',
      email: 'user1@example.com',
      password: 'password123',
      role: 'parent',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    user2 = new User({
      id: 2,
      name: 'User Two',
      email: 'user2@example.com',
      password: 'password123',
      role: 'child',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
  describe('constructor', () => {

    it('should throw an error if title is missing or empty', () => {
      expect(() => new Reward({
        title: '',
        description: 'Test description',
        points: 10,
        redeemedByUsers: []
      })).toThrowError('Title is required');
    });

    it('should throw an error if description is missing or empty', () => {
      expect(() => new Reward({
        title: 'Test Reward',
        description: '',
        points: 10,
        redeemedByUsers: []
      })).toThrowError('Description is required');
    });

    it('should throw an error if points are negative', () => {
      expect(() => new Reward({
        title: 'Test Reward',
        description: 'Test description',
        points: -5,
        redeemedByUsers: []
      })).toThrowError('Points must be a positive integer');
    });

    it('should create a valid reward with valid parameters', () => {
      const reward = new Reward({
        title: 'Test Reward',
        description: 'Test description',
        points: 10,
        redeemedByUsers: []
      });

      expect(reward.title).toBe('Test Reward');
      expect(reward.description).toBe('Test description');
      expect(reward.points).toBe(10);
      expect(reward.redeemedByUsers).toEqual([]);
    });
  });

  describe('equals', () => {

    it('should return true if all properties are the same', () => {
      const reward1 = new Reward({
        title: 'Test Reward',
        description: 'Test description',
        points: 10,
        redeemedByUsers: [user1]
      });

      const reward2 = new Reward({
        title: 'Test Reward',
        description: 'Test description',
        points: 10,
        redeemedByUsers: [user1]
      });

      expect(reward1.equals(reward2)).toBe(true);
    });

    it('should return false if properties differ', () => {
      const reward1 = new Reward({
        title: 'Test Reward',
        description: 'Test description',
        points: 10,
        redeemedByUsers: [user1]
      });

      const reward2 = new Reward({
        title: 'Another Reward',
        description: 'Test description',
        points: 10,
        redeemedByUsers: [user1]
      });

      expect(reward1.equals(reward2)).toBe(false);
    });

    it('should return false if redeemedByUsers differ', () => {
      const reward1 = new Reward({
        title: 'Test Reward',
        description: 'Test description',
        points: 10,
        redeemedByUsers: [user1]
      });

      const reward2 = new Reward({
        title: 'Test Reward',
        description: 'Test description',
        points: 10,
        redeemedByUsers: [user2]
      });

      expect(reward1.equals(reward2)).toBe(false);
    });
  });

  describe('getRedeemedByUsers', () => {

    it('should return an empty array if no users have redeemed the reward', () => {
      const reward = new Reward({
        title: 'Test Reward',
        description: 'Test description',
        points: 10,
        redeemedByUsers: []
      });

      expect(reward.getRedeemedByUsers()).toEqual([]);
    });

    it('should return the correct list of users who have redeemed the reward', () => {
      const reward = new Reward({
        title: 'Test Reward',
        description: 'Test description',
        points: 10,
        redeemedByUsers: [user1, user2]
      });

      expect(reward.getRedeemedByUsers()).toEqual([user1, user2]);
    });
  });

  describe('redeemByUser', () => {

    it('should add a user to the redeemedByUsers list if not already added', () => {
      const reward = new Reward({
        title: 'Test Reward',
        description: 'Test description',
        points: 10,
        redeemedByUsers: [user1]
      });

      reward.redeemByUser(user2);

      expect(reward.getRedeemedByUsers()).toEqual([user1, user2]);
    });

    it('should not add the same user to the redeemedByUsers list if already redeemed', () => {
      const reward = new Reward({
        title: 'Test Reward',
        description: 'Test description',
        points: 10,
        redeemedByUsers: [user1]
      });

      reward.redeemByUser(user1);

      expect(reward.getRedeemedByUsers()).toEqual([user1]);
    });
  });
});