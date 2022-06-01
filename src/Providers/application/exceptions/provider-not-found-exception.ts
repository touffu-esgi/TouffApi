export class ProviderNotFoundException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'ProviderNotFoundException';
    this.message = message;
  }
}
