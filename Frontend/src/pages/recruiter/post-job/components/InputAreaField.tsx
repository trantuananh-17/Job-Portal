import type { LucideIcon } from 'lucide-react';

interface Props {
  label: string;
  placeholder?: string;
  icon: LucideIcon;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  row: number;
  helperText: string;
}

const InputAreaField: React.FC<Props> = ({ label, placeholder, value, onChange, error, row, helperText }) => {
  return (
    <div>
      <label className='block text-sm font-medium text-gray-700'>
        {label}
        <span className='text-lg text-red-500'>*</span>
      </label>
      <div className='relative'>
        <textarea
          value={value}
          onChange={onChange}
          rows={row}
          className='w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base transition-colors duration-200 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500'
          placeholder={placeholder}
          style={{ minHeight: '100px' }}
        />
      </div>

      {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}

      <p className='mt-2 text-sm text-gray-500'>{helperText}</p>
    </div>
  );
};

export default InputAreaField;
