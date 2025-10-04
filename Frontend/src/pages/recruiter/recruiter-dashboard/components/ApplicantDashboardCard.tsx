import { Clock } from 'lucide-react';
import moment from 'moment';

interface Candidate {
  id: number;
  applicant: {
    name: string;
  };
  position: string;
  time: string;
}

interface Props {
  candidate: Candidate;
}

const ApplicantDashboardCard: React.FC<Props> = ({ candidate }) => {
  return (
    <div className='flex items-center justify-between rounded-xl border border-gray-100 p-4 transition-colors duration-200 hover:border-gray-200'>
      <div className='flex items-center space-x-4'>
        <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-400 to-indigo-500'>
          <span className='text-sm font-medium text-white'>
            {candidate.applicant.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </span>
        </div>
        <div className='flex flex-col gap-2'>
          <h4 className='text-[15px] font-medium text-gray-900'>{candidate.applicant.name}</h4>
          <p className='text-xs text-gray-500'>{candidate.position}</p>
        </div>
      </div>
      <div className='flex items-center space-x-3'>
        <div className='flex items-center text-xs text-gray-500'>
          <Clock className='mr-1 h-3 w-3' />
          {moment(candidate.time, 'YYYY-MM-DD HH:mm').fromNow()}
        </div>
      </div>
    </div>
  );
};

export default ApplicantDashboardCard;
