import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

/** Format number as Russian rubles: 1 234 500 ₽ */
export function formatRub(amount: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Format as compact rubles: 1.2 млн / 150 тыс / 500 */
export function formatRubCompact(amount: number): string {
  const abs = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';
  if (abs >= 1_000_000) {
    return `${sign}${(abs / 1_000_000).toFixed(1)} млн ₽`;
  }
  if (abs >= 1000) {
    return `${sign}${(abs / 1000).toFixed(0)} тыс ₽`;
  }
  return `${sign}${abs} ₽`;
}

/** Format ISO date to "28 апр" */
export function formatDateShort(dateStr: string): string {
  return format(parseISO(dateStr), 'd MMM', { locale: ru });
}

/** Format ISO date to "28 апреля 2025" */
export function formatDateLong(dateStr: string): string {
  return format(parseISO(dateStr), 'd MMMM yyyy', { locale: ru });
}

/** Format ISO date to "28.04.2025" */
export function formatDateNumeric(dateStr: string): string {
  return format(parseISO(dateStr), 'dd.MM.yyyy');
}
