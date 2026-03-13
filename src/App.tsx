import { useStore } from './store/useStore';
import { AppShell } from './components/layout/AppShell';
import { Dashboard } from './components/dashboard/Dashboard';
import { OperationsPage } from './components/operations/OperationsPage';
import { SettingsPage } from './components/settings/SettingsPage';
import { AddIncomeModal } from './components/modals/AddIncomeModal';
import { AddExpenseModal } from './components/modals/AddExpenseModal';

function App() {
  const currentPage = useStore((s) => s.currentPage);
  const modal = useStore((s) => s.modal);

  const page =
    currentPage === 'dashboard' ? (
      <Dashboard />
    ) : currentPage === 'operations' ? (
      <OperationsPage />
    ) : (
      <SettingsPage />
    );

  return (
    <>
      <AppShell>{page}</AppShell>
      {modal === 'addIncome' && <AddIncomeModal />}
      {modal === 'addExpense' && <AddExpenseModal />}
    </>
  );
}

export default App;
