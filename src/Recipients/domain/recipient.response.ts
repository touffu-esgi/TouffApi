import { Address } from '../../Address/domain/addressProps';
import { AddressProps } from '../../Address/domain/address.props';

export class RecipientResponse {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  address: string | AddressProps;
  id: string;

  constructor(
    id: string,
    name: string,
    surname: string,
    email: string,
    phoneNumber: string,
    address: string | AddressProps,
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.address = address;
  }
}
