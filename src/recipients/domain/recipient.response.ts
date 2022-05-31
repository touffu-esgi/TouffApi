export class RecipientResponse {
  id: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  address: string;

  constructor(
    id: string,
    name: string,
    surname: string,
    email: string,
    phoneNumber: string,
    address: string,
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.address = address;
  }
}
