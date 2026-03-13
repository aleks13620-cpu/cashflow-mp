import { useState, useMemo } from 'react';
import { useCashflow } from '../../hooks/useCashflow';
import { getCategoryLabel } from '../../constants/categories';
import { formatDateNumeric, formatRub } from '../../utils/format';
import { BalanceBadge } from './BalanceBadge';
import type { Filters } from './OperationsFilters';

interface Row {
  date: string;
  type: 'income' | 'expense';
  label: string;
  category: string;
  amount: number;
  balance: number;
}

type SortKey = 'date' | 'amount' | 'balance';
type SortDir = 'asc' | 'desc';

interface OperationsTableProps {
  filters: Filters;
}

export function OperationsTable({ filters }: OperationsTableProps) {
  const { cashflow } = useCashflow();
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  }

  const rows = useMemo<Row[]>(() => {
    const result: Row[] = [];

    for (const day of cashflow) {
      for (const inc of day.incomes) {
        result.push({
          date: day.date,
          type: 'income',
          label: inc.label,
          category: '',
          amount: inc.amount,
          balance: day.balance,
        });
      }
      for (const exp of day.expenses) {
        result.push({
          date: day.date,
          type: 'expense',
          label: exp.label,
          category: exp.category,
          amount: exp.amount,
          balance: day.balance,
        });
      }
    }

    return result;
  }, [cashflow]);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (filters.dateFrom && r.date < filters.dateFrom) return false;
      if (filters.dateTo && r.date > filters.dateTo) return false;
      if (filters.type !== 'all' && r.type !== filters.type) return false;
      if (filters.category && r.category !== filters.category) return false;
      return true;
    });
  }, [rows, filters]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'date') cmp = a.date.localeCompare(b.date);
      else if (sortKey === 'amount') cmp = a.amount - b.amount;
      else if (sortKey === 'balance') cmp = a.balance - b.balance;
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  function SortIcon({ k }: { k: SortKey }) {
    if (sortKey !== k) return <span className="text-gray-300 ml-1">↕</span>;
    return <span className="text-blue-500 ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>;
  }

  function th(label: string, k: SortKey, extraClass = '') {
    return (
      <th
        className={`px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide cursor-pointer hover:text-gray-700 select-none ${extraClass}`}
        onClick={() => handleSort(k)}
      >
        {label}
        <SortIcon k={k} />
      </th>
    );
  }

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-400">
        <span className="text-4xl mb-3">📭</span>
        <p className="text-sm">Операций не найдено</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse min-w-[600px]">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {th('Дата', 'date')}
            <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Тип</th>
            <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Наименование</th>
            <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Категория</th>
            {th('Сумма', 'amount', 'text-right')}
            {th('Баланс', 'balance', 'text-right')}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {sorted.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50 transition-colors">
              <td className="px-3 py-2.5 text-gray-600 whitespace-nowrap">
                {formatDateNumeric(row.date)}
              </td>
              <td className="px-3 py-2.5">
                <span
                  className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${
                    row.type === 'income'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  {row.type === 'income' ? '▲ Доход' : '▼ Расход'}
                </span>
              </td>
              <td className="px-3 py-2.5 text-gray-900 max-w-xs truncate">{row.label}</td>
              <td className="px-3 py-2.5 text-gray-500 hidden sm:table-cell">
                {row.category ? getCategoryLabel(row.category) : '—'}
              </td>
              <td
                className={`px-3 py-2.5 text-right font-medium whitespace-nowrap ${
                  row.type === 'income' ? 'text-emerald-600' : 'text-red-600'
                }`}
              >
                {row.type === 'income' ? '+' : '-'}
                {formatRub(row.amount)}
              </td>
              <td className="px-3 py-2.5 text-right whitespace-nowrap">
                <BalanceBadge balance={row.balance} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
