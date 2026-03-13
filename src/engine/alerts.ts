import type { CashflowDay, Alert, Settings } from '../types';
import { parseISO, differenceInDays } from 'date-fns';

/**
 * Scans cashflow days and returns the most severe upcoming alert.
 * Critical = balance < 0
 * Warning = 0 <= balance < alertThreshold
 */
export function getAlerts(cashflow: CashflowDay[], settings: Settings): Alert[] {
  const today = new Date();
  const alerts: Alert[] = [];

  for (const day of cashflow) {
    const date = parseISO(day.date);
    const daysAhead = differenceInDays(date, today);

    if (day.balance < 0) {
      alerts.push({
        level: 'critical',
        date: day.date,
        balance: day.balance,
        daysAhead,
      });
      break; // report first critical only
    } else if (day.balance < settings.alertThreshold) {
      // Only report first time we drop below threshold
      if (!alerts.some((a) => a.level === 'warning')) {
        alerts.push({
          level: 'warning',
          date: day.date,
          balance: day.balance,
          daysAhead,
        });
      }
    }
  }

  return alerts;
}

/**
 * Returns the most severe single alert (critical > warning).
 */
export function getTopAlert(cashflow: CashflowDay[], settings: Settings): Alert | null {
  const alerts = getAlerts(cashflow, settings);
  const critical = alerts.find((a) => a.level === 'critical');
  if (critical) return critical;
  const warning = alerts.find((a) => a.level === 'warning');
  return warning ?? null;
}
