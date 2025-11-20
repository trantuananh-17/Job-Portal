import { ChevronDown } from 'lucide-react';
import { useRef, useState } from 'react';
import { useClickOutside } from '@hooks/useClickOutside';

interface Option {
  key: string;
  label: string;
}

interface Props {
  label: string;
  options: Option[];
  paramKey: string;
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
  setValue: (name: string, value: any) => void;
}

const FilterDropdown: React.FC<Props> = ({ label, options, paramKey, searchParams, setSearchParams, setValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  const selectedKey = searchParams.get(paramKey) || 'all';
  const selectedLabel = options.find((opt) => opt.key === selectedKey)?.label || label;

  const handleSelect = (key: string) => {
    setValue(paramKey, key);
    const param = new URLSearchParams(searchParams);
    param.set(paramKey, key);
    setSearchParams(param);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className='relative min-w-[160px] sm:w-48'>
      <div
        className='flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2 hover:border-blue-400'
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className='text-sm text-gray-700'>{selectedLabel}</span>
        <ChevronDown className={`h-5 w-5 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <ul className='absolute top-[42px] left-0 z-10 w-full overflow-y-auto rounded-lg bg-white shadow-md'>
          {options.map((opt) => (
            <li
              key={opt.key}
              onClick={() => handleSelect(opt.key)}
              className={`cursor-pointer px-4 py-3 text-sm hover:bg-gray-100 ${
                selectedKey === opt.key ? 'bg-gray-200 font-semibold' : ''
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterDropdown;
