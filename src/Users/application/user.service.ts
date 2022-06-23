import { AddUserDto } from '../dto/add-user.dto';
import { User } from '../domain/user';
import { Injectable } from '@nestjs/common';
import { UserRepositoryMongoose } from '../persistence/mongo-user-repository/userRepositoryMongoose';
import { UserProps } from '../persistence/mongo-user-repository/user.schema';

@Injectable()
export class UserService {
  constructor(private userRepositoryMongoose: UserRepositoryMongoose) {}

  async save(addUserDto: AddUserDto): Promise<User> {
    const newUser: UserProps = {
      email: addUserDto.email,
      password: addUserDto.password,
      recipientReference: addUserDto.recipientReference,
      providerReference: addUserDto.providerReference,
      userType: addUserDto.userType,
    };
    return await this.userRepositoryMongoose.add(newUser);
  }

  async getAll(): Promise<User[]> {
    return await this.userRepositoryMongoose.getAll();
  }

  async getOne(userId: string): Promise<User> {
    return await this.userRepositoryMongoose.getOne(userId);
  }
}
