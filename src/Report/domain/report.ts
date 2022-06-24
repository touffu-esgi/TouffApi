export class Report {
  private readonly _id: string;
  private readonly _reportedUserId: string;
  private readonly _reportedByUserId: string;
  private readonly _comment: string;
  private readonly _dateReported: Date;
  private readonly _active: boolean;

  constructor(
    id: string,
    reportedUserId: string,
    reportedByUserId: string,
    comment?: string,
  ) {
    this._id = id;
    this._reportedUserId = reportedUserId;
    this._reportedByUserId = reportedByUserId;
    this._comment = comment ? comment : '';
    this._dateReported = new Date();
    this._active = true;
  }

  get id(): string {
    return this._id;
  }

  get reportedUserId(): string {
    return this._reportedUserId;
  }

  get reportedByUserId(): string {
    return this._reportedByUserId;
  }

  get comment(): string {
    return this._comment;
  }

  get dateReported(): Date {
    return this._dateReported;
  }

  get active(): boolean {
    return this._active;
  }
}
