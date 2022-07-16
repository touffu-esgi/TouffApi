import { IsEmail, IsNotEmpty, IsPositive, MinLength } from 'class-validator';

export class UpdateProviderDto {
  name: string;

  surname: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;

  phone: string;

  address: string;

  animalType: string[];

  base_tariff: number;

  radius: number;

  profile_title: string;

  profile_desc: string;
}
