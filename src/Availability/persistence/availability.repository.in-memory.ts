import { AvailabilityRepository } from '../domain/availability.repository';
import { Availability } from '../domain/availability';
import { getWeekDayAsString } from '../domain/weekdays';
import { NotAvailableException } from '../application/exceptions/not-available.exception';

export class AvailabilityRepositoryInMemory implements AvailabilityRepository {
  private availabilities = [
    new Availability({
      id: '1',
      day: getWeekDayAsString('MONDAY'),
      dailyAvailability: [
        {
          beginAt: 9.0,
          endAt: 13.0,
        },
        {
          beginAt: 17.5,
          endAt: 20.0,
        },
      ],
      providerId: '1',
    }),
    new Availability({
      id: '2',
      day: getWeekDayAsString('TUESDAY'),
      dailyAvailability: [
        {
          beginAt: 9,
          endAt: 12.5,
        },
      ],
      providerId: '2',
    }),
  ];

  async getDailyDefaultAvailability(
    providerId: string,
    weekday: string,
  ): Promise<Availability> {
    const availabilities: Availability[] = this.availabilities.filter(
      (availability) =>
        availability.providerId === providerId && availability.day === weekday,
    );
    if (availabilities.length > 0) return availabilities[0];
    throw new NotAvailableException(
      `Provider ${providerId} not available on ${weekday}`,
    );
  }

  async getWeeklyDefaultAvailability(
    providerId: string,
  ): Promise<Availability[]> {
    const availabilities: Availability[] = this.availabilities.filter(
      (availability) => availability.providerId === providerId,
    );
    if (availabilities.length > 0) return availabilities;
    throw new NotAvailableException(
      `Provider ${providerId} not available at the moment`,
    );
  }

  async getNextId(): Promise<string> {
    const currentId = +this.availabilities.at(-1).id;
    return (currentId + 1).toString();
  }

  public updateTimeframeIfOccupied(
    occupiedBeginTime: number,
    occupiedEndTime: number,
    timeframe: { beginAt: number; endAt: number },
    dailyAvailabilities: { beginAt: number; endAt: number }[],
  ): { beginAt: number; endAt: number }[] {
    let isSplit = false;
    if (this.timeOverlapsTimeframe(occupiedBeginTime, timeframe)) {
      isSplit = true;
      dailyAvailabilities.push({
        beginAt: timeframe.beginAt,
        endAt: occupiedBeginTime,
      });
    }
    if (this.timeOverlapsTimeframe(occupiedEndTime, timeframe)) {
      isSplit = true;
      dailyAvailabilities.push({
        beginAt: occupiedEndTime,
        endAt: timeframe.endAt,
      });
    }
    if (!isSplit) dailyAvailabilities.push(timeframe);
    return dailyAvailabilities;
  }

  public timeOverlapsTimeframe(
    time: number,
    timeframe: { beginAt: number; endAt: number },
  ): boolean {
    return time > timeframe.beginAt && time < timeframe.endAt;
  }
}