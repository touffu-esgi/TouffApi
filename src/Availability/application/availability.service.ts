import { AvailabilityRepositoryInMemory } from '../persistence/availability.repository.in-memory';
import { Availability } from '../domain/availability';
import { getWeekDayAsString } from '../domain/weekdays';
import { Injectable } from '@nestjs/common';
import { AgreementRepositoryInMemory } from '../../Agreement/persistence/agreement.repository.in-memory';
import {
  getNextWeekday,
  timeIsInTimeframe,
  timeToDouble,
} from '../../shared/utils/date-time.utils';
import { AddAvailabilityDto } from '../dto/add-availability.dto';

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
    const weeklyAvailabilitiesConsideringAgreements = [];
    if (dateFrom) {
      const weekBegin: Date = new Date(dateFrom);

      for (const availability of weeklyAvailability) {
        const availabilityWithAgreement =
          await this.getDailyAvailabilityBasedOnAgreements(
            providerId,
            availability.dailyAvailability,
            weekBegin,
          );
        if (availabilityWithAgreement.length > 0)
          weeklyAvailabilitiesConsideringAgreements.push(
            new Availability({
              id: availability.id,
              day: availability.day,
              dailyAvailability: availabilityWithAgreement,
              providerId: availability.providerId,
            }),
          );
      }
      return weeklyAvailabilitiesConsideringAgreements;
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
      status: 'Agreed',
      providerRef: providerId,
    });
    if (userAgreements.length === 0) return availabilities;
    let nextWeekday = dateFrom;
    let dailyAvailability: { beginAt: number; endAt: number }[] = [];
    for (const agreement of userAgreements) {
      nextWeekday = getNextWeekday(dateFrom, agreement.beginningDate.getDay());
      const beginTime = timeToDouble(agreement.beginningDate);
      const endTime = beginTime + agreement.duration;
      if (
        await this.agreementRepository.dayMatchesAgreement(
          agreement,
          nextWeekday,
        )
      ) {
        availabilities.forEach((timeframe) => {
          dailyAvailability = this.splitTimeframeIfOccupied(
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

  public splitTimeframeIfOccupied(
    occupiedBeginTime: number,
    occupiedEndTime: number,
    timeframe: { beginAt: number; endAt: number },
    dailyAvailabilities: { beginAt: number; endAt: number }[],
  ): { beginAt: number; endAt: number }[] {
    let isSplit = false;
    if (timeIsInTimeframe(occupiedBeginTime, timeframe)) {
      isSplit = true;
      dailyAvailabilities.push({
        beginAt: timeframe.beginAt,
        endAt: occupiedBeginTime,
      });
    }
    if (timeIsInTimeframe(occupiedEndTime, timeframe)) {
      isSplit = true;
      dailyAvailabilities.push({
        beginAt: occupiedEndTime,
        endAt: timeframe.endAt,
      });
    }
    if (!isSplit) dailyAvailabilities.push(timeframe);
    return dailyAvailabilities;
  }

  async add(addAvailabilityDto: AddAvailabilityDto): Promise<Availability> {
    const availability = new Availability({
      dailyAvailability: addAvailabilityDto.dailyAvailability,
      day: addAvailabilityDto.day,
      id: await this.availabilityRepository.getNextId(),
      providerId: addAvailabilityDto.providerId.toString(),
    });

    return await this.availabilityRepository.add(availability);
  }
}
