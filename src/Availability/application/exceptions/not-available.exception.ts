export class NotAvailableException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotAvailableException';
    this.message = message;
  }
}
