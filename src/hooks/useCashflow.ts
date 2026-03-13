import { useMemo } from 'react';
import { useStore } from '../store/useStore';
import { generateCashflow } from '../engine/cashflow';
import { getTopAlert } from '../engine/alerts';
import type { CashflowDay, Alert } from '../types';

export interface CashflowKpi {
  minBalance: number;
  maxBalance: number;
  totalIncome90: number;
  totalExpense90: number;
  currentBalance: number;
}

export interface UseCashflowResult {
  cashflow: CashflowDay[];
  alert: Alert | null;
  kpi: CashflowKpi;
}

export function useCashflow(): UseCashflowResult {
  const settings = useStore((s) => s.settings);
  const marketplaces = useStore((s) => s.marketplaces);
  const incomes = useStore((s) => s.incomes);
  const expenses = useStore((s) => s.expenses);

  return useMemo(() => {
    const cashflow = generateCashflow(settings, marketplaces, incomes, expenses);
    const alert = getTopAlert(cashflow, settings);

    const balances = cashflow.map((d) => d.balance);
    const kpi: CashflowKpi = {
      currentBalance: settings.startBalance,
      minBalance: Math.min(...balances),
      maxBalance: Math.max(...balances),
      totalIncome90: cashflow.reduce((s, d) => s + d.totalIncome, 0),
      totalExpense90: cashflow.reduce((s, d) => s + d.totalExpense, 0),
    };

    return { cashflow, alert, kpi };
  }, [settings, marketplaces, incomes, expenses]);
}
