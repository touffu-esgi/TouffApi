import { AddressProps } from './address.props';

export class Address implements AddressProps {
  public id: string;
  public addr1: string;
  public addr2?: string;
  public zipcode: string;
  public city: string;
  public country: string;

  constructor(addressProps: AddressProps) {
    this.id = addressProps.id;
    this.addr1 = addressProps.addr1;
    this.addr2 = addressProps.addr2;
    this.zipcode = addressProps.zipcode;
    this.city = addressProps.city;
    this.country = addressProps.country;
  }

  public toString(): string {
    return `${this.addr1}, ${this.addr2 ? this.addr2 + ', ' : ''}, ${
      this.zipcode
    } ${this.country}, ${this.country}`;
  }
}
