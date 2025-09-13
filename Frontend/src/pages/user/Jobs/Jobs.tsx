import { datePostItem, jobRoleItem } from '@constant/menuItem';
import RangeSliderMUI from './components/RangeSliderMUI';
import { ChevronDown, MapPin, Search } from 'lucide-react';

const Jobs = () => {
  return (
    <>
      <section className='bg-black pt-[140px] pb-20'>
        <h2 className='text-center text-[60px] font-semibold text-white'>Jobs</h2>
      </section>

      <section className='container mt-10 flex gap-6'>
        <div className='bg-secondary flex flex-col gap-6 rounded-[20px] px-5 py-10 filter'>
          <div className='flex flex-col gap-5'>
            <h3 className='text-[20px] font-semibold'>Search by Job</h3>
            <div className='flex gap-3 rounded-xl bg-white px-3 py-[10px]'>
              <Search className='h-5 w-5 shrink-0 text-gray-600' />
              <input placeholder='Job title, skill, role,...' className='focus:outline-none' />
            </div>
          </div>

          <div className='flex flex-col gap-5'>
            <h3 className='text-[20px] font-semibold'>Location</h3>
            <div className='flex justify-between gap-3 rounded-xl bg-white px-3 py-[10px]'>
              <div className='flex items-center gap-3'>
                <MapPin className='h-5 w-5 shrink-0 text-gray-600' />
                <p className='text-gray-600'>Choose city</p>
              </div>
              <ChevronDown className='h-5 w-5 shrink-0 text-gray-600' />
            </div>
          </div>

          <div className='flex flex-col gap-5'>
            <h3 className='text-[20px] font-semibold'>Job Role</h3>
            <ul className='flex flex-col gap-3'>
              {jobRoleItem.map((item) => (
                <li className='flex items-center gap-2'>
                  <input type='checkbox' className='h-4 w-4 rounded-[4px]' />
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className='flex flex-col gap-5'>
            <h3 className='text-[20px] font-semibold'>Date Posted</h3>
            <ul className='flex flex-col gap-3'>
              {datePostItem.map((item) => (
                <li className='flex items-center gap-2'>
                  <input type='checkbox' className='h-4 w-4 rounded-[4px]' />
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <RangeSliderMUI />
          </div>
        </div>
        <div className='jobs'>
          <div className='sort'></div>
          <div className='jobs-list'></div>
          <div className='navigation'></div>
        </div>
      </section>
    </>
  );
};

export default Jobs;
