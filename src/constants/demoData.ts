import type { Settings, Marketplace, Income, Expense } from '../types';

/**
 * Demo scenario: "Сергей"
 * Seller on Ozon + WB. Faces a cashflow gap on 2025-04-28 due to НДС payment.
 */

export const DEMO_SETTINGS: Settings = {
  startBalance: 80_000,
  startDate: '2025-04-01',
  alertThreshold: 50_000,
};

export const DEMO_MARKETPLACES: Marketplace[] = [
  {
    id: 'mp-ozon',
    name: 'Ozon',
    payoutDays: [5, 20],
    avgAmount: 120_000,
    color: '#3B82F6',
    enabled: true,
  },
  {
    id: 'mp-wb',
    name: 'Wildberries',
    payoutDays: [10, 25],
    avgAmount: 90_000,
    color: '#8B5CF6',
    enabled: true,
  },
  {
    id: 'mp-ym',
    name: 'Яндекс Маркет',
    payoutDays: [15],
    avgAmount: 55_000,
    color: '#F59E0B',
    enabled: true,
  },
];

export const DEMO_INCOMES: Income[] = [
  // Some actual confirmed payouts in May
  {
    id: 'inc-1',
    marketplaceId: 'mp-ozon',
    date: '2025-05-05',
    amount: 135_000,
    isActual: true,
    note: 'Фактическое поступление Ozon',
  },
  {
    id: 'inc-2',
    marketplaceId: 'mp-wb',
    date: '2025-05-10',
    amount: 98_000,
    isActual: true,
    note: 'Фактическое поступление WB',
  },
];

export const DEMO_EXPENSES: Expense[] = [
  // Monthly: аренда склада — 1-го числа
  {
    id: 'exp-rent',
    name: 'Аренда склада',
    category: 'rent',
    amount: 45_000,
    isRecurring: true,
    recurringType: 'monthly',
    recurringDay: 1,
    note: 'Ежемесячная аренда',
  },
  // Monthly: зарплата — 10-го числа
  {
    id: 'exp-salary',
    name: 'Зарплата сотрудников',
    category: 'salary',
    amount: 80_000,
    isRecurring: true,
    recurringType: 'monthly',
    recurringDay: 10,
    note: '2 сотрудника склада',
  },
  // Weekly: логистика — каждый понедельник (weekday=1)
  {
    id: 'exp-logistics',
    name: 'Логистика / доставка',
    category: 'logistics',
    amount: 12_000,
    isRecurring: true,
    recurringType: 'weekly',
    weekday: 1,
    note: 'Еженедельная отгрузка',
  },
  // Monthly: реклама — 15-го числа
  {
    id: 'exp-marketing',
    name: 'Реклама маркетплейсов',
    category: 'marketing',
    amount: 25_000,
    isRecurring: true,
    recurringType: 'monthly',
    recurringDay: 15,
    note: 'Платные продвижения',
  },
  // One-time: НДС платёж 28 апреля — КРИТИЧЕСКИЙ
  {
    id: 'exp-nds',
    name: 'НДС (1 кв. 2025)',
    category: 'taxes',
    amount: 380_000,
    isRecurring: false,
    date: '2025-04-28',
    note: 'Квартальный платёж НДС — КРИТИЧНО!',
  },
  // Monthly: подписки и сервисы — 1-го
  {
    id: 'exp-software',
    name: 'Сервисы и подписки',
    category: 'software',
    amount: 8_000,
    isRecurring: true,
    recurringType: 'monthly',
    recurringDay: 1,
    note: 'CRM, аналитика, ПО',
  },
];
