import { addDays, format, parseISO, isSameDay, getDay, getDate } from 'date-fns';

export function parseDate(dateStr: string): Date {
  return parseISO(dateStr);
}

export function formatISO(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

/** Returns array of ISO date strings for [startDate, startDate+days) */
export function buildDateRange(startDateStr: string, days: number): string[] {
  const start = parseISO(startDateStr);
  const result: string[] = [];
  for (let i = 0; i < days; i++) {
    result.push(formatISO(addDays(start, i)));
  }
  return result;
}

/** True if both ISO date strings refer to the same calendar day */
export function sameDay(a: string, b: string): boolean {
  return isSameDay(parseISO(a), parseISO(b));
}

/** Day of month 1-31 */
export function dayOfMonth(dateStr: string): number {
  return getDate(parseISO(dateStr));
}

/** Day of week 0=Sun..6=Sat */
export function dayOfWeek(dateStr: string): number {
  return getDay(parseISO(dateStr));
}
