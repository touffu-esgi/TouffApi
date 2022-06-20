import { Availability } from './availability';
import { WeekDays } from './weekdays';

export interface AvailabilityRepository {
  getWeeklyDefaultAvailability(providerId: string): Promise<Availability[]>;
  getDailyDefaultAvailability(
    providerId: string,
    weekday: WeekDays,
  ): Promise<Availability>;
  getNextId(): Promise<string>;
}
