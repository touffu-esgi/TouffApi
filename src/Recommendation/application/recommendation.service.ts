import { Injectable } from '@nestjs/common';
import { Recommendation } from '../domain/recommendation';
import { RecommendationRepositoryInMemory } from '../persistence/recommendation.repository.in-memory';
import { AddRecommendationDto } from '../dto/add-recommendation.dto';

@Injectable()
export class RecommendationService {
  constructor(
    private recommendationRepository: RecommendationRepositoryInMemory,
  ) {}

  async getAllByProvider(providerId: string): Promise<Recommendation[]> {
    return await this.recommendationRepository.getAllByProvider(providerId);
  }

  async getAverageForProvider(providerId: string): Promise<number> {
    return await this.recommendationRepository.getAverageForProvider(
      providerId,
    );
  }

  async addRecommendation(dto: AddRecommendationDto): Promise<Recommendation> {
    const nextId = await this.recommendationRepository.getNextId();
    const recommendation = new Recommendation({
      id: nextId,
      providerId: dto.providerId,
      recipientId: dto.recipientId,
      review: dto.review,
      score: dto.score,
      dateReview: new Date(),
    });
    return await this.recommendationRepository.add(recommendation);
  }
}
