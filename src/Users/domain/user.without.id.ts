export class UserWithoutId {
  private readonly _email: string;
  private readonly _password: string;
  private readonly _recipientReference?: string;
  private readonly _providerReference?: string;
  private readonly _userType: string;

  constructor(
    email: string,
    password: string,
    userType: string,
    recipientReference?: string,
    providerReference?: string,
  ) {
    this._email = email;
    this._password = password;
    this._userType = userType;
    this._recipientReference =
      recipientReference.length > 0 ? recipientReference : '';
    this._providerReference =
      providerReference.length > 0 ? providerReference : '';
  }

  get userTypes(): string {
    return this._userType;
  }

  get recipientReference(): string | undefined {
    return this._recipientReference;
  }

  get providerReference(): string | undefined {
    return this._providerReference;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }
}
