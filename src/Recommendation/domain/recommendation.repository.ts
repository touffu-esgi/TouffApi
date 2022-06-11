import { Recommendation } from './recommendation';

export interface RecommendationRepository {
  getAllByProvider(providerId: string): Promise<Recommendation[]>;
  getAverageForProvider(providerId: string): Promise<number>;
}
