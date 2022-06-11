import { Recommendation } from './recommendation';

export interface RecommendationRepository {
  getAllByProvider(providerId: string): Promise<Recommendation[]>;
}
