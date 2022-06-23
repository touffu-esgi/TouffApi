import { IsNotEmpty } from 'class-validator';

export class AddUserDto {
  recipientReference?: string; //id du provider ou du recipient

  providerReference?: string; //id du provider ou du recipient

  @IsNotEmpty()
  userType: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
