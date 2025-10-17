import { type LucideIcon } from 'lucide-react';

interface Props {
  title: string;
  description: string;
  icon: LucideIcon;
}

const ErrorState: React.FC<Props> = ({ title, description, icon: Icon }) => {
  return (
    <div className={`flex flex-col items-center py-12 text-center`}>
      {/* Icon */}
      <div className='mb-4'>
        <Icon className='h-12 w-12 text-red-500' />
      </div>

      {/* Title */}
      <h3 className='mb-2 text-lg font-semibold text-neutral-800 dark:text-neutral-200'>{title}</h3>

      {/* Description */}
      {description && (
        <p className='sm:text-md mb-6 max-w-md text-sm text-neutral-600 dark:text-neutral-400'>{description}</p>
      )}
    </div>
  );
};

export default ErrorState;
