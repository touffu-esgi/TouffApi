import { User } from './user';
import { UserProps } from '../persistence/mongo-user-repository/user.model';

export interface UserRepository {
  getAll(): Promise<any>;
  getOne(userId: string): Promise<any>;
  add(user: UserProps): Promise<any>;
}
