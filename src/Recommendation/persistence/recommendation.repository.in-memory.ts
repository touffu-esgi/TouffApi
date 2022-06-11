import { RecommendationRepository } from '../domain/recommendation.repository';
import { Recommendation } from '../domain/recommendation';
import { NoRecommendationsException } from '../application/exceptions/no-recommendations.exception';

export class RecommendationRepositoryInMemory
  implements RecommendationRepository
{
  private readonly recommendations: Recommendation[] = [
    new Recommendation({
      id: '1',
      providerId: '2',
      recipientId: '1',
      review: 'Très bonne expérience',
      score: 3.3,
      dateReview: new Date(2022, 3, 14, 20, 32, 37),
    }),
    new Recommendation({
      id: '1',
      providerId: '1',
      recipientId: '1',
      review: 'ca-tas-tro-phi-que',
      score: 3.3,
      dateReview: new Date(2021, 12, 10, 20, 32, 37),
    }),
  ];

  async getAllByProvider(providerId: string): Promise<Recommendation[]> {
    const recommendations = this.recommendations.filter(
      (recommendation) => recommendation.providerId === providerId,
    );
    if (recommendations.length > 0) return recommendations;
    throw new NoRecommendationsException();
  }

  async getAverageForProvider(providerId: string): Promise<number> {
    const recommendations = this.recommendations.filter(
      (recommendation) => recommendation.providerId === providerId,
    );
    if (recommendations.length === 0) return 0.0;
    const scores = recommendations.map(
      (recommendation) => recommendation.score,
    );
    return scores.reduce((sum, score) => sum + score) / scores.length;
  }
}
