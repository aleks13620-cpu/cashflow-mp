import { useStore } from '../../store/useStore';
import { Button } from '../ui/Button';

export function QuickActions() {
  const openModal = useStore((s) => s.openModal);

  return (
    <div className="flex gap-3">
      <Button onClick={() => openModal('addIncome')} variant="primary" size="sm">
        + Доход
      </Button>
      <Button onClick={() => openModal('addExpense')} variant="secondary" size="sm">
        + Расход
      </Button>
    </div>
  );
}
