export class User {
  private readonly _id: string;
  private readonly _email: string;
  private readonly _password: string;
  private readonly _userReference: string;
  private readonly _userType: string;
  private readonly _profilePic: string;

  constructor(
    id: string,
    email: string,
    password: string,
    userReference: string,
    userType: string,
    profilePic = 'default.png',
  ) {
    this._email = email;
    this._password = password;
    this._userReference = userReference;
    this._id = id;
    this._userType = userType;
    this._profilePic = profilePic;
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

  get profilePic(): string {
    return this._profilePic;
  }
}
