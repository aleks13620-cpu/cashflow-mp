import { useStore } from './store/useStore';
import { AppShell } from './components/layout/AppShell';
import { Dashboard } from './components/dashboard/Dashboard';
import { OperationsPage } from './components/operations/OperationsPage';
import { SettingsPage } from './components/settings/SettingsPage';

function App() {
  const currentPage = useStore((s) => s.currentPage);

  const page =
    currentPage === 'dashboard' ? (
      <Dashboard />
    ) : currentPage === 'operations' ? (
      <OperationsPage />
    ) : (
      <SettingsPage />
    );

  return <AppShell>{page}</AppShell>;
}

export default App;
