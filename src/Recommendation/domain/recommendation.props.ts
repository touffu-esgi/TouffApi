export interface RecommendationProps {
  readonly id: string;
  readonly providerId: string;
  readonly recipientId: string;
  readonly review: string;
  readonly grade: number;
  readonly dateReview: Date;
}
