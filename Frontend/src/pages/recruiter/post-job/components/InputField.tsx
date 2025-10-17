import type { LucideIcon } from 'lucide-react';
import React from 'react';
interface Props {
  label: string;
  placeholder?: string;
  icon: LucideIcon;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type: 'text' | 'number';
}

const InputField: React.FC<Props> = ({ label, placeholder, icon: Icon, value, onChange, error, type }) => {
  return (
    <div>
      <label className='block text-sm font-medium text-gray-700'>
        {label}
        <span className='text-lg text-red-500'>*</span>
      </label>
      <div className='relative'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
          <Icon className='h-5 w-5 text-gray-500' />
        </div>
        <input
          type={type}
          value={value}
          onChange={onChange}
          className='w-full rounded-lg border border-gray-300 py-2.5 pr-3 pl-10 text-base transition-colors duration-200 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500'
          // placeholder='e.g., 132/12, Nguyên xá, Hà Nội'
          placeholder={placeholder}
        />
      </div>

      {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
    </div>
  );
};

export default InputField;
