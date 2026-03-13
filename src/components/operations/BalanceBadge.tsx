import { useStore } from '../../store/useStore';
import { formatRub } from '../../utils/format';

interface BalanceBadgeProps {
  balance: number;
}

export function BalanceBadge({ balance }: BalanceBadgeProps) {
  const alertThreshold = useStore((s) => s.settings.alertThreshold);

  const colorClass =
    balance < 0
      ? 'text-red-600 bg-red-50'
      : balance < alertThreshold
        ? 'text-amber-700 bg-amber-50'
        : 'text-emerald-700 bg-emerald-50';

  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${colorClass}`}>
      {formatRub(balance)}
    </span>
  );
}
