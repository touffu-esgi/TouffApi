import { RecommendationResponse } from '../domain/recommendation.response';
import { GetRecommendationDto } from '../dto/get-recommendation.dto';

export class RecommendationAdapter {
  public static toRecommendationResponse(
    recommendation: GetRecommendationDto,
    baseUrl: string,
  ): RecommendationResponse {
    const props = {
      id: recommendation.id,
      providerId: `${baseUrl}/provider/${recommendation.providerId}`,
      recipientId: `${baseUrl}/recipient/${recommendation.recipientId}`,
      review: recommendation.review,
      grade: recommendation.grade,
      dateReview: recommendation.dateReview,
    };
    return new RecommendationResponse(props);
  }
}
