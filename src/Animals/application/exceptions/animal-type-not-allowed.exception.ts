export class AnimalTypeNotAllowedException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'AnimalTypeNotAllowedException';
    this.message = message;
  }
}
