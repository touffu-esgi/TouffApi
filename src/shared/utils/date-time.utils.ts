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
