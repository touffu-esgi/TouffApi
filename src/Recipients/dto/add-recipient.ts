import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Address } from '../../Address/domain/addressProps';
import { AddressProps } from '../../Address/domain/address.props';

export class AddRecipientDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  surname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  address: AddressProps;
}
