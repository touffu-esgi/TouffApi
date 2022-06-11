import { RecommendationProps } from './recommendation.props';

export class RecommendationResponse {
  id: string;
  provider: string;
  recipient: string;
  review: string;
  score: number;
  dateReview: Date;

  constructor(recommendationProps: RecommendationProps) {
    this.id = recommendationProps.id;
    this.provider = recommendationProps.providerId;
    this.recipient = recommendationProps.recipientId;
    this.review = recommendationProps.review;
    this.score = recommendationProps.score;
    this.dateReview = recommendationProps.dateReview;
  }
}
