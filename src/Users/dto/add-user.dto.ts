import { IsNotEmpty } from 'class-validator';

export class AddUserDto {
  @IsNotEmpty()
  userReference: string; //id du provider ou du recipient

  @IsNotEmpty()
  userType: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  profilePic: string;
}
