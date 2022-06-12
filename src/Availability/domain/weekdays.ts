export enum WeekDays {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export function getWeekDayAsString(weekday: string | WeekDays): string {
  weekday = weekday.toString().toUpperCase();
  if (WeekDays[weekday]) return WeekDays[weekday];
  throw new Error('Incoherent weekday');
}
