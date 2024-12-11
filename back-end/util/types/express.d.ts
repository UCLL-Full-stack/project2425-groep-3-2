import { User } from '@prisma/client'; // Assuming you are using Prisma's User model

declare global {
  namespace Express {
    interface Request {
      user?: User | null;  // The user object will be added to the Request
    }
  }
}
