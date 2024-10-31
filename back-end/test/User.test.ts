import { User } from '../model/user'; 
import { Chore } from '../model/chore';

describe('User', () => {
    let user: User;

    beforeEach(() => {
        user = new User({
            id: 1,
            name: 'Alice',
            email: 'alice@example.com',
            password: 'password123',
            role: 'parent',
        });
    });

    it('should instantiate with correct values', () => {
        expect(user.getId()).toBe(1);
        expect(user.getName()).toBe('Alice');
        expect(user.getEmail()).toBe('alice@example.com');
        expect(user.getRole()).toBe('parent');
    });

    it('should add a chore to the user', () => {
        const chore = new Chore({
            id: 1,
            title: 'Test Chore',
            description: 'This is a test chore',
            points: 10,
            createdAt: Date.now(),
        });

        user.addChore(chore);
        expect(user.getChores()).toContain(chore);
    });

    it('should throw an error for invalid user creation', () => {
        expect(() => {
            new User({
                id: 2,
                name: '',
                email: 'test@example.com',
                password: 'password',
                role: 'child',
            });
        }).toThrow('Name is required');

        expect(() => {
            new User({
                id: 3,
                name: 'Valid Name',
                email: '',
                password: 'password',
                role: 'child',
            });
        }).toThrow('Email is required');

        expect(() => {
            new User({
                id: 4,
                name: 'Valid Name',
                email: 'test@example.com',
                password: '',
                role: 'child',
            });
        }).toThrow('Password is required');

        expect(() => {
            new User({
                id: 5,
                name: 'Valid Name',
                email: 'test@example.com',
                password: 'password',
                role: undefined as any,
            });
        }).toThrow('Role is required');
    });

    it('should compare equality with another user', () => {
        const otherUser = new User({
            id: 2,
            name: 'Alice',
            email: 'alice@example.com',
            password: 'password123',
            role: 'parent',
        });

        expect(user.equals(otherUser)).toBe(true);
    });

    it('should not equal a different user', () => {
        const differentUser = new User({
            id: 3,
            name: 'Bob',
            email: 'bob@example.com',
            password: 'password456',
            role: 'child',
        });

        expect(user.equals(differentUser)).toBe(false);
    });
});
