import { IsEnum, IsNotEmpty } from 'class-validator';
import { WeekDays } from '../domain/weekdays';

export class UpdateAvailabilityDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  providerId: number;

  @IsEnum(WeekDays)
  day: string;

  dailyAvailability: {
    beginAt: number;
    endAt: number;
  }[];
}
