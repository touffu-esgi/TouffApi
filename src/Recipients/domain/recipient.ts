export class Recipient {
  private readonly _id: string;
  private _userId?: string;
  public name: string;
  public surname: string;
  public email: string;
  public phoneNumber: string;
  private readonly _password: string;
  private readonly _address: string;

  constructor(
    id: string,
    name: string,
    surname: string,
    email: string,
    phoneNumber: string,
    password: string,
    address: string,
  ) {
    this._id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this._password = password;
    this._address = address;
  }

  get id(): string {
    return this._id;
  }

  get password(): string {
    return this._password;
  }

  get address(): string {
    return this._address;
  }

  get userId(): string {
    return this._userId;
  }

  set userId(id) {
    this._userId = id;
  }
}
