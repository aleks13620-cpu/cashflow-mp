import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Settings, Marketplace, Income, Expense, Page, ModalType } from '../types';
import {
  DEMO_SETTINGS,
  DEMO_MARKETPLACES,
  DEMO_INCOMES,
  DEMO_EXPENSES,
} from '../constants/demoData';

interface StoreState {
  settings: Settings;
  marketplaces: Marketplace[];
  incomes: Income[];
  expenses: Expense[];
  currentPage: Page;
  modal: ModalType;
  editingId: string | null;

  // Settings actions
  updateSettings: (patch: Partial<Settings>) => void;

  // Marketplace CRUD
  addMarketplace: (mp: Marketplace) => void;
  updateMarketplace: (mp: Marketplace) => void;
  deleteMarketplace: (id: string) => void;

  // Income CRUD
  addIncome: (income: Income) => void;
  updateIncome: (income: Income) => void;
  deleteIncome: (id: string) => void;

  // Expense CRUD
  addExpense: (expense: Expense) => void;
  updateExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;

  // Navigation
  navigate: (page: Page) => void;

  // Modal
  openModal: (type: ModalType, editingId?: string) => void;
  closeModal: () => void;

  // Reset
  resetToDemo: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      settings: DEMO_SETTINGS,
      marketplaces: DEMO_MARKETPLACES,
      incomes: DEMO_INCOMES,
      expenses: DEMO_EXPENSES,
      currentPage: 'dashboard',
      modal: null,
      editingId: null,

      updateSettings: (patch) =>
        set((s) => ({ settings: { ...s.settings, ...patch } })),

      addMarketplace: (mp) =>
        set((s) => ({ marketplaces: [...s.marketplaces, mp] })),
      updateMarketplace: (mp) =>
        set((s) => ({ marketplaces: s.marketplaces.map((m) => (m.id === mp.id ? mp : m)) })),
      deleteMarketplace: (id) =>
        set((s) => ({ marketplaces: s.marketplaces.filter((m) => m.id !== id) })),

      addIncome: (income) =>
        set((s) => ({ incomes: [...s.incomes, income] })),
      updateIncome: (income) =>
        set((s) => ({ incomes: s.incomes.map((i) => (i.id === income.id ? income : i)) })),
      deleteIncome: (id) =>
        set((s) => ({ incomes: s.incomes.filter((i) => i.id !== id) })),

      addExpense: (expense) =>
        set((s) => ({ expenses: [...s.expenses, expense] })),
      updateExpense: (expense) =>
        set((s) => ({ expenses: s.expenses.map((e) => (e.id === expense.id ? expense : e)) })),
      deleteExpense: (id) =>
        set((s) => ({ expenses: s.expenses.filter((e) => e.id !== id) })),

      navigate: (page) => set({ currentPage: page }),

      openModal: (type, editingId = undefined) => set({ modal: type, editingId: editingId ?? null }),
      closeModal: () => set({ modal: null, editingId: null }),

      resetToDemo: () =>
        set({
          settings: DEMO_SETTINGS,
          marketplaces: DEMO_MARKETPLACES,
          incomes: DEMO_INCOMES,
          expenses: DEMO_EXPENSES,
        }),
    }),
    {
      name: 'cashflow-mp-v1',
    },
  ),
);
