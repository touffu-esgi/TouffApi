import { RecommendationResponse } from '../domain/recommendation.response';
import { GetRecommendationDto } from '../dto/get-recommendation.dto';
import { ControllerEndpointsUtils } from '../../shared/utils/controller.endpoints.utils';

export class RecommendationAdapter {
  public static toRecommendationResponse(
    recommendation: GetRecommendationDto,
    baseUrl: string,
  ): RecommendationResponse {
    const props = {
      id: recommendation.id,
      providerId: `${baseUrl}/${ControllerEndpointsUtils.getEndpoint(
        'providers',
      )}/${recommendation.providerId}`,
      recipientId: `${baseUrl}/${ControllerEndpointsUtils.getEndpoint(
        'recipients',
      )}/${recommendation.recipientId}`,
      review: recommendation.review,
      score: recommendation.score,
      dateReview: recommendation.dateReview,
    };
    return new RecommendationResponse(props);
  }
}
