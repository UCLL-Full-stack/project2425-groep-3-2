import { User } from '../model/user';
import { Chore } from '../model/chore'; 
import { Role } from '../types';  

describe('User', () => {
  let user1: User, user2: User, chore1: Chore, chore2: Chore;

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


    chore1 = new Chore({
      id: 1,
      title: 'Clean Room',
      description: 'Clean the room thoroughly.',
      points: 5,
      assignedUsers: [user1],
    });

    chore2 = new Chore({
      id: 2,
      title: 'Wash Dishes',
      description: 'Wash all the dishes in the sink.',
      points: 3,
      assignedUsers: [user2],
    });
  });

  describe('constructor', () => {
    it('should throw an error if name is missing or empty', () => {
      expect(() => new User({
        name: '',
        email: 'test@example.com',
        password: 'password123',
        role: 'child',
        createdAt: new Date(),
        updatedAt: new Date(),
      })).toThrowError('Name is required');
    });

    it('should throw an error if email is missing or invalid', () => {
      expect(() => new User({
        name: 'John Doe',
        email: '',
        password: 'password123',
        role: 'child',
        createdAt: new Date(),
        updatedAt: new Date(),
      })).toThrowError('Email is required');

      expect(() => new User({
        name: 'John Doe',
        email: 'invalid-email',
        password: 'password123',
        role: 'child',
        createdAt: new Date(),
        updatedAt: new Date(),
      })).toThrowError('Invalid email format');
    });

    it('should throw an error if password is missing or empty', () => {
      expect(() => new User({
        name: 'John Doe',
        email: 'john@example.com',
        password: '',
        role: 'child',
        createdAt: new Date(),
        updatedAt: new Date(),
      })).toThrowError('Password is required');
    });


    it('should create a valid user with correct parameters', () => {
      const user = new User({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'parent',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      expect(user.name).toBe('John Doe');
      expect(user.email).toBe('john@example.com');
      expect(user.password).toBe('password123');
      expect(user.role).toBe('parent');
    });
  });

  describe('equals', () => {
    it('should return true if all properties are the same', () => {
      const userA = new User({
        id: 1,
        name: 'Alice',
        email: 'alice@example.com',
        password: 'password123',
        role: 'parent',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const userB = new User({
        id: 1,
        name: 'Alice',
        email: 'alice@example.com',
        password: 'password123',
        role: 'parent',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      expect(userA.equals(userB)).toBe(true);
    });

    it('should return false if properties differ', () => {
      const userA = new User({
        id: 1,
        name: 'Alice',
        email: 'alice@example.com',
        password: 'password123',
        role: 'parent',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const userB = new User({
        id: 2,
        name: 'Bob',
        email: 'bob@example.com',
        password: 'password123',
        role: 'child',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      expect(userA.equals(userB)).toBe(false);
    });
  });

  describe('chores', () => {
    it('should add a chore to the user\'s list of chores', () => {
      user1.chores.push(chore1);
      expect(user1.chores).toEqual([chore1]);
    });


    it('should assign a chore to a user', () => {
      chore1.assignUser(user2);
      expect(chore1.getAssignedUsers()).toEqual([user1, user2]);
    });

    it('should return the correct list of chores assigned to the user', () => {
      user1.chores.push(chore1);
      user1.chores.push(chore2);

      expect(user1.chores).toEqual([chore1, chore2]);
    });

    it('should return true if user and chore are the same', () => {
      const choreA = new Chore({
        id: 1,
        title: 'Test Chore',
        description: 'Test Description',
        points: 5,
        assignedUsers: [user1],
      });

      const choreB = new Chore({
        id: 1,
        title: 'Test Chore',
        description: 'Test Description',
        points: 5,
        assignedUsers: [user1],
      });

      expect(choreA.equals(choreB)).toBe(true);
    });

    it('should return false if chores differ', () => {
      const choreA = new Chore({
        id: 1,
        title: 'Test Chore',
        description: 'Test Description',
        points: 5,
        assignedUsers: [user1],
      });

      const choreB = new Chore({
        id: 2,
        title: 'Test Chore',
        description: 'Test Description',
        points: 5,
        assignedUsers: [user1],
      });

      expect(choreA.equals(choreB)).toBe(false);
    });
  });
});
