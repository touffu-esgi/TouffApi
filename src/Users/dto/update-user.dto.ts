import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserStatusEnum } from '../domain/user.status.enum';

export class UpdateUserDto {
  @IsEnum(UserStatusEnum)
  status: string;
}
