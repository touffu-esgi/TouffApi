import { IsNotEmpty, IsPositive, Max } from 'class-validator';

export class AddRecommendationDto {
  @IsNotEmpty()
  providerId: string;

  @IsNotEmpty()
  recipientId: string;

  @IsNotEmpty()
  review: string;

  @IsNotEmpty()
  @IsPositive()
  @Max(5.0)
  score: number;

  @IsNotEmpty()
  dateReview: Date;
}
