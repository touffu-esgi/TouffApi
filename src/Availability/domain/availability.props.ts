export interface AvailabilityProps {
  readonly id: string;
  readonly day: string;
  readonly dailyAvailability: {
    beginAt: number;
    endAt: number;
  }[];
  readonly providerId: string;
}
