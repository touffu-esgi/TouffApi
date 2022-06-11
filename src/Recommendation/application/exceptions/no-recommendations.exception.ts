export class NoRecommendationsException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'NoRecommendationsException';
    this.message = message;
  }
}
