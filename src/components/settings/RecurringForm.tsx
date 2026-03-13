import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { CATEGORIES } from '../../constants/categories';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import type { Expense } from '../../types';

interface RecurringFormProps {
  initial?: Expense;
  onDone: () => void;
}

const WEEKDAY_OPTIONS = [
  { value: '1', label: 'Понедельник' },
  { value: '2', label: 'Вторник' },
  { value: '3', label: 'Среда' },
  { value: '4', label: 'Четверг' },
  { value: '5', label: 'Пятница' },
  { value: '6', label: 'Суббота' },
  { value: '0', label: 'Воскресенье' },
];

const dayOptions = Array.from({ length: 28 }, (_, i) => ({
  value: String(i + 1),
  label: `${i + 1}-го числа`,
}));

export function RecurringForm({ initial, onDone }: RecurringFormProps) {
  const addExpense = useStore((s) => s.addExpense);
  const updateExpense = useStore((s) => s.updateExpense);

  const [name, setName] = useState(initial?.name ?? '');
  const [category, setCategory] = useState(initial?.category ?? CATEGORIES[0].id);
  const [amount, setAmount] = useState(String(initial?.amount ?? ''));
  const [recurringType, setRecurringType] = useState<'monthly' | 'weekly'>(
    initial?.recurringType ?? 'monthly',
  );
  const [recurringDay, setRecurringDay] = useState(String(initial?.recurringDay ?? 1));
  const [weekday, setWeekday] = useState(String(initial?.weekday ?? 1));
  const [note, setNote] = useState(initial?.note ?? '');
  const [error, setError] = useState('');

  const categoryOptions = CATEGORIES.map((c) => ({
    value: c.id,
    label: `${c.emoji} ${c.label}`,
  }));

  function handleSave() {
    if (!name.trim()) { setError('Введите название'); return; }
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) { setError('Укажите сумму'); return; }

    const expense: Expense = {
      id: initial?.id ?? `exp-${Date.now()}`,
      name: name.trim(),
      category,
      amount: num,
      isRecurring: true,
      recurringType,
      recurringDay: recurringType === 'monthly' ? parseInt(recurringDay) : undefined,
      weekday: recurringType === 'weekly' ? parseInt(weekday) : undefined,
      note,
    };
    if (initial) updateExpense(expense);
    else addExpense(expense);
    onDone();
  }

  return (
    <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          label="Название"
          value={name}
          onChange={(e) => { setName(e.target.value); setError(''); }}
          placeholder="Аренда, зарплата..."
          aria-label="Название расхода"
        />
        <Select
          label="Категория"
          options={categoryOptions}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Категория"
        />
        <Input
          label="Сумма, ₽"
          type="number"
          value={amount}
          onChange={(e) => { setAmount(e.target.value); setError(''); }}
          placeholder="0"
          aria-label="Сумма"
        />
        <Select
          label="Периодичность"
          options={[
            { value: 'monthly', label: 'Ежемесячно' },
            { value: 'weekly', label: 'Еженедельно' },
          ]}
          value={recurringType}
          onChange={(e) => setRecurringType(e.target.value as 'monthly' | 'weekly')}
          aria-label="Периодичность"
        />
        {recurringType === 'monthly' ? (
          <Select
            label="День месяца"
            options={dayOptions}
            value={recurringDay}
            onChange={(e) => setRecurringDay(e.target.value)}
            aria-label="День месяца"
          />
        ) : (
          <Select
            label="День недели"
            options={WEEKDAY_OPTIONS}
            value={weekday}
            onChange={(e) => setWeekday(e.target.value)}
            aria-label="День недели"
          />
        )}
        <Input
          label="Примечание"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Необязательно"
          aria-label="Примечание"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-2">
        <Button size="sm" onClick={handleSave}>
          {initial ? 'Сохранить' : 'Добавить'}
        </Button>
        <Button size="sm" variant="secondary" onClick={onDone}>
          Отмена
        </Button>
      </div>
    </div>
  );
}
