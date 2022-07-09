export class CantReportOneselfException extends Error {
  constructor(message) {
    super(message);
    this.name = 'CantReportOneselfException';
    this.message = message;
  }
}
