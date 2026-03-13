import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { OperationsFilters, type Filters } from './OperationsFilters';
import { OperationsTable } from './OperationsTable';
import { Button } from '../ui/Button';

export function OperationsPage() {
  const settings = useStore((s) => s.settings);
  const openModal = useStore((s) => s.openModal);

  const [filters, setFilters] = useState<Filters>({
    dateFrom: '',
    dateTo: '',
    type: 'all',
    category: '',
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <OperationsFilters filters={filters} onChange={setFilters} />
        <div className="flex gap-2">
          <Button size="sm" onClick={() => openModal('addIncome')}>
            + Доход
          </Button>
          <Button size="sm" variant="secondary" onClick={() => openModal('addExpense')}>
            + Расход
          </Button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <OperationsTable filters={filters} />
      </div>
      <p className="text-xs text-gray-400 text-right">
        Прогноз от {settings.startDate} · 90 дней
      </p>
    </div>
  );
}
