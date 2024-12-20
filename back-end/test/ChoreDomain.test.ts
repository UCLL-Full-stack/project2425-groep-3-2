import { Chore } from '../model/chore';
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

  test('should throw error if title is missing', () => {
    expect(() => {
      new Chore({
        title: '',
        description: 'Description of the chore',
        points: 10,
        assignedUsers: [user1],
      });
    }).toThrowError('Title is required');
  });

  test('should throw error if description is missing', () => {
    expect(() => {
      new Chore({
        title: 'Chore 1',
        description: '',
        points: 10,
        assignedUsers: [user1],
      });
    }).toThrowError('Description is required');
  });

  test('should throw error if points are negative', () => {
    expect(() => {
      new Chore({
        title: 'Chore 1',
        description: 'Description of the chore',
        points: -1,
        assignedUsers: [user1],
      });
    }).toThrowError('Points must be a positive integer');
  });

  test('should create a valid Chore object', () => {
    const chore = new Chore({
      title: 'Chore 1',
      description: 'Description of the chore',
      points: 10,
      assignedUsers: [user1],
    });

    expect(chore.title).toBe('Chore 1');
    expect(chore.description).toBe('Description of the chore');
    expect(chore.points).toBe(10);
    expect(chore.assignedUsers).toEqual([user1]);
  });

  test('should assign a user to the chore', () => {
    const chore = new Chore({
      title: 'Chore 1',
      description: 'Description of the chore',
      points: 10,
      assignedUsers: [user1],
    });

    chore.assignUser(user2);

    expect(chore.assignedUsers).toContain(user2);
  });

  test('should not assign duplicate user', () => {
    const chore = new Chore({
      title: 'Chore 1',
      description: 'Description of the chore',
      points: 10,
      assignedUsers: [user1],
    });

    chore.assignUser(user1);  // Duplicate user
    expect(chore.assignedUsers.length).toBe(1);
  });

  test('should check equality correctly', () => {
    const chore1 = new Chore({
      title: 'Chore 1',
      description: 'Description of the chore',
      points: 10,
      assignedUsers: [user1],
    });

    const chore2 = new Chore({
      title: 'Chore 1',
      description: 'Description of the chore',
      points: 10,
      assignedUsers: [user1],
    });

    expect(chore1.equals(chore2)).toBe(true);
  });
});
