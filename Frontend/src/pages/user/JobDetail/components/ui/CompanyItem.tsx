import type { LucideIcon } from 'lucide-react';

interface Props {
  icon: LucideIcon;
  title: string;
  content: any;
}

const CompanyItem: React.FC<Props> = ({ icon: Icon, title, content }) => {
  return (
    <div className='flex gap-5'>
      <Icon className='text-primary' />
      <div className='flex flex-col gap-3'>
        <p className='font-semibold'>{title}</p>
        <p className='leading-5 text-gray-500'>{content}</p>
      </div>
    </div>
  );
};

export default CompanyItem;
