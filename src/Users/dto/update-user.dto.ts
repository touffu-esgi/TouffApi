import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserStatusEnum } from '../domain/user.status.enum';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsEnum(UserStatusEnum)
  status: string;
}
