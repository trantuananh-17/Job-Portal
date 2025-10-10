import { datePostItem, jobRoleItem } from '@constant/menuItem';
import RangeSliderMUI from './components/RangeSliderMUI';
import { ChevronDown, MapPin, Search } from 'lucide-react';
import JobCardSkeleton from '@components/common/JobCardSkeleton';
import { Pagination, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import usePagination from '@hooks/usePagination';
import { useSearchParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import type { IJobFilter } from '@apis/jobs/interfaces/job.interface';
import { ADDRESS_LOCATION } from '@utils/data';
import { SALARY_VALUE } from '@constant/rangeValue';

const Jobs = () => {
  const isMobile = useMediaQuery('(max-width:640px)');
  const [searchParams, setSearchParams] = useSearchParams();
  const [isCityOpen, setIsCityOpen] = useState(false);

  const { register, handleSubmit, watch, control, setValue } = useForm<IJobFilter>({
    defaultValues: { search: '' }
  });

  const [location, setLocation] = useState('');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  const { pagination, jumpToPage } = usePagination({
    totalDocs: 100,
    totalPages: 20,
    currentPage: 1,
    limit: 5
  });

  // Change pagination
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    jumpToPage(value);
    const params = new URLSearchParams(searchParams);
    params.set('page', `${value}`);
    setSearchParams(params);
  };

  // Set default page on load
  useEffect(() => {
    if (!searchParams.get('page')) {
      setSearchParams({ page: '1' });
    }
  }, [searchParams, setSearchParams]);

  //get params url
  const currentPage = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';

  useEffect(() => {
    setValue('search', search);
  }, [search]);

  const handleApplyFilter = handleSubmit((data) => {
    const params = new URLSearchParams(searchParams);

    if (data.search) {
      params.set('search', data.search);
    } else {
      params.delete('search');
    }

    if (data.location) params.set('location', data.location);
    else params.delete('location');

    if (data.roles.length > 0) params.set('roles', data.roles.join(','));
    else params.delete('roles');

    if (data.datePosted.length > 0) params.set('dates', data.datePosted.join(','));
    else params.delete('dates');

    if (data.salaryRange?.length === 2) {
      params.set('min', String(data.salaryRange[0]));
      params.set('max', String(data.salaryRange[1]));
    }

    params.set('page', '1');
    setSearchParams(params);
  });

  return (
    <>
      <section className='bg-black pt-[140px] pb-20'>
        <h2 className='text-center text-[60px] font-semibold text-white'>Jobs</h2>
      </section>

      <section className='container mt-10 mb-15 flex flex-col gap-6 sm:mb-[100px] md:items-center lg:flex-row lg:items-start'>
        {/* filter */}
        <form
          onSubmit={handleApplyFilter}
          className='bg-secondary flex flex-col gap-6 rounded-[20px] px-5 py-10 filter md:grid md:grid-cols-2 lg:flex'
        >
          <div className='flex flex-col gap-5'>
            <h3 className='text-[20px] font-semibold'>Search by Job</h3>
            <div className='flex gap-3 rounded-xl bg-white px-3 py-[10px]'>
              <Search className='h-5 w-5 shrink-0 text-gray-600' />
              <input {...register('search')} placeholder='Job title, skill, role,...' className='focus:outline-none' />
            </div>
          </div>

          {/* location filter */}
          <div className='relative flex flex-col gap-2'>
            <h3 className='text-[20px] font-semibold'>Location</h3>
            <div
              className='flex cursor-pointer items-center justify-between gap-3 rounded-xl bg-white px-3 py-[10px]'
              onClick={() => setIsCityOpen((prev) => !prev)}
            >
              <div className='flex items-center gap-3'>
                <MapPin className='h-5 w-5 shrink-0 text-gray-600' />
                <p className='text-gray-600'>{location || 'Choose city'}</p>
              </div>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-gray-600 transition-transform ${isCityOpen ? 'rotate-180' : ''}`}
              />
            </div>

            {isCityOpen && (
              <ul className='absolute top-[70px] z-10 max-h-[400px] w-full overflow-y-auto rounded-lg bg-white shadow-md'>
                {ADDRESS_LOCATION.map((city) => (
                  <li
                    key={city}
                    onClick={() => {
                      setLocation(city);
                      setValue('location', city);
                      setIsCityOpen(false);
                    }}
                    className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                      location === city ? 'bg-gray-200 font-semibold' : ''
                    }`}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* role filter */}
          <div className='flex flex-col gap-5'>
            <h3 className='text-[20px] font-semibold'>Job Role</h3>
            <ul className='flex flex-col gap-3'>
              {jobRoleItem.map((item) => (
                <li key={item} className='flex items-center gap-2'>
                  <input {...register('roles')} value={item} type='checkbox' className='h-4 w-4 rounded-[4px]' />
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Date posted filter  */}
          <div className='flex flex-col gap-5'>
            <h3 className='text-[20px] font-semibold'>Date Posted</h3>
            <ul className='flex flex-col gap-3'>
              {datePostItem.map((item) => (
                <li key={item} className='flex items-center gap-2'>
                  <input value={item} {...register('datePosted')} type='checkbox' className='h-4 w-4 rounded-[4px]' />
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Salary filter */}
          <Controller
            name='salaryRange'
            control={control}
            defaultValue={[SALARY_VALUE.MIN, SALARY_VALUE.MAX]}
            render={({ field }) => <RangeSliderMUI value={field.value} onChange={field.onChange} />}
          />

          <button type='submit' className='bg-primary cursor-pointer rounded-sm px-4 py-3'>
            <p className='text-md font-semibold text-white'>Apply</p>
          </button>
        </form>

        {/* list jobs */}
        <div className='jobs flex flex-1 flex-col gap-10'>
          <div className='sort flex flex-col-reverse items-center justify-between gap-10 lg:flex-row'>
            <h3>
              Showing {pagination.currentPage * pagination.limit - pagination.limit + 1} -{' '}
              {pagination.limit * pagination.currentPage} of {pagination.totalDocs} results
            </h3>
            <div className='flex shrink-0 items-center justify-between gap-2 rounded-[6px] border-[1.5px] border-gray-500 px-2 py-3'>
              <p className='text-md font-semibold text-gray-500 sm:text-lg'>Sort by latest</p>
              <ChevronDown className='h-6 w-6 text-gray-500' />
            </div>
          </div>

          <div className='jobs-list'>
            <ul className='flex flex-col gap-5'>
              {Array.from({ length: 6 }).map((_, idx) => (
                <JobCardSkeleton key={idx} />
              ))}
            </ul>
          </div>

          <div className='navigation flex justify-center'>
            <Pagination
              count={pagination.totalPages}
              onChange={handlePageChange}
              page={currentPage}
              size={isMobile ? 'medium' : 'large'}
              siblingCount={isMobile ? 0 : 1}
              boundaryCount={isMobile ? 1 : 2}
            />
          </div>
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
