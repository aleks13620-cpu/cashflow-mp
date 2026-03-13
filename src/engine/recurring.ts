import type { Expense, ExpenseEvent } from '../types';
import { dayOfMonth, dayOfWeek } from '../utils/dateHelpers';

/**
 * Given a list of recurring expenses, returns a map of date → ExpenseEvent[]
 * for all occurrences within the given date range.
 */
export function expandRecurringExpenses(
  expenses: Expense[],
  dateRange: string[],
): Map<string, ExpenseEvent[]> {
  const map = new Map<string, ExpenseEvent[]>();

  const recurringExpenses = expenses.filter((e) => e.isRecurring);

  for (const dateStr of dateRange) {
    const events: ExpenseEvent[] = [];

    for (const expense of recurringExpenses) {
      let matches = false;

      if (expense.recurringType === 'monthly' && expense.recurringDay != null) {
        const targetDay = Math.min(expense.recurringDay, 28);
        matches = dayOfMonth(dateStr) === targetDay;
      } else if (expense.recurringType === 'weekly' && expense.weekday != null) {
        matches = dayOfWeek(dateStr) === expense.weekday;
      }

      if (matches) {
        events.push({
          id: `${expense.id}-${dateStr}`,
          label: expense.name,
          category: expense.category,
          amount: expense.amount,
        });
      }
    }

    if (events.length > 0) {
      map.set(dateStr, events);
    }
  }

  return map;
}

/**
 * Returns ExpenseEvent[] for one-time (non-recurring) expenses on a given date.
 */
export function getOneTimeExpenses(expenses: Expense[], dateStr: string): ExpenseEvent[] {
  return expenses
    .filter((e) => !e.isRecurring && e.date === dateStr)
    .map((e) => ({
      id: e.id,
      label: e.name,
      category: e.category,
      amount: e.amount,
    }));
}
