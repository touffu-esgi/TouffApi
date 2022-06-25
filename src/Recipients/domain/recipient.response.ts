export class RecipientResponse {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  address: string;
  id: string;
  userId: string;

  constructor(
    id: string,
    name: string,
    surname: string,
    email: string,
    phoneNumber: string,
    address: string,
    userId: string,
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.userId = userId;
  }
}
