export function timeToDouble(date: Date): number {
  return date.getHours() + date.getMinutes() / 60;
}

export function getNextWeekday(date: Date, weekday: number): Date {
  const curDay = date.getDay();
  if (curDay === weekday) return date;
  const diffDays = weekday > curDay ? weekday - curDay : 7 - (curDay - weekday);
  date.setDate(date.getDate() + diffDays);
  return date;
}

export function formatInDateToStandardJS(dateIn: string): string {
  if (dateIn.indexOf('-') !== -1) return dateIn;
  const dateSplit = dateIn.split('/');
  if (dateSplit.length !== 3) throw new Error('Wrong date format');
  return `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`;
}

export function dateIsBetweenBounds(
  dt: Date,
  dateFrom: Date,
  dateTo: Date,
): boolean {
  return dateFrom <= dt && dt <= dateTo;
}

export function timeIsInPeriod(
  dt: Date,
  begin: Date,
  duration: number,
): boolean {
  return timeToDouble(dt) - timeToDouble(begin) <= duration;
}

export function timeIsInTimeframe(
  time: number,
  timeframe: { beginAt: number; endAt: number },
): boolean {
  return time >= timeframe.beginAt && time <= timeframe.endAt;
}
