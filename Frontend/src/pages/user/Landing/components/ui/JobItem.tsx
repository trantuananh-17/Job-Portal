import { BookmarkPlus, BriefcaseBusiness, MapPin, Wallet } from 'lucide-react';
import LOGO_COMPANY from '@assets/images/logo_company_1.png';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const JobItem = () => {
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
            <h3 className='text-xl font-semibold md:text-[28px]'>Forward Security Director</h3>
            <p className='sm:text-md text-xs lg:text-lg'>Bauch, Schuppe and Schulist Co</p>
          </div>
        </div>
      </div>

      <div className='text-primary flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between'>
        <ul className='flex flex-col gap-6 md:flex-row'>
          <li className='flex items-center gap-3'>
            <BriefcaseBusiness />
            <p>Backend</p>
          </li>
          <li className='flex items-center gap-3'>
            <Wallet />
            <p>$1000 - $2000</p>
          </li>
          <li className='flex items-center gap-3'>
            <MapPin />
            <p>New-York, USA</p>
          </li>
        </ul>
        <div className='sm:self-end'>
          <Button name='Job Details' full={false} onClick={() => navigate('/job-detail')} />
        </div>
      </div>
    </li>
  );
};

export default JobItem;
