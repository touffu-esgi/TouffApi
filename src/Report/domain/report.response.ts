export class ReportResponse {
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
    reportDate: Date,
    comment?: string,
  ) {
    this._id = id;
    this._reportedUserId = reportedUserId;
    this._reportedByUserId = reportedByUserId;
    this._comment = comment ? comment : '';
    this._dateReported = reportDate;
    this._active = true;
  }
}
