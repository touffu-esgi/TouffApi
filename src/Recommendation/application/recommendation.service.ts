import { Injectable } from '@nestjs/common';
import { Recommendation } from '../domain/recommendation';
import { RecommendationRepositoryInMemory } from '../persistence/recommendation.repository.in-memory';

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
}
