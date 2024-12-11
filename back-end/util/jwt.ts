import jwt from 'jsonwebtoken';

// Define a secret key for signing the JWT. (This should be stored securely, e.g., in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Replace with a real secret in your environment variables
const JWT_EXPIRATION = '8h'; // Set the token expiration time (e.g., 1 hour)

/**
 * Generates a JWT token for a given username.
 * 
 * @param username - The username for which to generate the token.
 * @returns The signed JWT token.
 */
const generateJWTToken = (username: string): string => {
  // Create the payload
  const payload = {
    username,
  };

  // Sign the JWT token with the payload, secret key, and expiration time
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });

  return token;
};

export default generateJWTToken;
