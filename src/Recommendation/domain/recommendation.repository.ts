import { Recommendation } from './recommendation';

export interface RecommendationRepository {
  getAllByProvider(providerId: string): Promise<Recommendation[]>;
  getAverageForProvider(providerId: string): Promise<number>;
  add(recommendation: Recommendation): Promise<Recommendation>;
  getNextId(): Promise<string>;
}
