import { IsEnum, IsNotEmpty } from 'class-validator';
import { WeekDays } from '../domain/weekdays';

export class AddAvailabilityDto {
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
