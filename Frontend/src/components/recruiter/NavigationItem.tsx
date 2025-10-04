import type { LucideIcon } from 'lucide-react';

interface Props {
  item: {
    id: string;
    name: string;
    icon: LucideIcon;
  };
  isActive: boolean;
  isCollapsed: boolean;
  onClick: (id: string) => void;
}

const NavigationItem: React.FC<Props> = ({ item, isActive, isCollapsed, onClick }) => {
  const Icon = item.icon;

  return (
    <button
      onClick={() => onClick(item.id)}
      className={`group flex w-full cursor-pointer items-center rounded-lg px-3 py-4 text-sm font-medium transition-all duration-200 ${
        isActive
          ? 'bg-blue-50 text-blue-700 shadow-sm shadow-blue-50'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
      {!isCollapsed && <span className={`ml-3 ${isActive ? 'text-blue-700' : 'text-gray-700'}`}>{item.name}</span>}
    </button>
  );
};

export default NavigationItem;
