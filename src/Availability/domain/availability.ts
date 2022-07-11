import { AvailabilityProps } from './availability.props';
import { getWeekDayAsString } from './weekdays';

export class Availability implements AvailabilityProps {
  private readonly _id: string;
  private _day: string;
  private _dailyAvailability: {
    beginAt: number;
    endAt: number;
  }[];
  private readonly _providerId: string;

  constructor(availabilityProps: AvailabilityProps) {
    this._id = availabilityProps.id;
    this._day = getWeekDayAsString(availabilityProps.day);
    if (availabilityProps.dailyAvailability.length === 0) {
      this._dailyAvailability = [
        {
          beginAt: 8,
          endAt: 18,
        },
      ];
    } else {
      this._dailyAvailability = availabilityProps.dailyAvailability;
    }
    this._providerId = availabilityProps.providerId;
  }

  get id(): string {
    return this._id;
  }

  get day(): string {
    return this._day;
  }

  get dailyAvailability(): {
    beginAt: number;
    endAt: number;
  }[] {
    return this._dailyAvailability;
  }

  protected dailyAvailabilityAtIndex(index: number): {
    beginAt: number;
    endAt: number;
  } {
    if (this._dailyAvailability[index]) return this._dailyAvailability[index];
    throw new Error('Unavailable index');
  }

  get providerId(): string {
    return this._providerId;
  }

  set setDailyAvailability(value: { beginAt: number; endAt: number }[]) {
    this._dailyAvailability = value;
  }

  public computeTimeAvailable(index: number): number {
    return (
      this.dailyAvailabilityAtIndex(index).beginAt -
      this.dailyAvailabilityAtIndex(index).endAt
    );
  }

  set setDay(value: string) {
    this._day = value;
  }
}
