export class AgreementNotFoundException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'AgreementNotFoundException';
    this.message = message;
  }
}
