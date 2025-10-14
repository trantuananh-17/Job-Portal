import type { IJobByCandidateResponse, IJobFilter } from '@apis/jobs/interfaces/job.interface';
import { getJobsByCandidateApi, searchJobsFilterApi } from '@apis/jobs/job.api';
import EmptyState from '@components/common/EmptyState';
import ErrorState from '@components/common/ErrorState';
import JobCardSkeleton from '@components/common/JobCardSkeleton';
import { datePostItem, jobRoleItem } from '@constant/menuItem';
import { SALARY_VALUE } from '@constant/rangeValue';
import usePagination from '@hooks/usePagination';
import { Pagination, useMediaQuery } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { ADDRESS_LOCATION } from '@utils/data';
import { ChevronDown, Inbox, MapPin, Search, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import JobItem from '../common/JobItem';
import Button from './components/ButtonForm';
import RangeSliderMUI from './components/RangeSliderMUI';

const Jobs = () => {
  const isMobile = useMediaQuery('(max-width:640px)');
  const [searchParams, setSearchParams] = useSearchParams();
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const { register, handleSubmit, watch, control, setValue, reset } = useForm<IJobFilter>({
    defaultValues: {
      search: '',
      location: '',
      roles: [],
      datePosted: [],
      salaryRange: [SALARY_VALUE.MIN, SALARY_VALUE.MAX]
    }
  });

  const [location, setLocation] = useState('');

  const { pagination, jumpToPage, setPagination } = usePagination({
    totalDocs: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 6
  });

  //get params url
  const currentPage = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';
  const limit = 6;

  // Change pagination
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    jumpToPage(value);
    const params = new URLSearchParams(searchParams);
    params.set('page', `${value}`);
    setSearchParams(params);
  };

  const hasFilters = Array.from(searchParams.keys()).some((key) => key !== 'page');
  const searchKey = searchParams.toString();

  const {
    data: jobsData,
    isLoading,
    isError,
    isSuccess
  } = useQuery({
    queryKey: ['jobs', hasFilters, currentPage, searchKey],
    queryFn: () => (hasFilters ? searchJobsFilterApi(limit, searchParams) : getJobsByCandidateApi(currentPage, limit)),
    select: (res) => res.data,
    enabled: isReady,
    // placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5
  });

  const handleApplyFilter = handleSubmit((data) => {
    const params = new URLSearchParams(searchParams);

    if (data.search) {
      params.set('search', data.search);
    } else {
      params.delete('search');
    }

    if (data.location) {
      params.set('location', data.location);
    } else {
      params.delete('location');
    }

    if (data.roles.length > 0) {
      params.set('roles', data.roles.map((role) => role.toLowerCase()).join(','));
    } else {
      params.delete('roles');
    }

    if (data.datePosted.length > 0) {
      params.set('dates', data.datePosted.reverse().join(','));
    } else {
      params.delete('dates');
    }

    if (data.salaryRange?.length === 2) {
      params.set('min', String(data.salaryRange[0]));
      params.set('max', String(data.salaryRange[1]));
    }

    setSearchParams(params);
  });

  const handleResetFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    params.delete('search');
    params.delete('location');
    params.delete('roles');
    params.delete('dates');
    params.delete('min');
    params.delete('max');
    params.set('page', '1');

    reset({
      search: '',
      location: '',
      roles: [],
      datePosted: [],
      salaryRange: [SALARY_VALUE.MIN, SALARY_VALUE.MAX]
    });

    setSearchParams(params);
  };

  // Set default page on load

  useEffect(() => {
    if (!searchParams.get('page')) {
      setSearchParams({ page: '1' }, { replace: true });
    } else {
      setIsReady(true);
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    setValue('search', search);
  }, [search]);

  useEffect(() => {
    if (jobsData?.pagination) {
      setPagination(jobsData.pagination);
    }
  }, [jobsData]);

  useEffect(() => {
    const searchValue = searchParams.get('search') || '';
    const locationValue = searchParams.get('location') || '';
    const rolesValue = searchParams.get('roles')?.split(',') || [];
    const datePostedValue = searchParams.get('dates')?.split(',').reverse() || [];
    const minSalary = Number(searchParams.get('min')) || SALARY_VALUE.MIN;
    const maxSalary = Number(searchParams.get('max')) || SALARY_VALUE.MAX;

    reset({
      search: searchValue,
      location: locationValue,
      roles: rolesValue,
      datePosted: datePostedValue,
      salaryRange: [minSalary, maxSalary]
    });

    setLocation(locationValue);
  }, [searchParams, reset]);

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
                  <input
                    {...register('roles')}
                    value={item.toLowerCase()}
                    type='checkbox'
                    className='h-4 w-4 rounded-[4px]'
                  />
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

          <div className='flex flex-col gap-2'>
            <Button type='submit' className='bg-primary'>
              <p className='text-md font-semibold text-white'>Apply</p>
            </Button>

            <Button type='button' onClick={handleResetFilter} className='border border-gray-200 bg-white'>
              <p className='text-md font-semibold text-gray-800'>Reset</p>
            </Button>
          </div>
        </form>

        {/* list jobs */}
        <div className='jobs flex flex-1 flex-col gap-10'>
          <div className='sort mt-5 flex flex-col-reverse items-center justify-between gap-10 lg:flex-row'>
            {!isLoading && pagination.totalDocs > 0 ? (
              <h3>
                Showing {(pagination.currentPage - 1) * pagination.limit + 1} -{' '}
                {Math.min(pagination.currentPage * pagination.limit, pagination.totalDocs)} of {pagination.totalDocs}{' '}
                results
              </h3>
            ) : (
              <h3>Loading results...</h3>
            )}
          </div>

          <div className='jobs-list'>
            <div>
              {isLoading && (
                <ul className='flex flex-col gap-5'>
                  {Array.from({ length: 8 }).map((_, idx) => (
                    <JobCardSkeleton key={idx} />
                  ))}
                </ul>
              )}

              {isError && (
                <ErrorState title='Đã xảy ra lỗi' description='Không thể kết nối tới server.' icon={XCircle} />
              )}

              {isSuccess && jobsData.data.length > 0 && (
                <ul className='flex flex-col gap-5'>
                  {jobsData.data.map((job: IJobByCandidateResponse) => (
                    <JobItem job={job} key={job.id} />
                  ))}
                </ul>
              )}

              {isSuccess && jobsData.length === 0 && !isLoading && (
                <EmptyState
                  title='Không có việc làm gần đây'
                  description='Hiện tại chưa có việc làm nào để hiển thị.'
                  icon={Inbox}
                />
              )}
            </div>
          </div>

          <div className='navigation flex justify-center'>
            <Pagination
              count={Math.max(pagination.totalPages, 1)}
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
