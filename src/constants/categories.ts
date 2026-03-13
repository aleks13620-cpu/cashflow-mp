export interface Category {
  id: string;
  label: string;
  emoji: string;
}

export const CATEGORIES: Category[] = [
  { id: 'rent', label: 'Аренда', emoji: '🏭' },
  { id: 'salary', label: 'Зарплата', emoji: '👥' },
  { id: 'logistics', label: 'Логистика', emoji: '🚚' },
  { id: 'marketing', label: 'Маркетинг', emoji: '📣' },
  { id: 'taxes', label: 'Налоги', emoji: '📋' },
  { id: 'goods', label: 'Закупка товара', emoji: '📦' },
  { id: 'software', label: 'Сервисы и ПО', emoji: '💻' },
  { id: 'bank', label: 'Банк и комиссии', emoji: '🏦' },
  { id: 'utilities', label: 'Коммунальные', emoji: '💡' },
  { id: 'other', label: 'Прочее', emoji: '📌' },
];

export function getCategoryLabel(id: string): string {
  const cat = CATEGORIES.find((c) => c.id === id);
  return cat ? `${cat.emoji} ${cat.label}` : id;
}
