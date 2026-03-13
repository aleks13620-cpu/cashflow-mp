import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { getCategoryLabel } from '../../constants/categories';
import { formatRub } from '../../utils/format';
import { Button } from '../ui/Button';
import { RecurringForm } from './RecurringForm';
import type { Expense } from '../../types';

export function RecurringList() {
  const expenses = useStore((s) => s.expenses);
  const deleteExpense = useStore((s) => s.deleteExpense);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const recurring = expenses.filter((e) => e.isRecurring);

  function periodLabel(e: Expense): string {
    if (e.recurringType === 'monthly') return `Ежемесячно, ${e.recurringDay}-го`;
    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    return `Еженедельно, ${days[e.weekday ?? 1]}`;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">Постоянные расходы</h3>
        <Button size="sm" variant="secondary" onClick={() => setShowAdd(true)}>
          + Добавить
        </Button>
      </div>

      {showAdd && <RecurringForm onDone={() => setShowAdd(false)} />}

      {recurring.length === 0 && !showAdd && (
        <div className="text-center py-8 text-gray-400 text-sm">
          <span className="text-3xl block mb-2">📂</span>
          Постоянных расходов нет
        </div>
      )}

      <div className="space-y-2">
        {recurring.map((exp: Expense) =>
          editingId === exp.id ? (
            <RecurringForm
              key={exp.id}
              initial={exp}
              onDone={() => setEditingId(null)}
            />
          ) : (
            <div
              key={exp.id}
              className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">{exp.name}</p>
                <p className="text-xs text-gray-500">
                  {getCategoryLabel(exp.category)} · {formatRub(exp.amount)} · {periodLabel(exp)}
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={() => setEditingId(exp.id)}>
                  Ред.
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    if (confirm(`Удалить "${exp.name}"?`)) deleteExpense(exp.id);
                  }}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  Удал.
                </Button>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
