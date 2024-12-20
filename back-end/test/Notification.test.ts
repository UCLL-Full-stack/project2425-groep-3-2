import { Notification } from '../model/notification';
import { User } from '../model/user';
import { Chore } from '../model/chore';
import { Reward } from '../model/reward';
import { NotificationType } from '../types';

describe('Notification', () => {
  let user: User, chore: Chore, reward: Reward;

  beforeEach(() => {
    user = new User({
      id: 1,
      name: 'User One',
      email: 'user1@example.com',
      password: 'password123',
      role: 'parent',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    chore = new Chore({
      title: 'Chore 1',
      description: 'Description of the chore',
      points: 10,
      assignedUsers: [user],
    });

    reward = new Reward({
      title: 'Reward 1',
      description: 'Description of the reward',
      points: 10,
      redeemedByUsers: [user],
    });
  });

  test('should throw error if message is missing', () => {
    expect(() => {
      new Notification({
        userId: 1,
        message: '',
        type: "CHORE_ASSIGNMENT", 
        user: user,
        chore: chore,
      });
    }).toThrowError('Message is required');
  });


  test('should create a valid Notification object', () => {
    const notification = new Notification({
      userId: 1,
      message: 'You have a new chore!',
      type: "CHORE_ASSIGNMENT",  
      user: user,
      chore: chore,
    });

    expect(notification.message).toBe('You have a new chore!');
    expect(notification.type).toBe("CHORE_ASSIGNMENT"); 
    expect(notification.user).toBe(user);
    expect(notification.chore).toBe(chore);
  });

  test('should check equality correctly', () => {
    const notification1 = new Notification({
      userId: 1,
      message: 'You have a new chore!',
      type: "CHORE_ASSIGNMENT",  
      user: user,
      chore: chore,
    });

    const notification2 = new Notification({
      userId: 1,
      message: 'You have a new chore!',
      type: "CHORE_ASSIGNMENT",  
      user: user,
      chore: chore,
    });

    expect(notification1.equals(notification2)).toBe(true);
  });
});
