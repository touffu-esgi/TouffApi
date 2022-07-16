export class UserUpdate {
  status?: string;
  email?: string;
  private readonly _id: string;

  constructor(id: string, status?: string, email?: string) {
    this.status = status;
    this.email = email;
    this._id = id;
  }

  get id(): string {
    return this._id;
  }
}
