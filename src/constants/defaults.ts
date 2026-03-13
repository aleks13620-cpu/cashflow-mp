import type { Settings } from '../types';

export const DEFAULT_SETTINGS: Settings = {
  startBalance: 0,
  startDate: new Date().toISOString().slice(0, 10),
  alertThreshold: 50000,
};

export const CASHFLOW_DAYS = 90;

export const MARKETPLACE_COLORS = [
  '#3B82F6', // blue
  '#8B5CF6', // violet
  '#EC4899', // pink
  '#F59E0B', // amber
  '#10B981', // emerald
  '#EF4444', // red
  '#06B6D4', // cyan
];
