import { Briefcase } from 'lucide-react';
import moment from 'moment';

interface Job {
  id: number;
  title: string;
  location: string;
  createdAt: string;
  isClosed: boolean;
}

interface Props {
  job: Job;
}

const JobDashboardCard: React.FC<Props> = ({ job }) => {
  return (
    <div className='flex items-center justify-between rounded-xl border border-gray-100 p-4 transition-colors duration-200 hover:border-gray-200'>
      <div className='flex items-center space-x-4'>
        <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100'>
          <Briefcase className='h-5 w-5 text-blue-600' />
        </div>
        <div className='flex flex-col gap-2'>
          <h4 className='text-[15px] font-medium text-gray-900'>{job.title}</h4>
          <p className='text-xs text-gray-500'>
            {job.location} • {moment(job.createdAt)?.format('Do MM YYYY')}
          </p>
        </div>
      </div>
      <div className='flex items-center space-x-3'>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            !job.isClosed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-red-600'
          }`}
        >
          {job.isClosed ? 'Closed' : 'Active'}
        </span>
      </div>
    </div>
  );
};

export default JobDashboardCard;
