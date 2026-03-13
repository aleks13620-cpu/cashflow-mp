import { useStore } from '../../store/useStore';
import { GeneralSettings } from './GeneralSettings';
import { MarketplaceList } from './MarketplaceList';
import { RecurringList } from './RecurringList';
import { Button } from '../ui/Button';

export function SettingsPage() {
  const resetToDemo = useStore((s) => s.resetToDemo);

  function handleReset() {
    if (confirm('Сбросить все данные к демо-сценарию Сергея?')) {
      resetToDemo();
    }
  }

  return (
    <div className="space-y-4 max-w-3xl">
      <GeneralSettings />
      <MarketplaceList />
      <RecurringList />
      <div className="flex justify-end pt-2">
        <Button variant="danger" size="sm" onClick={handleReset}>
          Сбросить к демо
        </Button>
      </div>
    </div>
  );
}
