import { IsNotEmpty, IsPositive, Max } from 'class-validator';

export class GetRecommendationDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  providerId: string;

  @IsNotEmpty()
  recipientId: string;

  @IsNotEmpty()
  review: string;

  @IsNotEmpty()
  @IsPositive()
  @Max(5.0)
  grade: number;

  @IsNotEmpty()
  dateReview: Date;
}
