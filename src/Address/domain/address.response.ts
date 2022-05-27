export class AddressResponse {
  id: string;
  addr1: string;
  addr2?: string;
  cp: string;
  city: string;
  country: string;

  constructor(id, addr1, addr2, cp, city, country) {
    this.id = id;
    this.addr1 = addr1;
    this.addr2 = addr2 ? addr2 : null;
    this.cp = cp;
    this.city = city;
    this.country = country;
  }
}
