import { BookmarkPlus, BriefcaseBusiness, Clock, MapPin, Wallet } from 'lucide-react';
import LOGO_COMPANY from '@assets/images/logo_company_1.png';
import Button from './Button';

const JobItem = () => {
  return (
    <li className='flex flex-col gap-7 rounded-[20px] p-10 shadow-md'>
      <div className='flex flex-col gap-6'>
        <div className='flex justify-between'>
          <div className='bg-primary-light w-fit gap-2.5 rounded-xl p-2'>
            <p className='text-primary'>10 min ago</p>
          </div>
          <BookmarkPlus className='text-primary' />
        </div>
        <div className='flex items-start gap-5'>
          <img src={LOGO_COMPANY} alt='logo company' className='image h-10 w-10' />

          <div className='flex flex-col gap-5'>
            <h3 className='text-[28px] font-semibold'>Forward Security Director</h3>
            <p>Bauch, Schuppe and Schulist Co</p>
          </div>
        </div>
      </div>

      <div className='text-primary flex items-end justify-between'>
        <ul className='flex gap-6'>
          <li className='flex items-center gap-3'>
            <BriefcaseBusiness />
            <p>Backend</p>
          </li>
          <li className='flex items-center gap-3'>
            <Clock />
            <p>Full time</p>
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
        <Button name='Job Details' />
      </div>
    </li>
  );
};

export default JobItem;
