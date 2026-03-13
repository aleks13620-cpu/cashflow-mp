import type { Marketplace, Income, IncomeEvent } from '../types';
import { dayOfMonth } from '../utils/dateHelpers';

/**
 * Expands planned marketplace payouts into a date map.
 * Suppresses a planned payout if there's an actual income for the same
 * marketplace on the same date (real transaction overrides plan).
 */
export function expandPayouts(
  marketplaces: Marketplace[],
  incomes: Income[],
  dateRange: string[],
): Map<string, IncomeEvent[]> {
  const map = new Map<string, IncomeEvent[]>();

  const enabledMarketplaces = marketplaces.filter((m) => m.enabled);

  for (const dateStr of dateRange) {
    const events: IncomeEvent[] = [];
    const dom = dayOfMonth(dateStr);

    for (const mp of enabledMarketplaces) {
      if (!mp.payoutDays.includes(dom)) continue;

      // Check if there's an actual income for this marketplace on this date
      const hasActual = incomes.some(
        (inc) => inc.marketplaceId === mp.id && inc.date === dateStr && inc.isActual,
      );
      if (hasActual) continue;

      events.push({
        id: `payout-${mp.id}-${dateStr}`,
        label: `${mp.name} (план)`,
        amount: mp.avgAmount,
        isActual: false,
        marketplaceId: mp.id,
      });
    }

    if (events.length > 0) {
      map.set(dateStr, events);
    }
  }

  return map;
}
