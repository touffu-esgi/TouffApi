import { User } from './user';
import { UserProps } from '../persistence/mongo-user-repository/user.schema';

export interface UserRepository {
  getAll(): Promise<User[]>;
  getOne(userId: string): Promise<User>;
  add(user: UserProps): Promise<User>;
}
