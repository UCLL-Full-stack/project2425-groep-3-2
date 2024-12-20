import userService from '../service/user.service';
import userRepository from '../repository/user.db';
import choreRepository from '../repository/chore.db';
import { Role } from '../types';
import bcrypt from 'bcrypt';
import { UserRole } from '@prisma/client';

// Mock the necessary modules
jest.mock('../repository/user.db');
jest.mock('bcrypt');
jest.mock('../util/jwt'); // Mock the jwt module

describe('UserService', () => {
  const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'hashed_password',
    role: 'parent',
    wallet: 100,
  };

  const mockToken = 'mock_jwt_token';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('authenticate', () => {
    it('should return user, token, and role when credentials are valid', async () => {
      (userRepository.getUserByEmail as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const mockGenerateJWTToken = jest.fn().mockReturnValue(mockToken);
      const jwtModule = require('../util/jwt');
      jwtModule.generateJWTToken = mockGenerateJWTToken;

      const response = await userService.authenticate('john.doe@example.com', 'password123');

      expect(response).toHaveProperty('user');
      expect(response.user).toEqual(mockUser);
      expect("mock_jwt_token").toBe(mockToken);
      expect(response.role).toBe(mockUser.role);

      expect(userRepository.getUserByEmail).toHaveBeenCalledWith('john.doe@example.com');
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', mockUser.password);
      expect(mockGenerateJWTToken).toHaveBeenCalledWith(mockUser.email, mockUser.role);
    });

    it('should throw an error when the user is not found', async () => {
      (userRepository.getUserByEmail as jest.Mock).mockResolvedValue(null);

      await expect(userService.authenticate('invalid@example.com', 'password123')).rejects.toThrowError('Invalid credentials');

      expect(userRepository.getUserByEmail).toHaveBeenCalledWith('invalid@example.com');
    });

    it('should throw an error when the password is incorrect', async () => {
      (userRepository.getUserByEmail as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(userService.authenticate('john.doe@example.com', 'wrong_password')).rejects.toThrowError('Invalid credentials');

      expect(userRepository.getUserByEmail).toHaveBeenCalledWith('john.doe@example.com');
      expect(bcrypt.compare).toHaveBeenCalledWith('wrong_password', mockUser.password);
    });



    it('should throw an error when the user is not found', async () => {
      (userRepository.getUserByEmail as jest.Mock).mockResolvedValue(null);

      await expect(userService.authenticate('invalid@example.com', 'password123')).rejects.toThrowError('Invalid credentials');

      expect(userRepository.getUserByEmail).toHaveBeenCalledWith('invalid@example.com');
    });

    it('should throw an error when the password is incorrect', async () => {
      (userRepository.getUserByEmail as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(userService.authenticate('john.doe@example.com', 'wrong_password')).rejects.toThrowError('Invalid credentials');

      expect(userRepository.getUserByEmail).toHaveBeenCalledWith('john.doe@example.com');
      expect(bcrypt.compare).toHaveBeenCalledWith('wrong_password', mockUser.password);
    });
  });

  describe('createUser', () => {
    it('should create a user when email is not taken', async () => {
      const newUser = {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        password: 'password123',
        role: UserRole.parent,
      };

      (userRepository.createUser as jest.Mock).mockResolvedValue({
        ...newUser,
        id: 2,
        password: 'hashed_password',
      });

      const createdUser = await userService.createUser(newUser);

      expect(createdUser).toHaveProperty('id');
      expect(createdUser.email).toBe(newUser.email);
      expect(userRepository.createUser).toHaveBeenCalledWith(newUser);
    });

    it('should throw an error if the email is already taken', async () => {
      const newUser = {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        password: 'password123',
        role: UserRole.parent,
      };

      (userRepository.createUser as jest.Mock).mockRejectedValue(new Error('Email is already taken'));

      await expect(userService.createUser(newUser)).rejects.toThrowError('Email is already taken');
    });
  });

  describe('getUserById', () => {
    it('should return user data when user is found', async () => {
      (userRepository.getUserById as jest.Mock).mockResolvedValue(mockUser);

      const user = await userService.getUserById(1);

      expect(user).toEqual(mockUser);
      expect(userRepository.getUserById).toHaveBeenCalledWith(1);
    });

    it('should return null when user is not found', async () => {
      (userRepository.getUserById as jest.Mock).mockResolvedValue(null);

      const user = await userService.getUserById(999);

      expect(user).toBeNull();
      expect(userRepository.getUserById).toHaveBeenCalledWith(999);
    });
  });

  describe('updateUser', () => {
    it('should update user details', async () => {
      const updatedData = { name: 'John Smith' };
  
      (userRepository.updateUser as jest.Mock).mockResolvedValue({
        ...mockUser,
        ...updatedData,
      });
  
      const updatedUser = await userService.updateUser(1, updatedData);
      expect(updatedUser).not.toBeNull();
      if (updatedUser) {
        expect(updatedUser.name).toBe(updatedData.name);
      }
  
      expect(userRepository.updateUser).toHaveBeenCalledWith(1, updatedData);
    });
  });
  

    it('should return null if the user does not exist', async () => {
      const updatedData = { name: 'John Smith' };

      (userRepository.updateUser as jest.Mock).mockResolvedValue(null);

      const updatedUser = await userService.updateUser(999, updatedData);

      expect(updatedUser).toBeNull();
      expect(userRepository.updateUser).toHaveBeenCalledWith(999, updatedData);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      (userRepository.deleteUser as jest.Mock).mockResolvedValue(undefined);

      await expect(userService.deleteUser(1)).resolves.toBeUndefined();
      expect(userRepository.deleteUser).toHaveBeenCalledWith(1);
    });
  });

  describe('getChoreAssignmentsByUserId', () => {
    it('should return chore assignments for a user', async () => {
      const mockAssignments = [{ choreId: 1, userId: 1, status: 'incomplete' }];
      (choreRepository.getChoreAssignmentsByUserId as jest.Mock).mockResolvedValue(mockAssignments);

      const assignments = await userService.getChoreAssignmentsByUserId(1);

      expect(assignments).toEqual(mockAssignments);
      expect(choreRepository.getChoreAssignmentsByUserId).toHaveBeenCalledWith(1);
    });
  });
