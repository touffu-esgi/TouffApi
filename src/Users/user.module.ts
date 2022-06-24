import { Module } from '@nestjs/common';
import { UserController } from './exposition/controller/user.controller';
import { UserService } from './application/user.service';
import { UserRepositoryMongoose } from './persistence/mongo-user-repository/userRepositoryMongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './persistence/mongo-user-repository/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, UserRepositoryMongoose],
})
export class UserModule {}
