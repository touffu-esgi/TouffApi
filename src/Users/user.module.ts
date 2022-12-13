import { Module } from '@nestjs/common';
import { UserController } from './exposition/controller/user.controller';
import { UserService } from './application/user.service';
import { UserRepositoryInMemory } from './persistence/user.repository.in-memory';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepositoryInMemory],
  exports: [UserRepositoryInMemory],
})
export class UserModule {}
