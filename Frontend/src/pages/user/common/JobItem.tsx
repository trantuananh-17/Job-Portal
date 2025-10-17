import { BookmarkPlus, BriefcaseBusiness, MapPin, Wallet } from 'lucide-react';
import LOGO_COMPANY from '@assets/images/logo_company_1.png';
// import Button from '../Landing/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import type { IJobByCandidateResponse } from '@apis/jobs/interfaces/job.interface';
import Button from './Button';

interface Props {
  job: IJobByCandidateResponse;
}

const JobItem: React.FC<Props> = ({ job }) => {
  const navigate = useNavigate();

  return (
    <li className='flex flex-col gap-7 rounded-[20px] p-10 shadow-md'>
      <div className='flex flex-col gap-6'>
        <div className='flex justify-between'>
          <div className='bg-primary-light w-fit gap-2.5 rounded-xl p-2'>
            <p className='text-primary'>10 min ago</p>
          </div>
          <BookmarkPlus className='text-primary' />
        </div>
        <div className='flex flex-col items-start gap-5 md:flex-row md:items-center'>
          <img src={LOGO_COMPANY} alt='logo company' className='image h-10 w-10' />

          <div className='flex flex-col gap-2'>
            <h3 className='text-xl font-semibold md:text-[28px]'>{job.title}</h3>
            <p className='sm:text-md text-sm lg:text-lg'>{job.company.name}</p>
          </div>
        </div>
      </div>

      <div className='text-primary flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between'>
        <ul className='flex flex-col gap-6 md:flex-row'>
          <li className='flex items-center gap-2'>
            <BriefcaseBusiness />
            <p className='text-md sm:text-lg'>{job.jobRole}</p>
          </li>
          <li className='flex items-center gap-2'>
            <Wallet />
            <p className='text-sm sm:text-lg'>
              {job.minSalary} - {job.maxSalary}
            </p>
          </li>
          <li className='flex items-center gap-2'>
            <MapPin />
            <p className='text-md sm:text-lg'>{job.company.address}</p>
          </li>
        </ul>
        <div className='sm:self-end'>
          <Button name='Job Details' className='bg-primary' full={false} onClick={() => navigate('/job-detail')} />
        </div>
      </div>
    </li>
  );
};

export default JobItem;
