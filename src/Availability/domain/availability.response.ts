import { AvailabilityProps } from './availability.props';

export class AvailabilityResponse implements AvailabilityProps {
  readonly id: string;
  readonly day: string;
  readonly dailyAvailability: {
    beginAt: number;
    endAt: number;
    duration: number;
  }[];
  readonly providerId: string;

  constructor(availabilityProps: AvailabilityProps) {
    this.id = availabilityProps.id;
    this.day = availabilityProps.day;
    this.dailyAvailability = availabilityProps.dailyAvailability.map(function (
      availability,
    ) {
      return {
        beginAt: availability.beginAt,
        endAt: availability.endAt,
        duration: availability.endAt - availability.beginAt,
      };
    });
    this.providerId = availabilityProps.providerId;
  }
}
