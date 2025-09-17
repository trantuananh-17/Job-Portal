import { datePostItem, jobRoleItem } from '@constant/menuItem';
import RangeSliderMUI from './components/RangeSliderMUI';
import { ChevronDown, MapPin, Search } from 'lucide-react';
import JobItem from '../Landing/components/ui/JobItem';

const Jobs = () => {
  return (
    <>
      <section className='bg-black pt-[140px] pb-20'>
        <h2 className='text-center text-[60px] font-semibold text-white'>Jobs</h2>
      </section>

      <section className='container mt-10 mb-[100px] flex items-start gap-6'>
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
        <div className='jobs flex flex-1 flex-col gap-10'>
          <div className='sort flex items-center justify-between'>
            <h3>Showing 6-6 of 10 results</h3>
            <div className='flex shrink-0 items-center justify-between gap-[11px] rounded-[6px] border-[1.5px] border-gray-500 px-2 py-3'>
              <p className='text-[20px] font-semibold text-gray-500'>Sort by latest</p>
              <ChevronDown className='h-6 w-6 text-gray-500' />
            </div>
          </div>
          <div className='jobs-list'>
            <JobItem />
            <JobItem />
            <JobItem />
            <JobItem />
            <JobItem />
            <JobItem />
          </div>
          <div className='navigation'></div>
        </div>
      </section>

      <section className='top-company bg-secondary flex flex-col items-center justify-center gap-[60px] pt-[60px] pb-[120px]'>
        <div className='flex flex-col items-center justify-center gap-10'>
          <h2 className='text-[50px] font-bold'>Top Company</h2>
          <p>Some of the leading companies driving innovation and success.</p>
        </div>
      </section>
    </>
  );
};

export default Jobs;
