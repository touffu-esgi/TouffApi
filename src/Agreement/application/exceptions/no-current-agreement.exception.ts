export class NoCurrentAgreementException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'NoCurrentAgreementException';
    this.message = message;
  }
}
