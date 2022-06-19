export class ProviderBusyException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'ProviderBusyException';
    this.message = message;
  }
}
