export class AddressResponse {
  id: string;
  addr1: string;
  addr2?: string;
  zipcode: string;
  city: string;
  country: string;

  constructor(id, addr1, addr2, zipcode, city, country) {
    this.id = id;
    this.addr1 = addr1;
    this.addr2 = addr2 ? addr2 : null;
    this.zipcode = zipcode;
    this.city = city;
    this.country = country;
  }
}
