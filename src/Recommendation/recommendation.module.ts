import { Module } from '@nestjs/common';
import { RecommendationService } from './application/recommendation.service';
import { RecommendationRepositoryInMemory } from './persistence/recommendation.repository.in-memory';
import { RecommendationController } from './exposition/controller/recommendation.controller';
@Module({
  controllers: [RecommendationController],
  providers: [RecommendationService, RecommendationRepositoryInMemory],
})
export class RecommendationModule {}
