export class AvailabilityNotFoundException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DayAlreadyExistException';
    this.message = message;
  }
}
