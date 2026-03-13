import { type InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

export function Checkbox({ label, className, id, ...props }: CheckboxProps) {
  const checkId = id ?? label.toLowerCase().replace(/\s+/g, '-');
  return (
    <label htmlFor={checkId} className={clsx('flex items-center gap-2 cursor-pointer', className)}>
      <input
        type="checkbox"
        id={checkId}
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        {...props}
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}
