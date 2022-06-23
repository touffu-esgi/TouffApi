import { UserRepository } from '../../domain/user.repository';
import { User } from '../../domain/user';
import { UserDocument, UserModel, UserProps } from './user.model';

export class UserRepositoryMongoose implements UserRepository {
  async add(user: UserProps): Promise<any> {
    try {
      return await UserModel.create(user);
    } catch (e) {
      console.log(e);
    }
  }

  async getAll(): Promise<any> {
    const users: any = await UserModel.find().exec();
    console.log(users);
  }

  getOne(userId: string): Promise<User> {
    return Promise.resolve(undefined);
  }

  async getNextId(): Promise<string> {
    return Promise.resolve(undefined);
  }
}
