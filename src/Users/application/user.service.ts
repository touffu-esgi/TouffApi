import { AddUserDto } from '../dto/add-user.dto';
import { User } from '../domain/user';
import { Injectable } from '@nestjs/common';
import { UserRepositoryMongoose } from '../persistence/mongo-user-repository/userRepositoryMongoose';
import { UserProps } from '../persistence/mongo-user-repository/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from '../persistence/mongo-user-repository/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    private userRepositoryMongoose: UserRepositoryMongoose,
    @InjectModel('Users') private userModel: Model<UserDocument>,
  ) {}

  async save(addUserDto: AddUserDto): Promise<UserProps> {
    const nextId = await this.userRepositoryMongoose.getNextId();

    const newUser: UserProps = {
      email: addUserDto.email,
      password: addUserDto.password,
      recipientReference: addUserDto.recipientReference,
      providerReference: addUserDto.providerReference,
      userType: addUserDto.userType,
    };
    await this.userRepositoryMongoose.add(newUser);
    return newUser;
  }

  async getAll(): Promise<any> {
    const users = await this.userModel.find().exec();
    console.log(users);
    return Promise.resolve([]);
    //return await this.userRepositoryMongoose.getAll();
  }

  async getOne(userId: string): Promise<User> {
    return await this.userRepositoryMongoose.getOne(userId);
  }
}
