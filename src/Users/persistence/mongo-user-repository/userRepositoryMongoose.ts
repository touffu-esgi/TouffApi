import { UserRepository } from '../../domain/user.repository';
import { User } from '../../domain/user';
import { UserDocument, UserProps } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class UserRepositoryMongoose implements UserRepository {
  constructor(@InjectModel('Users') private userModel: Model<UserDocument>) {}

  async add(user: UserProps): Promise<User> {
    const newUser: UserDocument = await this.userModel.create(user);
    const userAdatp = new User(
      newUser._id,
      newUser.email,
      '',
      newUser.recipientReference
        ? newUser.recipientReference
        : newUser.providerReference,
      newUser.userType,
    );
    return userAdatp;
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

  async getOne(userId: string): Promise<User> {
    const users: UserDocument = await this.userModel.findById(userId).exec();
    return new User(
      users._id,
      users.email,
      '',
      users.recipientReference
        ? users.recipientReference
        : users.providerReference,
      users.userType,
    );
  }
}
