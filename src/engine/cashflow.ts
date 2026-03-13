import type { Settings, Marketplace, Income, Expense, CashflowDay, IncomeEvent } from '../types';
import { buildDateRange } from '../utils/dateHelpers';
import { expandRecurringExpenses, getOneTimeExpenses } from './recurring';
import { expandPayouts } from './payouts';
import { CASHFLOW_DAYS } from '../constants/defaults';

/**
 * Pure function — generates a 90-day cashflow projection.
 */
export function generateCashflow(
  settings: Settings,
  marketplaces: Marketplace[],
  incomes: Income[],
  expenses: Expense[],
): CashflowDay[] {
  const dateRange = buildDateRange(settings.startDate, CASHFLOW_DAYS);

  // Step 1: Expand planned marketplace payouts
  const payoutMap = expandPayouts(marketplaces, incomes, dateRange);

  // Step 2: Build actual income map
  const actualIncomeMap = new Map<string, IncomeEvent[]>();
  for (const income of incomes) {
    if (!dateRange.includes(income.date)) continue;
    const existing = actualIncomeMap.get(income.date) ?? [];
    const mpName =
      income.marketplaceId != null
        ? (marketplaces.find((m) => m.id === income.marketplaceId)?.name ?? 'Маркетплейс')
        : 'Ручной ввод';
    existing.push({
      id: income.id,
      label: income.isActual ? mpName : `${mpName} (план)`,
      amount: income.amount,
      isActual: income.isActual,
      marketplaceId: income.marketplaceId,
    });
    actualIncomeMap.set(income.date, existing);
  }

  // Step 3: Expand recurring expenses
  const recurringMap = expandRecurringExpenses(expenses, dateRange);

  // Step 4: Walk each day and accumulate
  let runningBalance = settings.startBalance;
  const result: CashflowDay[] = [];

  for (const dateStr of dateRange) {
    const plannedPayouts = payoutMap.get(dateStr) ?? [];
    const actualIncomes = actualIncomeMap.get(dateStr) ?? [];
    const recurringExpenses = recurringMap.get(dateStr) ?? [];
    const oneTimeExpenses = getOneTimeExpenses(expenses, dateStr);

    // Merge incomes: actual overrides planned for same marketplace
    const allIncomes: IncomeEvent[] = [...actualIncomes, ...plannedPayouts];
    const allExpenses = [...recurringExpenses, ...oneTimeExpenses];

    const totalIncome = allIncomes.reduce((sum, e) => sum + e.amount, 0);
    const totalExpense = allExpenses.reduce((sum, e) => sum + e.amount, 0);

    runningBalance += totalIncome - totalExpense;

    result.push({
      date: dateStr,
      incomes: allIncomes,
      expenses: allExpenses,
      totalIncome,
      totalExpense,
      balance: runningBalance,
    });
  }

  return result;
}
