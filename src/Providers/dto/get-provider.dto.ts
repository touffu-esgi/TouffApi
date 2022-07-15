import { IsEmail, IsNotEmpty, IsPositive, MinLength } from 'class-validator';

export class GetProviderDto {
  @IsNotEmpty()
  id: string;

  userId: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  surname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;

  phone: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  animalType: string[];

  @IsPositive()
  base_tariff: number;

  @IsPositive()
  radius: number;

  profile_title: string;

  profile_desc: string;

  profile_pic: string;
}
