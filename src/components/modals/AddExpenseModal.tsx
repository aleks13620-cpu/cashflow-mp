import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { CATEGORIES } from '../../constants/categories';
import { Modal } from './Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Checkbox } from '../ui/Checkbox';
import { Button } from '../ui/Button';

const WEEKDAY_OPTIONS = [
  { value: '1', label: 'Понедельник' },
  { value: '2', label: 'Вторник' },
  { value: '3', label: 'Среда' },
  { value: '4', label: 'Четверг' },
  { value: '5', label: 'Пятница' },
  { value: '6', label: 'Суббота' },
  { value: '0', label: 'Воскресенье' },
];

export function AddExpenseModal() {
  const settings = useStore((s) => s.settings);
  const addExpense = useStore((s) => s.addExpense);
  const closeModal = useStore((s) => s.closeModal);

  const [name, setName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].id);
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(settings.startDate);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringType, setRecurringType] = useState<'monthly' | 'weekly'>('monthly');
  const [recurringDay, setRecurringDay] = useState('1');
  const [weekday, setWeekday] = useState('1');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const categoryOptions = CATEGORIES.map((c) => ({
    value: c.id,
    label: `${c.emoji} ${c.label}`,
  }));

  const recurringTypeOptions = [
    { value: 'monthly', label: 'Ежемесячно' },
    { value: 'weekly', label: 'Еженедельно' },
  ];

  const dayOptions = Array.from({ length: 28 }, (_, i) => ({
    value: String(i + 1),
    label: `${i + 1}-го числа`,
  }));

  function handleSubmit() {
    if (!name.trim()) {
      setError('Введите наименование');
      return;
    }
    const num = parseFloat(amount);
    if (!amount || isNaN(num) || num <= 0) {
      setError('Введите корректную сумму');
      return;
    }
    if (!isRecurring && !date) {
      setError('Укажите дату');
      return;
    }

    addExpense({
      id: `exp-${Date.now()}`,
      name: name.trim(),
      category,
      amount: num,
      isRecurring,
      recurringType: isRecurring ? recurringType : undefined,
      recurringDay: isRecurring && recurringType === 'monthly' ? parseInt(recurringDay) : undefined,
      weekday: isRecurring && recurringType === 'weekly' ? parseInt(weekday) : undefined,
      date: !isRecurring ? date : undefined,
      note,
    });
    closeModal();
  }

  return (
    <Modal title="Добавить расход">
      <div className="space-y-4">
        <Input
          label="Наименование"
          value={name}
          onChange={(e) => { setName(e.target.value); setError(''); }}
          placeholder="Аренда склада, НДС..."
          error={name.trim() === '' && error ? error : undefined}
          aria-label="Наименование расхода"
        />
        <Select
          label="Категория"
          options={categoryOptions}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Категория расхода"
        />
        <Input
          label="Сумма, ₽"
          type="number"
          min="0"
          step="100"
          value={amount}
          onChange={(e) => { setAmount(e.target.value); setError(''); }}
          placeholder="0"
          error={!name.trim() ? undefined : error}
          aria-label="Сумма расхода"
        />

        <Checkbox
          label="Повторяющийся расход"
          checked={isRecurring}
          onChange={(e) => setIsRecurring(e.target.checked)}
        />

        {isRecurring ? (
          <div className="space-y-3 pl-6 border-l-2 border-blue-100">
            <Select
              label="Периодичность"
              options={recurringTypeOptions}
              value={recurringType}
              onChange={(e) => setRecurringType(e.target.value as 'monthly' | 'weekly')}
              aria-label="Тип периодичности"
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
          </div>
        ) : (
          <Input
            label="Дата"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            aria-label="Дата расхода"
          />
        )}

        <Input
          label="Примечание"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Необязательно"
          aria-label="Примечание"
        />

        <div className="flex gap-3 pt-2">
          <Button onClick={handleSubmit} className="flex-1">
            Сохранить
          </Button>
          <Button variant="secondary" onClick={closeModal} className="flex-1">
            Отмена
          </Button>
        </div>
      </div>
    </Modal>
  );
}
