export class EmptyPositionsException extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'EmptyPositionsException';
  }
}
