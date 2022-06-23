import { UserRepository } from '../../domain/user.repository';
import { User } from '../../domain/user';
import { UserDocument, UserProps } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class UserRepositoryMongoose implements UserRepository {
  constructor(@InjectModel('Users') private userModel: Model<UserDocument>) {}

  async add(user: UserProps): Promise<any> {
    return Promise.resolve(undefined);
  }

  async getAll(): Promise<User[]> {
    const users: UserDocument[] = await this.userModel.find().exec();
    return users.map(
      (user) =>
        new User(
          user._id,
          user.email,
          '',
          user.recipientReference
            ? user.recipientReference
            : user.providerReference,
          user.userType,
        ),
    );
  }

  getOne(userId: string): Promise<User> {
    return Promise.resolve(undefined);
  }

  async getNextId(): Promise<string> {
    return Promise.resolve(undefined);
  }
}
