export class User {
  private readonly _id: string;
  email: string;
  private readonly _password: string;
  private readonly _userReference: string;
  private readonly _userType: string;
  private readonly _profilePic: string;
  public status: string;
  public blockDate: Date | null;

  constructor(
    id: string,
    email: string,
    password: string,
    userReference: string,
    userType: string,
    profilePic: string = 'default.png',
    profilePic = 'default.png',
    status = 'active',
    blockDate = null,
  ) {
    this.email = email;
    this._password = password;
    this._userReference = userReference;
    this._id = id;
    this._userType = userType;
    this._profilePic = profilePic;
    this.status = status;
    this.blockDate = blockDate;
  }

  get id(): string {
    return this._id;
  }

  get userType(): string {
    return this._userType;
  }

  get userReference(): string {
    return this._userReference;
  }

  get password(): string {
    return this._password;
  }

  get profilePic(): string {
    return this._profilePic;
  }
}
