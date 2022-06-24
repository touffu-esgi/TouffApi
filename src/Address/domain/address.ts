import { AddressPropsInterface } from './addressPropsInterface';
import { AddressProps } from '../persistance/mongoose-address-repository/address.schema';

export class Address implements AddressProps {
  _id: string;
  _addr1: string;
  _addr2: string;
  _city: string;
  _country: string;
  _zipcode: string;

  constructor(addressProps: AddressPropsInterface) {
    this._addr1 = addressProps.addr1;
    this._addr2 = addressProps.addr2;
    this._zipcode = addressProps.zipcode;
    this._city = addressProps.city;
    this._country = addressProps.country;
    this._id = addressProps.id;
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
