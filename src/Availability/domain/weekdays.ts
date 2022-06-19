export enum WeekDays {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export enum IntWeekDays {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
}

export function getWeekDayAsString(weekday: string | WeekDays): string {
  weekday = weekday.toString().toUpperCase();
  if (WeekDays[weekday]) return WeekDays[weekday];
  throw new Error('Incoherent weekday');
}

export function getWeekdayFromInt(i: number): string {
  if (IntWeekDays[i]) return IntWeekDays[i];
  throw new Error('Incoherent weekday');
}
