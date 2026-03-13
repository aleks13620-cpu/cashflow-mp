import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export function GeneralSettings() {
  const settings = useStore((s) => s.settings);
  const updateSettings = useStore((s) => s.updateSettings);

  const [startBalance, setStartBalance] = useState(String(settings.startBalance));
  const [startDate, setStartDate] = useState(settings.startDate);
  const [alertThreshold, setAlertThreshold] = useState(String(settings.alertThreshold));
  const [saved, setSaved] = useState(false);

  function handleSave() {
    const balance = parseFloat(startBalance);
    const threshold = parseFloat(alertThreshold);
    if (isNaN(balance) || isNaN(threshold) || !startDate) return;
    updateSettings({
      startBalance: balance,
      startDate,
      alertThreshold: threshold,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
      <h3 className="text-sm font-semibold text-gray-700">Общие настройки</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input
          label="Начальный баланс, ₽"
          type="number"
          value={startBalance}
          onChange={(e) => setStartBalance(e.target.value)}
          aria-label="Начальный баланс"
        />
        <Input
          label="Дата начала прогноза"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          aria-label="Дата начала"
        />
        <Input
          label="Порог предупреждения, ₽"
          type="number"
          value={alertThreshold}
          onChange={(e) => setAlertThreshold(e.target.value)}
          aria-label="Порог предупреждения"
        />
      </div>
      <div className="flex items-center gap-3">
        <Button onClick={handleSave} size="sm">
          Сохранить
        </Button>
        {saved && <span className="text-sm text-emerald-600">✓ Сохранено</span>}
      </div>
    </div>
  );
}
