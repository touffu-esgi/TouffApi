import { IsEnum } from 'class-validator';
import { UserStatusEnum } from '../domain/user.status.enum';

export class UpdateUserDto {
  @IsEnum(UserStatusEnum)
  status: string;

  email: string;
}
