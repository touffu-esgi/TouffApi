import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseFilters,
} from '@nestjs/common';
import { Request } from 'express';
import { RecommendationService } from '../../application/recommendation.service';
import { HttpUtils } from '../../../shared/http/http.utils';
import { RecommendationAdapter } from '../../adapters/recommendation.adapter';
import { RecommendationExceptionFilter } from '../filters/recommendation.exception.filter';
import { AddRecommendationDto } from '../../dto/add-recommendation.dto';

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

  @Get('average/:providerId')
  async getProviderAverageGrade(
    @Param('providerId') providerId: string,
  ): Promise<{
    average: number;
  }> {
    const average = await this.recommendationService.getAverageForProvider(
      providerId,
    );
    return { average: average };
  }

  @Post()
  async addRecommendation(
    @Req() req: Request,
    @Body() dto: AddRecommendationDto,
  ): Promise<{ url: string }> {
    const recommendation = await this.recommendationService.addRecommendation(
      dto,
    );
    return {
      url: HttpUtils.getFullUrlOf(req) + '/' + recommendation.id,
    };
  }
}
