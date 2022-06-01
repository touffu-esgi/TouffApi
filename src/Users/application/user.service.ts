import { AddUserDto } from '../dto/add-user.dto';
import { User } from '../domain/user';
import { UserRepositoryInMemory } from '../persistence/user.repository.in-memory';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private userRepositoryInMemory: UserRepositoryInMemory) {}

  async save(addUserDto: AddUserDto): Promise<User> {
    const nextId = await this.userRepositoryInMemory.getNextId();

    const newUser = new User(
      nextId,
      addUserDto.email,
      addUserDto.password,
      addUserDto.userReference,
      addUserDto.userType,
    );
    await this.userRepositoryInMemory.add(newUser);
    return newUser;
  }
}
