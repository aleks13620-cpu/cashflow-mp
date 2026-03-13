import { useCashflow } from '../../hooks/useCashflow';
import { useStore } from '../../store/useStore';
import { formatRub } from '../../utils/format';
import { KpiCard } from './KpiCard';

export function KpiRow() {
  const { kpi, alert } = useCashflow();
  const settings = useStore((s) => s.settings);

  const isNegative = kpi.minBalance < 0;
  const isWarning = !isNegative && kpi.minBalance < settings.alertThreshold;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <KpiCard
        label="Мин. баланс (90 дн.)"
        value={formatRub(kpi.minBalance)}
        sub={isNegative ? 'Критический разрыв!' : isWarning ? 'Ниже порога' : 'В норме'}
        trend={isNegative || isWarning ? 'down' : 'neutral'}
        highlight={isNegative ? 'red' : isWarning ? 'yellow' : 'green'}
      />
      <KpiCard
        label="Макс. баланс (90 дн.)"
        value={formatRub(kpi.maxBalance)}
        highlight="blue"
      />
      <KpiCard
        label="Доходы (90 дн.)"
        value={formatRub(kpi.totalIncome90)}
        trend="up"
        highlight="green"
      />
      <KpiCard
        label="Расходы (90 дн.)"
        value={formatRub(kpi.totalExpense90)}
        sub={alert ? `Разрыв: ${formatRub(kpi.minBalance)}` : undefined}
        trend={alert ? 'down' : 'neutral'}
        highlight={alert?.level === 'critical' ? 'red' : alert?.level === 'warning' ? 'yellow' : undefined}
      />
    </div>
  );
}
