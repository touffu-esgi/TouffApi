import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user';
import { UserNotFoundException } from '../../Recipients/application/exceptions/user-not-foud.exception';

export class UserRepositoryInMemory implements UserRepository {
  usersMockRepositoryImplement: User[] = [
    new User('1', 'nathan@nathan.nathan', 'password', '1', 'recipient'),
    new User('2', 'sarah@sarah.sarah', 'password', '2', 'provider'),
    new User('3', 'Theo@Theo.Theo', 'password', '3', 'provider'),
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

  async getOneByUserTypeAndReference(userReference: string, userType: string) {
    const user = this.usersMockRepositoryImplement.filter(
      (user) =>
        user.userReference == userReference && user.userType === userType,
    );
    if (user.length > 0) return user[0];
    throw new UserNotFoundException(`${userType} ${userReference} not found`);
  }

  async getNextId(): Promise<string> {
    const lastId = +this.usersMockRepositoryImplement.at(-1).id;
    return (lastId + 1).toString();
  }
}
