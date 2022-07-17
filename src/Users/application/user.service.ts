import { AddUserDto } from '../dto/add-user.dto';
import { User } from '../domain/user';
import { UserRepositoryInMemory } from '../persistence/user.repository.in-memory';
import { Injectable } from '@nestjs/common';
import { GetUserDto } from '../dto/get-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserUpdate } from '../domain/user.update';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepositoryInMemory) {}

  async save(addUserDto: AddUserDto): Promise<User> {
    const nextId = await this.userRepository.getNextId();

    const newUser = new User(
      nextId,
      addUserDto.email,
      addUserDto.password,
      addUserDto.userReference,
      addUserDto.userType,
      addUserDto.profilePic,
    );
    await this.userRepository.add(newUser);
    return newUser;
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.getAll();
  }

  async getOne(userId: string): Promise<User> {
    return await this.userRepository.getOne(userId);
  }

  async getUserByEmailAndPassword(user: GetUserDto): Promise<User> {
    return await this.userRepository.getUserByEmailAndPassword(user);
  }

  async update(userId: string, updateUser: UpdateUserDto) {
    const updatedUser = new UserUpdate(userId);
    if (updateUser.status) updatedUser.status = updateUser.status;
    if (updateUser.email) updatedUser.email = updateUser.email;
    this.userRepository.updateOneUser(updatedUser);
  }
}
