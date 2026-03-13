import { KpiRow } from './KpiRow';
import { BalanceChart } from './BalanceChart';
import { QuickActions } from './QuickActions';

export function Dashboard() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm text-gray-500">Прогноз на 90 дней</h3>
        <QuickActions />
      </div>
      <KpiRow />
      <BalanceChart />
    </div>
  );
}
