import { Chore } from './chore'; 
import { Role } from '../types';

export class User {
    readonly id?: number;
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly role: Role;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly chores: Chore[];
    readonly wallet: number;

    constructor(user: {
        id?: number;
        name: string;
        email: string;
        password: string;
        role: Role;
        createdAt?: Date;
        updatedAt?: Date;
        chores?: Chore[];
        wallet?: number;
    }) {
        this.validate(user);
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
        this.createdAt = user.createdAt || new Date();
        this.updatedAt = user.updatedAt || new Date();
        this.chores = user.chores || [];
        this.wallet = user.wallet || 0;
    }

    validate(user: {
        name: string;
        email: string;
        password: string;
        role: Role;
    }) {
        if (!user.name?.trim()) {
            throw new Error('Name is required');
        }
        if (!user.email?.trim()) {
            throw new Error('Email is required');
        }
        if (!user.password?.trim()) {
            throw new Error('Password is required');
        }
        if (!user.role) {
            throw new Error('Role is required');
        }
    }

    equals(user: User): boolean {
        return (
            this.id === user.id &&
            this.name === user.name &&
            this.email === user.email &&
            this.password === user.password &&
            this.role === user.role &&
            this.createdAt.getTime() === user.createdAt.getTime() &&
            this.updatedAt.getTime() === user.updatedAt.getTime() &&
            this.chores.every((chore, index) => chore.equals(user.chores[index])) && 
            this.wallet === user.wallet
        );
    }
}
