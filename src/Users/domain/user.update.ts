export class UserUpdate {
  private readonly _status?: string;
  private readonly _id: string;

  constructor(status: string, id: string) {
    this._status = status;
    this._id = id;
  }

  get status(): string {
    return this._status;
  }
  get id(): string {
    return this._id;
  }
}
