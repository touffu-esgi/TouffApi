import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user';

export class UserRepositoryInMemory implements UserRepository {
  usersMockRepositoryImplement: User[] = [
    new User('1', 'sarah@sarah.sarah', 'password', '1', 'provider'),
    new User('2', 'nathan@nathan.nathan', 'password', '2', 'recipient'),
    new User('3', 'Theo@Theo.Theo', 'password', '3', 'recipient'),
  ];

  async add(user: User): Promise<User> {
    this.usersMockRepositoryImplement.push(user);
    console.log(this.usersMockRepositoryImplement);
    return user;
  }

  getAll(): Promise<User[]> {
    return Promise.resolve([]);
  }

  getOne(userId: string): Promise<User> {
    return Promise.resolve(undefined);
  }

  async getNextId(): Promise<string> {
    const lastId = +this.usersMockRepositoryImplement.at(-1).id;
    console.log(this.usersMockRepositoryImplement.at(-1));
    return (lastId + 1).toString();
  }
}
