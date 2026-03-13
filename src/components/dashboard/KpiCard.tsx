import { clsx } from 'clsx';

interface KpiCardProps {
  label: string;
  value: string;
  sub?: string;
  trend?: 'up' | 'down' | 'neutral';
  highlight?: 'red' | 'yellow' | 'green' | 'blue';
}

const highlightClasses = {
  red: 'border-l-4 border-red-500',
  yellow: 'border-l-4 border-amber-400',
  green: 'border-l-4 border-emerald-500',
  blue: 'border-l-4 border-blue-500',
};

export function KpiCard({ label, value, sub, trend, highlight }: KpiCardProps) {
  return (
    <div
      className={clsx(
        'bg-white rounded-xl p-4 shadow-sm',
        highlight ? highlightClasses[highlight] : '',
      )}
    >
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
      <p
        className={clsx(
          'mt-1 text-2xl font-bold tracking-tight',
          highlight === 'red' ? 'text-red-600' : 'text-gray-900',
        )}
      >
        {value}
      </p>
      {sub && (
        <p
          className={clsx(
            'mt-0.5 text-xs',
            trend === 'up' && 'text-emerald-600',
            trend === 'down' && 'text-red-600',
            (!trend || trend === 'neutral') && 'text-gray-500',
          )}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
