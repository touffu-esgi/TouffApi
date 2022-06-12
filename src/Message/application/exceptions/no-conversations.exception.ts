export class NoConversationsException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'NoConversationsException';
    this.message = message;
  }
}
