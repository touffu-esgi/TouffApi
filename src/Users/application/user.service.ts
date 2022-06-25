import { AddUserDto } from '../dto/add-user.dto';
import { User } from '../domain/user';
import { UserRepositoryInMemory } from '../persistence/user.repository.in-memory';
import { Injectable } from '@nestjs/common';
import { GetUserDto } from '../dto/get-user.dto';

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
}
