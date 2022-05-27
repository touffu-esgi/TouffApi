import { IsNotEmpty, MinLength } from 'class-validator';

export class GetAddressDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  addr1: string;

  addr2?: string;

  @IsNotEmpty()
  @MinLength(4)
  cp: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  country: string;
}
