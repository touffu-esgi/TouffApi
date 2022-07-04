export class BillNotFoundException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'BillNotFoundException';
    this.message = message;
  }
}
