import { User } from './user';

export class Chore {
  readonly id?: number;
  readonly title: string;
  readonly description: string;
  readonly points: number;
  readonly createdAt?: number;
  readonly assignedUsers: User[];

  constructor(chore: {
    id?: number;
    title: string;
    description: string;
    points: number;
    createdAt?: number;
    assignedUsers: User[];
  }) {
    this.validate(chore);
    this.id = chore.id;
    this.title = chore.title;
    this.description = chore.description;
    this.points = chore.points;
    this.createdAt = chore.createdAt;
    this.assignedUsers = chore.assignedUsers || [];
  }

  validate(chore: { title: string; description: string; points: number }) {
    if (!chore.title?.trim()) {
      throw new Error('Title is required');
    }
    if (!chore.description?.trim()) {
      throw new Error('Description is required');
    }
    if (chore.points < 0) {
      throw new Error('Points must be a positive integer');
    }
  }

  equals({
    id,
    title,
    description,
    points,
    createdAt,
    assignedUsers
  }: Chore): boolean {
    return (
      this.id === id &&
      this.title === title &&
      this.description === description &&
      this.points === points &&
      this.createdAt === createdAt &&
      this.assignedUsers.every((assignedUser, index) => assignedUser.equals(assignedUsers[index]))
    );
  }

  getAssignedUsers(): User[] {
    return this.assignedUsers;
  }

  assignUser(user: User): void {
    if (!this.assignedUsers.some(assignedUser => assignedUser.id === user.id)) {
      this.assignedUsers.push(user);
    }
  }
}
