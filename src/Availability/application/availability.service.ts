import { AvailabilityRepositoryInMemory } from '../persistence/availability.repository.in-memory';
import { Availability } from '../domain/availability';
import { getWeekDayAsString } from '../domain/weekdays';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AvailabilityService {
  constructor(private availabilityRepository: AvailabilityRepositoryInMemory) {}

  async getDailyAvailability(
    providerId: string,
    weekday: string,
  ): Promise<Availability> {
    const weekdayStr: string = getWeekDayAsString(weekday);
    return this.availabilityRepository.getDailyDefaultAvailability(
      providerId,
      weekdayStr,
    );
  }

  async getWeeklyAvailability(providerId: string): Promise<Availability[]> {
    return this.availabilityRepository.getWeeklyDefaultAvailability(providerId);
  }
}
