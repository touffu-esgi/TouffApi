export class HasAlreadyReportedException extends Error {
  constructor(message) {
    super(message);
    this.name = 'HasAlreadyReportedException';
    this.message = message;
  }
}
