import { AdminProps } from './admin.props';
export class Admin implements AdminProps {
  private readonly _email: string;
  private readonly _id: string;
  private readonly _password: string;

  constructor(email: string, id: string, password: string) {
    this._email = email;
    this._id = id;
    this._password = password;
  }

  get email(): string {
    return this._email;
  }

  get id(): string {
    return this._id;
  }

  get password(): string {
    return this._password;
  }
}
