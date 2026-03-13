import { CATEGORIES } from '../../constants/categories';

export type FilterType = 'all' | 'income' | 'expense';

export interface Filters {
  dateFrom: string;
  dateTo: string;
  type: FilterType;
  category: string;
}

interface OperationsFiltersProps {
  filters: Filters;
  onChange: (f: Filters) => void;
}

const TYPE_OPTIONS = [
  { value: 'all', label: 'Все' },
  { value: 'income', label: 'Доходы' },
  { value: 'expense', label: 'Расходы' },
];

const CATEGORY_OPTIONS = [
  { value: '', label: 'Все категории' },
  ...CATEGORIES.map((c) => ({ value: c.id, label: `${c.emoji} ${c.label}` })),
];

export function OperationsFilters({ filters, onChange }: OperationsFiltersProps) {
  function set(patch: Partial<Filters>) {
    onChange({ ...filters, ...patch });
  }

  return (
    <div className="flex flex-wrap gap-2 items-end">
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500">С</label>
        <input
          type="date"
          value={filters.dateFrom}
          onChange={(e) => set({ dateFrom: e.target.value })}
          className="rounded-lg border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Дата от"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500">По</label>
        <input
          type="date"
          value={filters.dateTo}
          onChange={(e) => set({ dateTo: e.target.value })}
          className="rounded-lg border border-gray-300 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Дата до"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500">Тип</label>
        <select
          value={filters.type}
          onChange={(e) => set({ type: e.target.value as FilterType })}
          className="rounded-lg border border-gray-300 px-2 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Тип операции"
        >
          {TYPE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500">Категория</label>
        <select
          value={filters.category}
          onChange={(e) => set({ category: e.target.value })}
          className="rounded-lg border border-gray-300 px-2 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Категория расхода"
        >
          {CATEGORY_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
