import { Chore } from '../model/chore';
import { User } from '../model/user';  

describe('Chore', () => {
    let chore: Chore;

    beforeEach(() => {
        chore = new Chore({
            id: 1,
            title: 'Test Chore',
            description: 'This is a test chore',
            points: 10,
            createdAt: Date.now(),
            assignedUsers: [],
        });
    });

    it('should instantiate with correct values', () => {
        expect(chore.id).toBe(1);
        expect(chore.title).toBe('Test Chore');
        expect(chore.description).toBe('This is a test chore');
        expect(chore.points).toBe(10);
    });

    it('should assign a user', () => {
        const user = new User({
            id: 1,
            name: 'Alice',
            email: 'alice@example.com',
            password: 'password123',
            role: 'child',
        });

        chore.assignUser(user);
        expect(chore.getAssignedUsers()).toContain(user);
    });

    it('should not assign the same user multiple times', () => {
        const user = new User({
            id: 1,
            name: 'Alice',
            email: 'alice@example.com',
            password: 'password123',
            role: 'child',
        });

        chore.assignUser(user);
        chore.assignUser(user); 
        expect(chore.getAssignedUsers().length).toBe(1);
    });

    it('should throw an error for invalid chore creation', () => {
        expect(() => {
            new Chore({
                id: 2,
                title: '',
                description: 'Invalid chore',
                points: -5,
                createdAt: Date.now(),
                assignedUsers: [],
            });
        }).toThrow('Title is required');
        
        expect(() => {
            new Chore({
                id: 3,
                title: 'Valid Title',
                description: '',
                points: 10,
                createdAt: Date.now(),
                assignedUsers: [],
            });
        }).toThrow('Description is required');

        expect(() => {
            new Chore({
                id: 4,
                title: 'Valid Title',
                description: 'Valid Description',
                points: -1,
                createdAt: Date.now(),
                assignedUsers: [],
            });
        }).toThrow('Points must be a positive integer');
    });
});
