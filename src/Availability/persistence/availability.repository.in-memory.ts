import { AvailabilityRepository } from '../domain/availability.repository';
import { Availability } from '../domain/availability';
import { getWeekDayAsString } from '../domain/weekdays';
import { NotAvailableException } from '../application/exceptions/not-available.exception';
import { timeIsInTimeframe } from '../../shared/utils/date-time.utils';
import { UpdateAvailabilityDto } from '../dto/update-availability.dto';
import { AvailabilityNotFoundException } from '../application/exceptions/availability-not-found.exception';

export class AvailabilityRepositoryInMemory implements AvailabilityRepository {
  private availabilities = [
    new Availability({
      id: '1',
      day: getWeekDayAsString('MONDAY'),
      dailyAvailability: [
        {
          beginAt: 10.5,
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
      providerId: '1',
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

  async add(availability: Availability): Promise<Availability> {
    this.availabilities.push(availability);
    return availability;
  }

  update(updateAvailabilityDto: UpdateAvailabilityDto) {
    const index = this.availabilities.findIndex((availability) => {
      return (
        availability.providerId.toString() ==
          updateAvailabilityDto.providerId.toString() &&
        availability.id.toString() == updateAvailabilityDto.id.toString()
      );
    });
    if (index != -1) {
      if (updateAvailabilityDto.dailyAvailability) {
        this.availabilities[index].setDailyAvailability =
          updateAvailabilityDto.dailyAvailability;
      }
      if (updateAvailabilityDto.day) {
        this.availabilities[index].setDay = updateAvailabilityDto.day;
      }
    } else {
      throw new AvailabilityNotFoundException(
        `availability ${updateAvailabilityDto.id} not found`,
      );
    }
  }
}
