import { User } from '@prisma/client';
import userRepository from '../repository/user.db';
import bcrypt from 'bcrypt';
import generateJWTToken from '../util/jwt';


interface AuthenticatorResponse {

    user : User;
    token: string;
  }
  
  const getAllUsers = async (): Promise<User[]> => {
    return await userRepository.getAllUsers();
  };
  
  const getUserById = async (id: number): Promise<User | null> => {
    return await userRepository.getUserById(id);
  };
  
  const getUserByEmail = async (email: string): Promise<User | null> => {
    return await userRepository.getUserByEmail(email);
  };
  
  // Updated authenticate function
  const authenticate = async (email: string, password: string): Promise<AuthenticatorResponse> => {
    // Step 1: Retrieve user by email
    const user = await getUserByEmail(email);
    
    if (!user) {
      // We do not specify whether the failure was due to email or password to prevent attackers from knowing which is wrong
      throw new Error('Invalid credentials');
    }
  
    // Step 2: Compare entered password with the stored hashed password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      // Similarly, we throw a generic error if password is invalid
      throw new Error('Invalid credentials');
    }
  
    // Step 3: Generate a JWT token
    const token = generateJWTToken(user.email);  // You can use user.id or other details in the token payload
  
    // Step 4: Return authentication response with email and token
    return {
      user,
      token,
    };
  };

const createUser = async (userData: {
    name: string;
    email: string;
    password: string;
    role: string;
}): Promise<User> => {
    return await userRepository.createUser(userData);
};

const updateUser = async (
    id: number,
    userData: { name?: string; email?: string; role?: string }
): Promise<User | null> => {
    return await userRepository.updateUser(id, userData);
};

const deleteUser = async (id: number): Promise<void> => {
    await userRepository.deleteUser(id);
};

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    authenticate,
    createUser,
    updateUser,
    deleteUser,
};
