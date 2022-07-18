export class AdminNotFoundException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'AdminNotFoundException';
    this.message = message;
  }
}
