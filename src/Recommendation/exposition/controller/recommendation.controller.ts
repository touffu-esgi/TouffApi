import { Controller, Get, Param, Req, UseFilters } from '@nestjs/common';
import { Request } from 'express';
import { RecommendationService } from '../../application/recommendation.service';
import { HttpUtils } from '../../../shared/http/http.utils';
import { RecommendationAdapter } from '../../adapters/recommendation.adapter';
import { RecommendationExceptionFilter } from '../filters/recommendation.exception.filter';

@Controller('recommendation')
@UseFilters(new RecommendationExceptionFilter())
export class RecommendationController {
  constructor(private recommendationService: RecommendationService) {}

  @Get(':providerId')
  async getAllRecommendationsForProvider(
    @Req() req: Request,
    @Param('providerId') providerId: string,
  ) {
    const recommendations = await this.recommendationService.getAllByProvider(
      providerId,
    );
    return recommendations.map((recommendation) =>
      RecommendationAdapter.toRecommendationResponse(
        recommendation,
        HttpUtils.getBaseUrlOf(req),
      ),
    );
  }
}
