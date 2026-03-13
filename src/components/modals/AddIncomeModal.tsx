import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Modal } from './Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Checkbox } from '../ui/Checkbox';
import { Button } from '../ui/Button';

export function AddIncomeModal() {
  const marketplaces = useStore((s) => s.marketplaces);
  const settings = useStore((s) => s.settings);
  const addIncome = useStore((s) => s.addIncome);
  const closeModal = useStore((s) => s.closeModal);

  const [marketplaceId, setMarketplaceId] = useState<string>(
    marketplaces[0]?.id ?? 'manual',
  );
  const [date, setDate] = useState(settings.startDate);
  const [amount, setAmount] = useState('');
  const [isActual, setIsActual] = useState(true);
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const mpOptions = [
    ...marketplaces.map((m) => ({ value: m.id, label: m.name })),
    { value: 'manual', label: 'Ручной ввод' },
  ];

  function handleSubmit() {
    const num = parseFloat(amount);
    if (!amount || isNaN(num) || num <= 0) {
      setError('Введите корректную сумму');
      return;
    }
    if (!date) {
      setError('Укажите дату');
      return;
    }
    addIncome({
      id: `inc-${Date.now()}`,
      marketplaceId: marketplaceId === 'manual' ? null : marketplaceId,
      date,
      amount: num,
      isActual,
      note,
    });
    closeModal();
  }

  return (
    <Modal title="Добавить доход">
      <div className="space-y-4">
        <Select
          label="Источник"
          options={mpOptions}
          value={marketplaceId}
          onChange={(e) => setMarketplaceId(e.target.value)}
          aria-label="Источник дохода"
        />
        <Input
          label="Дата"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          aria-label="Дата поступления"
        />
        <Input
          label="Сумма, ₽"
          type="number"
          min="0"
          step="100"
          value={amount}
          onChange={(e) => { setAmount(e.target.value); setError(''); }}
          placeholder="0"
          error={error}
          aria-label="Сумма дохода"
        />
        <Checkbox
          label="Фактическое поступление (снять — если только план)"
          checked={isActual}
          onChange={(e) => setIsActual(e.target.checked)}
        />
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
