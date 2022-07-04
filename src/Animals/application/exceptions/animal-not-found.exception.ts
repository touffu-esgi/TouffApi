export class AnimalNotFoundException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'AnimalNotFoundException';
    this.message = message;
  }
}
