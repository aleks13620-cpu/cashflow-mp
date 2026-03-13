import { clsx } from 'clsx';
import { useStore } from '../../store/useStore';
import type { Page } from '../../types';

const TAB_ITEMS: { page: Page; label: string; icon: string }[] = [
  { page: 'dashboard', label: 'Дашборд', icon: '📊' },
  { page: 'operations', label: 'Операции', icon: '📋' },
  { page: 'settings', label: 'Настройки', icon: '⚙️' },
];

export function BottomTabs() {
  const currentPage = useStore((s) => s.currentPage);
  const navigate = useStore((s) => s.navigate);

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex z-40"
      aria-label="Мобильная навигация"
    >
      {TAB_ITEMS.map((item) => (
        <button
          key={item.page}
          onClick={() => navigate(item.page)}
          className={clsx(
            'flex-1 flex flex-col items-center gap-0.5 py-2 text-xs font-medium transition-colors',
            currentPage === item.page ? 'text-blue-600' : 'text-gray-500',
          )}
          aria-current={currentPage === item.page ? 'page' : undefined}
        >
          <span className="text-xl">{item.icon}</span>
          {item.label}
        </button>
      ))}
    </nav>
  );
}
