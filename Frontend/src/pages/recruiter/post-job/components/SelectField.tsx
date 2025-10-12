import { ChevronDown, Menu } from 'lucide-react';
import { useState } from 'react';

interface Props {
  value: string;
  menu: string[];
  onChange: (value: string) => void;
  error?: string;
}

const SelectField: React.FC<Props> = ({ value, onChange, menu, error }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative'>
      <label className='block text-sm font-medium text-gray-700'>
        Job Role<span className='text-lg text-red-500'>*</span>
      </label>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-3 rounded-lg border border-gray-300 px-3 py-2.5'
      >
        <Menu className='h-5 w-5 shrink-0 text-gray-600' />
        <p className='w-full text-gray-600'>{value || 'Choose level'}</p>
        <ChevronDown className={`h-5 w-5 shrink-0 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}

      {isOpen && (
        <ul className='absolute z-10 max-h-[400px] w-full overflow-auto rounded-lg bg-white shadow-md'>
          {menu.map((item) => (
            <li
              key={item}
              onClick={() => {
                onChange(item);
                setIsOpen(false);
              }}
              className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${value === item ? 'bg-gray-200 font-semibold' : ''}`}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectField;
