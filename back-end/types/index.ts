export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: 'parent' | 'child';
  }
  
  export interface AuthPayload {
    email: string;
    password: string;
  }
  export type Role = 'parent' | 'child';
  