import { Chore, Role } from '../types';

export class User {
    private id: number;
    private name: string;
    private email: string;
    private password: string;
    private role: Role;
    private createdAt: Date;
    private updatedAt: Date;
    private chores: Chore[];

    constructor(user: {
        id: number; 
        name: string;
        email: string;
        password: string;
        role: Role;
        createdAt?: Date;
        updatedAt?: Date;
        chores?: Chore[];
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
    }

    getChores(): Chore[] {
        return this.chores;
    }

    addChore(chore: Chore): void {
        this.chores.push(chore);
    }
    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    getRole(): Role {
        return this.role;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getUpdatedAt(): Date {
        return this.updatedAt;
    }

    private validate(user: {
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
            this.name === user.getName() &&
            this.email === user.getEmail() &&
            this.password === user.getPassword() &&
            this.role === user.getRole()
        );
    }
}
