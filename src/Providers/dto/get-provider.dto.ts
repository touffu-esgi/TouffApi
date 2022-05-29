import { IsEmail, IsNotEmpty, IsPositive, MinLength } from 'class-validator';

export class GetProviderDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  surname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;

  //@IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  address: string;

  @IsPositive()
  base_tariff: number;

  @IsPositive()
  radius: number;
}
