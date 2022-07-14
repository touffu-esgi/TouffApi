import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdateAddressDto {
  addr1: string;

  addr2?: string;

  @MinLength(4)
  zipcode: string;

  city: string;

  country: string;
}
