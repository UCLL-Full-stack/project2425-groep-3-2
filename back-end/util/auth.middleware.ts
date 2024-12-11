// // Assuming you have a User type defined elsewhere
// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import { User } from './model/User'; // Adjust the import path

// // Middleware to check if the user is authenticated
// export const authenticate = (req: Request, res: Response, next: NextFunction) => {
//     const token = req.headers['authorization']?.split(' ')[1]; // Assuming Bearer token format

//     if (!token) {
//         return res.status(401).json({ message: 'Authentication required' });
//     }

//     // Verify the JWT token using the secret from environment variables
//     jwt.verify(token, process.env.JWT_SECRET || '', (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ message: 'Invalid or expired token' });
//         }

//         // Attach the decoded user information to the request object
//         req.user = decoded as User; // Type casting to User, or define a type for decoded if needed
//         next();
//     });
// };
