import { IsNotEmpty } from 'class-validator';

export class GetAdminDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
