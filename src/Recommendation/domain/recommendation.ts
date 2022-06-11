import { RecommendationProps } from './recommendation.props';

export class Recommendation implements RecommendationProps {
  private readonly _id: string;
  private readonly _providerId: string;
  private readonly _recipientId: string;
  private readonly _review: string;
  private readonly _grade: number;
  private readonly _dateReview: Date;

  constructor(recommendationProps: RecommendationProps) {
    this._id = recommendationProps.id;
    this._providerId = recommendationProps.providerId;
    this._recipientId = recommendationProps.recipientId;
    this._review = recommendationProps.review;
    this._grade = recommendationProps.grade;
    this._dateReview = recommendationProps.dateReview;
  }

  get id(): string {
    return this._id;
  }

  get providerId(): string {
    return this._providerId;
  }
  get recipientId(): string {
    return this._recipientId;
  }

  get review(): string {
    return this._review;
  }

  get grade(): number {
    return this._grade;
  }

  get dateReview(): Date {
    return this._dateReview;
  }
}
