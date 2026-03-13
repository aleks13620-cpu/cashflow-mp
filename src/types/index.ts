export interface Settings {
  startBalance: number;
  startDate: string; // ISO date string YYYY-MM-DD
  alertThreshold: number; // warning level (e.g. 50000)
}

export interface Marketplace {
  id: string;
  name: string;
  payoutDays: number[]; // days of month [5, 20]
  avgAmount: number;
  color: string;
  enabled: boolean;
}

export interface Income {
  id: string;
  marketplaceId: string | null; // null = manual entry
  date: string; // ISO date YYYY-MM-DD
  amount: number;
  isActual: boolean; // false = planned only
  note: string;
}

export interface Expense {
  id: string;
  name: string;
  category: string;
  amount: number;
  isRecurring: boolean;
  recurringType?: 'monthly' | 'weekly';
  recurringDay?: number; // 1-28 for monthly
  weekday?: number; // 0=Sun..6=Sat for weekly
  date?: string; // ISO date for one-time
  note: string;
}

export interface IncomeEvent {
  id: string;
  label: string;
  amount: number;
  isActual: boolean;
  marketplaceId?: string | null;
}

export interface ExpenseEvent {
  id: string;
  label: string;
  category: string;
  amount: number;
}

export interface CashflowDay {
  date: string; // YYYY-MM-DD
  incomes: IncomeEvent[];
  expenses: ExpenseEvent[];
  totalIncome: number;
  totalExpense: number;
  balance: number; // running balance at end of day
}

export type AlertLevel = 'critical' | 'warning';

export interface Alert {
  level: AlertLevel;
  date: string;
  balance: number;
  daysAhead: number;
}

export type Page = 'dashboard' | 'operations' | 'settings';

export type ModalType = 'addIncome' | 'addExpense' | null;

export interface AppState {
  settings: Settings;
  marketplaces: Marketplace[];
  incomes: Income[];
  expenses: Expense[];
  currentPage: Page;
  modal: ModalType;
  editingId: string | null;
}
