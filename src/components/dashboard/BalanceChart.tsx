import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ReferenceArea,
  ResponsiveContainer,
} from 'recharts';
import { useCashflow } from '../../hooks/useCashflow';
import { useStore } from '../../store/useStore';
import { formatRub, formatDateShort } from '../../utils/format';
import type { CashflowDay } from '../../types';

interface TooltipProps {
  active?: boolean;
  payload?: { payload: CashflowDay }[];
  label?: string;
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const day = payload[0].payload;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm min-w-48">
      <p className="font-semibold text-gray-900 mb-2">{formatDateShort(day.date)}</p>
      <div className="space-y-1">
        {day.incomes.map((inc) => (
          <div key={inc.id} className="flex justify-between gap-4 text-emerald-600">
            <span className="truncate max-w-32">{inc.label}</span>
            <span className="font-medium shrink-0">+{formatRub(inc.amount)}</span>
          </div>
        ))}
        {day.expenses.map((exp) => (
          <div key={exp.id} className="flex justify-between gap-4 text-red-600">
            <span className="truncate max-w-32">{exp.label}</span>
            <span className="font-medium shrink-0">-{formatRub(exp.amount)}</span>
          </div>
        ))}
        <div className="pt-1 mt-1 border-t border-gray-100 flex justify-between font-semibold text-gray-900">
          <span>Баланс</span>
          <span className={day.balance < 0 ? 'text-red-600' : ''}>{formatRub(day.balance)}</span>
        </div>
      </div>
    </div>
  );
}

function formatYAxis(value: number): string {
  if (Math.abs(value) >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (Math.abs(value) >= 1000) return `${(value / 1000).toFixed(0)}k`;
  return String(value);
}

export function BalanceChart() {
  const { cashflow } = useCashflow();
  const settings = useStore((s) => s.settings);

  const threshold = settings.alertThreshold;
  const minBalance = Math.min(...cashflow.map((d) => d.balance));
  const yMin = Math.min(minBalance, 0);

  // Show every 7th date on X axis
  const ticks = cashflow.filter((_, i) => i % 7 === 0).map((d) => d.date);

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Кассовый баланс — 90 дней</h3>
      <div className="overflow-x-auto">
        <div style={{ minWidth: 600 }}>
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={cashflow} margin={{ top: 8, right: 16, bottom: 0, left: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                ticks={ticks}
                tickFormatter={formatDateShort}
                tick={{ fontSize: 11, fill: '#6b7280' }}
              />
              <YAxis
                tickFormatter={formatYAxis}
                tick={{ fontSize: 11, fill: '#6b7280' }}
                domain={[yMin * 1.1, 'auto']}
              />
              <Tooltip content={<CustomTooltip />} />

              {/* Red zone: balance < 0 */}
              <ReferenceArea y1={yMin * 1.1} y2={0} fill="#fee2e2" fillOpacity={0.6} />

              {/* Yellow zone: 0 .. threshold */}
              {threshold > 0 && (
                <ReferenceArea y1={0} y2={threshold} fill="#fef9c3" fillOpacity={0.5} />
              )}

              {/* Zero line */}
              <ReferenceLine y={0} stroke="#ef4444" strokeWidth={1.5} strokeDasharray="4 2" />

              {/* Alert threshold line */}
              {threshold > 0 && (
                <ReferenceLine
                  y={threshold}
                  stroke="#f59e0b"
                  strokeWidth={1.5}
                  strokeDasharray="4 2"
                  label={{ value: `Порог ${formatRub(threshold)}`, position: 'right', fontSize: 10, fill: '#b45309' }}
                />
              )}

              <Line
                type="monotone"
                dataKey="balance"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: '#3b82f6' }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
