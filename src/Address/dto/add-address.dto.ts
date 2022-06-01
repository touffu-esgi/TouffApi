import { IsNotEmpty, MinLength } from 'class-validator';

export class AddAddressDto {
  @IsNotEmpty()
  addr1: string;

  addr2?: string;

  @IsNotEmpty()
  @MinLength(4)
  zipcode: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  country: string;
}
