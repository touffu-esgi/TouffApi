export class RecipientResponse {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  address: string;

  constructor(
    name: string,
    surname: string,
    email: string,
    phoneNumber: string,
    address: string,
  ) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.address = address;
  }
}
