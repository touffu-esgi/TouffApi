import { IsNotEmpty } from 'class-validator';

export class AddAdminDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
