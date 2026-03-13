import { useStore } from '../../store/useStore';
import type { Page } from '../../types';

const PAGE_TITLES: Record<Page, string> = {
  dashboard: 'Дашборд',
  operations: 'Операции',
  settings: 'Настройки',
};

export function Header() {
  const currentPage = useStore((s) => s.currentPage);

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center">
      <h2 className="text-lg font-semibold text-gray-900">{PAGE_TITLES[currentPage]}</h2>
    </header>
  );
}
