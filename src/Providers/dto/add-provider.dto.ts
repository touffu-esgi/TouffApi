import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsPositive,
  IsPostalCode,
  Min,
  MinLength,
} from 'class-validator';

export class AddProviderDto {
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
  addr1: string;

  addr2: string;

  @IsNotEmpty()
  //@IsPostalCode()
  cp: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  country: string;

  services: string[];

  @IsPositive()
  radius: number;
}
