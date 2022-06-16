import { AddressProps } from './address.props';

export class Address implements AddressProps {
  private readonly _id: string;
  private readonly _addr1: string;
  private readonly _addr2?: string;
  private readonly _zipcode: string;
  private readonly _city: string;
  private readonly _country: string;

  constructor(addressProps: AddressProps) {
    this._id = addressProps.id;
    this._addr1 = addressProps.addr1;
    this._addr2 = addressProps.addr2;
    this._zipcode = addressProps.zipcode;
    this._city = addressProps.city;
    this._country = addressProps.country;
  }

  get id(): string {
    return this._id;
  }

  get addr1(): string {
    return this._addr1;
  }

  get addr2(): string {
    return this._addr2;
  }

  get zipcode(): string {
    return this._zipcode;
  }

  get city(): string {
    return this._city;
  }

  get country(): string {
    return this._country;
  }

  public toString(): string {
    return `${this.addr1}, ${this._addr2 ? this._addr2 + ', ' : ''}, ${
      this._zipcode
    } ${this._country}, ${this._country}`;
  }
}
