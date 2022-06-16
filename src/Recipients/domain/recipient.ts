import { Address } from '../../Address/domain/addressProps';
import { AddressProps } from '../../Address/domain/address.props';

export class Recipient {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _surname: string;
  private readonly _email: string;
  private readonly _phoneNumber: string;
  private readonly _password: string;
  private readonly _address: string | AddressProps;

  constructor(
    id: string,
    name: string,
    surname: string,
    email: string,
    phoneNumber: string,
    password: string,
    address: string | AddressProps,
  ) {
    this._id = id;
    this._name = name;
    this._surname = surname;
    this._email = email;
    this._phoneNumber = phoneNumber;
    this._password = password;
    this._address = address;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get surname(): string {
    return this._surname;
  }

  get email(): string {
    return this._email;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  get password(): string {
    return this._password;
  }

  get address(): string | AddressProps {
    return this._address;
  }
}
