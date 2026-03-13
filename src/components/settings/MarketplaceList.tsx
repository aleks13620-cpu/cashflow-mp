import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { formatRub } from '../../utils/format';
import { Button } from '../ui/Button';
import { MarketplaceForm } from './MarketplaceForm';
import type { Marketplace } from '../../types';

export function MarketplaceList() {
  const marketplaces = useStore((s) => s.marketplaces);
  const deleteMarketplace = useStore((s) => s.deleteMarketplace);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">Маркетплейсы</h3>
        <Button size="sm" variant="secondary" onClick={() => setShowAdd(true)}>
          + Добавить
        </Button>
      </div>

      {showAdd && (
        <MarketplaceForm onDone={() => setShowAdd(false)} />
      )}

      {marketplaces.length === 0 && !showAdd && (
        <div className="text-center py-8 text-gray-400 text-sm">
          <span className="text-3xl block mb-2">🏪</span>
          Маркетплейсы не добавлены
        </div>
      )}

      <div className="space-y-2">
        {marketplaces.map((mp: Marketplace) =>
          editingId === mp.id ? (
            <MarketplaceForm
              key={mp.id}
              initial={mp}
              onDone={() => setEditingId(null)}
            />
          ) : (
            <div
              key={mp.id}
              className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: mp.color }}
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{mp.name}</p>
                  <p className="text-xs text-gray-500">
                    Дни: {mp.payoutDays.join(', ')} · {formatRub(mp.avgAmount)} / выплата
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={() => setEditingId(mp.id)}>
                  Ред.
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    if (confirm(`Удалить маркетплейс "${mp.name}"?`)) {
                      deleteMarketplace(mp.id);
                    }
                  }}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  Удал.
                </Button>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
