import { clsx } from 'clsx';
import { useStore } from '../../store/useStore';
import type { Page } from '../../types';

const NAV_ITEMS: { page: Page; label: string; icon: string }[] = [
  { page: 'dashboard', label: 'Дашборд', icon: '📊' },
  { page: 'operations', label: 'Операции', icon: '📋' },
  { page: 'settings', label: 'Настройки', icon: '⚙️' },
];

export function Sidebar() {
  const currentPage = useStore((s) => s.currentPage);
  const navigate = useStore((s) => s.navigate);

  return (
    <aside className="hidden md:flex flex-col w-56 bg-white border-r border-gray-200 shrink-0">
      <div className="px-4 py-5 border-b border-gray-200">
        <h1 className="text-lg font-bold text-gray-900">💰 CashFlow MP</h1>
        <p className="text-xs text-gray-500 mt-0.5">Кассовый разрыв</p>
      </div>
      <nav className="flex-1 p-3 space-y-1" aria-label="Основная навигация">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.page}
            onClick={() => navigate(item.page)}
            className={clsx(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left',
              currentPage === item.page
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100',
            )}
            aria-current={currentPage === item.page ? 'page' : undefined}
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
