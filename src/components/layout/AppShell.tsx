import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { AlertBanner } from './AlertBanner';
import { BottomTabs } from './BottomTabs';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <AlertBanner />
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6">
          {children}
        </main>
      </div>
      <BottomTabs />
    </div>
  );
}
