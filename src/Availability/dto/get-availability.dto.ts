import { IsEnum, IsNotEmpty } from 'class-validator';
import { WeekDays } from '../domain/weekdays';

export class GetAvailabilityDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsEnum(WeekDays)
  day: string;

  @IsNotEmpty()
  dailyAvailability: {
    beginAt: number;
    endAt: number;
  }[];

  @IsNotEmpty()
  providerId: number;
}
