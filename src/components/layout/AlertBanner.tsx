import { useCashflow } from '../../hooks/useCashflow';
import { useStore } from '../../store/useStore';
import { formatRub, formatDateLong } from '../../utils/format';

export function AlertBanner() {
  const { alert } = useCashflow();
  const alertThreshold = useStore((s) => s.settings.alertThreshold);

  if (!alert) return null;

  const isCritical = alert.level === 'critical';
  const daysText =
    alert.daysAhead === 0
      ? 'сегодня'
      : alert.daysAhead === 1
        ? 'завтра'
        : `через ${alert.daysAhead} дн.`;

  return (
    <div
      className={`px-4 py-3 text-sm font-medium flex items-center gap-2 ${
        isCritical ? 'bg-red-600 text-white' : 'bg-amber-400 text-amber-900'
      }`}
      role="alert"
    >
      <span className="text-base">{isCritical ? '🚨' : '⚠️'}</span>
      <span>
        {isCritical ? 'Кассовый разрыв' : 'Предупреждение'}:{' '}
        {formatDateLong(alert.date)} ({daysText}) баланс опустится до{' '}
        <strong>{formatRub(alert.balance)}</strong>
        {isCritical ? ' — КРИТИЧНО!' : ` — ниже порога ${formatRub(alertThreshold)}`}
      </span>
    </div>
  );
}
