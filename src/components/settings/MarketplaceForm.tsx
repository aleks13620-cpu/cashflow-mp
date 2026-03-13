import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { MARKETPLACE_COLORS } from '../../constants/defaults';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import type { Marketplace } from '../../types';

interface MarketplaceFormProps {
  initial?: Marketplace;
  onDone: () => void;
}

export function MarketplaceForm({ initial, onDone }: MarketplaceFormProps) {
  const addMarketplace = useStore((s) => s.addMarketplace);
  const updateMarketplace = useStore((s) => s.updateMarketplace);

  const [name, setName] = useState(initial?.name ?? '');
  const [payoutDaysStr, setPayoutDaysStr] = useState(
    initial?.payoutDays.join(', ') ?? '',
  );
  const [avgAmount, setAvgAmount] = useState(String(initial?.avgAmount ?? ''));
  const [color, setColor] = useState(initial?.color ?? MARKETPLACE_COLORS[0]);
  const [error, setError] = useState('');

  function handleSave() {
    if (!name.trim()) { setError('Введите название'); return; }
    const days = payoutDaysStr
      .split(/[,\s]+/)
      .map((s) => parseInt(s.trim()))
      .filter((n) => !isNaN(n) && n >= 1 && n <= 28);
    if (days.length === 0) { setError('Укажите дни выплат (1–28)'); return; }
    const amount = parseFloat(avgAmount);
    if (isNaN(amount) || amount <= 0) { setError('Укажите среднюю сумму выплаты'); return; }

    const mp: Marketplace = {
      id: initial?.id ?? `mp-${Date.now()}`,
      name: name.trim(),
      payoutDays: days,
      avgAmount: amount,
      color,
      enabled: initial?.enabled ?? true,
    };
    if (initial) updateMarketplace(mp);
    else addMarketplace(mp);
    onDone();
  }

  return (
    <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          label="Название маркетплейса"
          value={name}
          onChange={(e) => { setName(e.target.value); setError(''); }}
          placeholder="Ozon, WB, ЯМ..."
          aria-label="Название маркетплейса"
        />
        <Input
          label="Дни выплат (через запятую)"
          value={payoutDaysStr}
          onChange={(e) => { setPayoutDaysStr(e.target.value); setError(''); }}
          placeholder="5, 20"
          aria-label="Дни выплат"
        />
        <Input
          label="Средняя сумма выплаты, ₽"
          type="number"
          value={avgAmount}
          onChange={(e) => { setAvgAmount(e.target.value); setError(''); }}
          placeholder="100000"
          aria-label="Средняя сумма выплаты"
        />
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Цвет</label>
          <div className="flex gap-2 flex-wrap">
            {MARKETPLACE_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110"
                style={{
                  backgroundColor: c,
                  borderColor: color === c ? '#111' : 'transparent',
                }}
                aria-label={`Цвет ${c}`}
              />
            ))}
          </div>
        </div>
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
