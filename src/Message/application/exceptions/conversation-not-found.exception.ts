export class ConversationNotFoundException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'ConversationNotFoundException';
    this.message = message;
  }
}
