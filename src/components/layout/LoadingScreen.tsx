export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      <div className="text-4xl mb-4 animate-pulse">💰</div>
      <p className="text-gray-500 text-sm">Загрузка CashFlow MP...</p>
    </div>
  );
}
