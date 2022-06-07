import { User } from './user';

export interface UserRepository {
  getAll(): Promise<User[]>;
  getOne(addressId: string): Promise<User>;
  add(address: User): Promise<User>;
}
