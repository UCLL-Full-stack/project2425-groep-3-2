import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRATION = '8h';

const generateJWTToken = (username: string, role: string): string => {
    const payload = {
        username,
        role, 
    };

    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION,
    });

    return token;
};

export default generateJWTToken;
