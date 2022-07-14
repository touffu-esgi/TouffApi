import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user';
import { UserNotFoundException } from '../../Recipients/application/exceptions/user-not-foud.exception';
import { GetUserDto } from '../dto/get-user.dto';
import { UserStatusEnum } from '../domain/user.status.enum';
import { UserUpdate } from '../domain/user.update';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepositoryInMemory implements UserRepository {
  usersMockRepositoryImplement: User[] = [
    new User('1', 'nathan@nathan.nathan', 'password', '1', 'recipient'),
    new User('1', 'lucille@moineau.fr', 'password', '2', 'recipient'),
    new User('3', 'nletourneau@mail.mail', 'password', '1', 'provider'),
    new User('2', 'sarah@sarah.sarah', 'password', '2', 'provider'),
    new User('3', 'Theo@Theo.Theo', 'password', '3', 'provider'),
    new User('5', 'nathan@nathan.fr', '123456789', '1', 'recipient'),
    new User('6', 'lucille@moineau.fr', '123456789', '2', 'recipient'),
  ];

  async add(user: User): Promise<User> {
    this.usersMockRepositoryImplement.push(user);
    return user;
  }

  async getAll(): Promise<User[]> {
    return this.usersMockRepositoryImplement;
  }

  async getOne(userId: string): Promise<User> {
    const user = this.usersMockRepositoryImplement.filter(
      (u) => u.id === userId,
    );
    if (user.length > 0) return user[0];
    throw new UserNotFoundException(`User ${userId} not found`);
  }

  async getOneByUserTypeAndReference(userReference: string, userType: string) {
    const user = this.usersMockRepositoryImplement.filter(
      (user) =>
        user.userReference == userReference && user.userType === userType,
    );
    if (user.length > 0) return user[0];
    throw new UserNotFoundException(`${userType} ${userReference} not found`);
  }

  async getNextId(): Promise<string> {
    const lastId = +this.usersMockRepositoryImplement.at(-1).id;
    return (lastId + 1).toString();
  }

  async getUserByEmailAndPassword(user: GetUserDto): Promise<User> {
    const userFound = this.usersMockRepositoryImplement.filter(
      (u) => u.email === user.email && u.password === user.password,
    );
    if (userFound.length > 0) return userFound[0];
    throw new UserNotFoundException(
      `User with email : ${user.email} not found`,
    );
  }

  updateOneUser(userUpdate: UserUpdate) {
    const index = this.usersMockRepositoryImplement.findIndex(
      (user) => user.id == userUpdate.id,
    );
    if (
      this.usersMockRepositoryImplement[index] &&
      this.verifyStatus(userUpdate.status)
    ) {
      this.usersMockRepositoryImplement[index].status = userUpdate.status;
      if (userUpdate.status == UserStatusEnum.blocked) {
        this.usersMockRepositoryImplement[index].blockDate = new Date();
      }
    }

    if (userUpdate.email)
      this.usersMockRepositoryImplement[index].email = userUpdate.email;

    console.log(this.usersMockRepositoryImplement[index]);
  }

  private verifyStatus(status: string): boolean {
    return status == UserStatusEnum.active || status == UserStatusEnum.blocked;
  }
}
