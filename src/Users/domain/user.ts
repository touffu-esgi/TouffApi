export class User {
  private readonly _id: string;
  private readonly _email: string;
  private readonly _password: string;
  private readonly _userReference: string;
  private readonly _userType: string;

  constructor(
    id: string,
    email: string,
    password: string,
    userReference: string,
    userType: string,
  ) {
    this._email = email;
    this._password = password;
    this._userReference = userReference;
    this._id = id;
    this._userType = userType;
  }

  get id(): string {
    return this._id;
  }

  get userTypes(): string {
    return this._userType;
  }

  get userReference(): string {
    return this._userReference;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }
}
