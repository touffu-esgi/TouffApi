import { AvailabilityRepositoryInMemory } from '../persistence/availability.repository.in-memory';
import { Availability } from '../domain/availability';
import {
  getWeekDayAsString,
  getWeekdayFromInt,
  IntWeekDays,
} from '../domain/weekdays';
import { Injectable } from '@nestjs/common';
import { AgreementRepositoryInMemory } from '../../Agreement/persistence/agreement.repository.in-memory';
import {
  getNextWeekday,
  timeToDouble,
} from '../../shared/utils/date-time.utils';

@Injectable()
export class AvailabilityService {
  constructor(
    private availabilityRepository: AvailabilityRepositoryInMemory,
    private agreementRepository: AgreementRepositoryInMemory,
  ) {}

  async getDefaultDailyAvailability(
    providerId: string,
    weekday: string,
  ): Promise<Availability> {
    const weekdayStr: string = getWeekDayAsString(weekday);
    return this.availabilityRepository.getDailyDefaultAvailability(
      providerId,
      weekdayStr,
    );
  }

  async getWeeklyAvailability(
    providerId: string,
    dateFrom?: string,
  ): Promise<Availability[]> {
    const weeklyAvailability =
      await this.availabilityRepository.getWeeklyDefaultAvailability(
        providerId,
      );
    if (dateFrom) {
      const weekBegin: Date = new Date(dateFrom);
      for (const weekday of Object.keys(weeklyAvailability)) {
        const dailyAvailability = weeklyAvailability[weekday].dailyAvailability;
        weeklyAvailability[weekday].setDailyAvailability =
          await this.getDailyAvailabilityBasedOnAgreements(
            providerId,
            dailyAvailability,
            weekBegin,
          );
      }
    }
    return weeklyAvailability;
  }

  private async getDailyAvailabilityBasedOnAgreements(
    providerId: string,
    availabilities: {
      beginAt: number;
      endAt: number;
    }[],
    dateFrom: Date,
  ): Promise<{ beginAt: number; endAt: number }[]> {
    const userAgreements = await this.agreementRepository.getAll({
      providerRef: providerId,
    });
    let nextWeekday = dateFrom;
    let dailyAvailability: { beginAt: number; endAt: number }[] = [];
    for (const agreement of userAgreements) {
      nextWeekday = getNextWeekday(dateFrom, agreement.beginningDate.getDay());
      const beginTime = timeToDouble(agreement.beginningDate);
      const endTime = beginTime + agreement.duration;
      if (
        await this.agreementRepository.dayMatchesAgreement(
          agreement.id,
          nextWeekday,
        )
      ) {
        availabilities.forEach((timeframe) => {
          dailyAvailability =
            this.availabilityRepository.updateTimeframeIfOccupied(
              beginTime,
              endTime,
              timeframe,
              dailyAvailability,
            );
        });
      } else {
        dailyAvailability = availabilities;
      }
    }
    return dailyAvailability;
  }
}
