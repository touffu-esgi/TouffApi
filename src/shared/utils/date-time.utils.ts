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
