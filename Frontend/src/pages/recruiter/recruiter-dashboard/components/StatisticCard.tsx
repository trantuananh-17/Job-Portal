import { TrendingUp, type LucideIcon } from 'lucide-react';
import Card from './ui/Card';

interface Props {
  title: string;
  value: number;
  icon: LucideIcon;
  color?: keyof typeof colorClasses;
}

const colorClasses = {
  blue: 'from-blue-500 to-blue-600',
  green: 'from-green-500 to-green-600',
  purple: 'from-purple-500 to-purple-600',
  orange: 'from-orange-500 to-orange-600'
};

const StatisticCard: React.FC<Props> = ({ color = 'blue', icon: Icon, title, value }) => {
  return (
    <Card className={`bg-gradient-to-br ${colorClasses[color]} border-0 text-white`}>
      <div className='flex items-center justify-between'>
        <div className=''>
          <p className='text-sm font-medium text-white/80'>{title}</p>
          <p className='mt-1 text-3xl font-bold'>{value}</p>
        </div>
        <div className='rounded-xl bg-white/20 p-3'>
          <Icon className='h-6 w-6' />
        </div>
      </div>
    </Card>
  );
};

export default StatisticCard;
