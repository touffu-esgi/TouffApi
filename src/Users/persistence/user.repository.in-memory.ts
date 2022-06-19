import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user';
import { UserNotFoundException } from '../../Recipients/application/exceptions/user-not-foud.exception';

export class UserRepositoryInMemory implements UserRepository {
  usersMockRepositoryImplement: User[] = [
    new User('1', 'sarah@sarah.sarah', 'password', '1', 'provider'),
    new User('2', 'nathan@nathan.nathan', 'password', '2', 'recipient'),
    new User('3', 'Theo@Theo.Theo', 'password', '3', 'recipient'),
  ];

  async add(user: User): Promise<User> {
    this.usersMockRepositoryImplement.push(user);
    return user;
  }

  async getAll(): Promise<User[]> {
    return this.usersMockRepositoryImplement;
  }

  async getOne(userId: string): Promise<User> {
    const user = this.usersMockRepositoryImplement.filter(
      (u) => u.id === userId,
    );
    if (user.length > 0) return user[0];
    throw new UserNotFoundException(`User ${userId} not found`);
  }

  async getNextId(): Promise<string> {
    const lastId = +this.usersMockRepositoryImplement.at(-1).id;
    return (lastId + 1).toString();
  }
}
