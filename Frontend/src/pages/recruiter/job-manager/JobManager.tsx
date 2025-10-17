import type { IJobByRecruiterResponse, JobStatus } from '@apis/jobs/interfaces/job.interface';
import { deleteJobApi, getJobsByRecruiterApi } from '@apis/jobs/job.api';
import EmptyTable from '@components/common/EmptyTable';
import ErrorState from '@components/common/ErrorState';
import { useRecruiterAuth } from '@context/RecruiterContext';
import { useClickOutside } from '@hooks/useClickOutside';
import usePagination from '@hooks/usePagination';
import { Pagination, useMediaQuery } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { STATUS_FILTER } from '@utils/data';
import axios from 'axios';
import { ChevronDown, Edit, Plus, Search, Trash2, Users, XCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import StatusTag from './components/StatusTag';
import TableRowSkeleton from './components/TableRowSkeleton';

interface Props {}

const JobManager: React.FC<Props> = ({}) => {
  const { company } = useRecruiterAuth();
  const queryClient = useQueryClient();
  const isMobile = useMediaQuery('(max-width:640px)');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const currentPage = Number(searchParams.get('page')) || 1;
  useClickOutside(containerRef, () => setIsOpen(false));

  const { pagination, jumpToPage, setPagination } = usePagination({
    totalDocs: 0,
    totalPages: 0,
    currentPage: 0,
    limit: 6
  });

  const { register, handleSubmit, watch, control, setValue, reset } = useForm({
    defaultValues: {
      search: '',
      status: ''
    }
  });

  const page = searchParams.get('page') || 1;
  const status = searchParams.get('status') || 'all';

  const jobStatus = status === 'all' ? 'all' : status.toUpperCase();

  const { data, isLoading, isError, isSuccess, isFetching } = useQuery({
    queryKey: ['getJobsByRecruiter', status, currentPage],
    queryFn: () => getJobsByRecruiterApi(Number(page), jobStatus as unknown as JobStatus),
    select: (res) => res.data,
    staleTime: 1000 * 60 * 60
  });

  const deleteMutation = useMutation({
    mutationFn: ({ companyId, jobId }: { companyId: number; jobId: number }) => deleteJobApi(companyId, jobId),
    onSuccess: (res) => {
      toast.success(res.data.message);
      queryClient.invalidateQueries({ queryKey: ['getJobsByRecruiter'] });
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data.message || 'Đã xảy ra lỗi!');
      } else {
        toast.error('Lỗi không xác định!');
      }
    }
  });

  useEffect(() => {
    const param = new URLSearchParams(searchParams);

    if (!searchParams.get('page')) {
      param.set('page', '1');
    }

    setSearchParams(param);
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (data?.pagination) {
      setPagination(data.pagination);
    }
  }, [data]);

  const onDelete = async (jobId: number) => {
    const companyId = Number(company?.id);

    if (!companyId) {
      toast.error('Không tìm thấy công ty. Hãy đăng nhập lại!');
      return;
    }

    deleteMutation.mutate({ companyId, jobId });
  };

  return (
    <div className='min-h-screen p-4 sm:p-6 lg:p-8'>
      <div className='mx-auto max-w-7xl'>
        {/* Header */}
        <div className='mb-8 px-4'>
          <div className='flex flex-row items-center justify-between'>
            <div className='mb-4 sm:mb-0'>
              <h1 className='text-xl font-semibold text-gray-900 md:text-2xl'>Job Management</h1>
              <p className='mt-1 text-sm text-gray-600'>Manage your job postings and track applications</p>
            </div>
            <button
              className='inline-flex transform items-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-sm font-semibold whitespace-nowrap text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-700 hover:to-blue-900 hover:shadow-xl hover:shadow-blue-500/30'
              onClick={() => navigate('/recruiter/post-job')}
            >
              <Plus className='mr-2 h-5 w-5' />
              Add New Job
            </button>
          </div>
        </div>

        {/* Filter && search */}
        <div className='mb-8 rounded-2xl border border-white/20 bg-white/80 p-6 shadow-xl shadow-black/5 backdrop-blur-sm'>
          <div className='xs:flex-row flex flex-col gap-4'>
            {/* Search */}
            <div className='relative flex-1'>
              <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                <Search className='h-4 w-4 text-gray-400' />
              </div>

              <input
                type='text'
                placeholder='Search jobs...'
                className='block w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pr-4 pl-10 text-sm placeholder-gray-400 outline-0 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
              />
            </div>

            {/* Status filter */}
            <div ref={containerRef} className='relative sm:w-48'>
              <div className='block w-full rounded-lg border border-gray-200 px-4 py-2'>
                <div
                  className='flex cursor-pointer items-center justify-between gap-3 rounded-xl bg-white'
                  onClick={() => setIsOpen((prev) => !prev)}
                >
                  <div className='flex items-center gap-3'>
                    <p className='text-gray-600'>
                      {STATUS_FILTER.find((s) => s.key === (searchParams.get('status') || 'all'))?.label}
                    </p>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </div>

                {isOpen && (
                  <ul className='absolute top-[40px] left-0 z-10 w-full overflow-y-auto rounded-lg bg-white shadow-md'>
                    {STATUS_FILTER.map((s) => (
                      <li
                        key={s.key}
                        onClick={() => {
                          setValue('status', s.key);
                          setIsOpen(false);
                          const param = new URLSearchParams(searchParams);
                          param.set('status', s.key);
                          setSearchParams(param);
                        }}
                        className={`cursor-pointer px-4 py-3 hover:bg-gray-100 ${
                          searchParams.get('status') === s.key ? 'bg-gray-200 font-semibold' : ''
                        }`}
                      >
                        {s.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Results Sumary */}
          <div className='sort my-5 flex flex-col-reverse items-center justify-between gap-10 px-4 lg:flex-row'>
            {!isLoading && pagination.totalDocs > 0 ? (
              <h3 className='sm:text-md text-sm'>
                Showing {(pagination.currentPage - 1) * pagination.limit + 1} -{' '}
                {Math.min(pagination.currentPage * pagination.limit, pagination.totalDocs)} of {pagination.totalDocs}{' '}
                results
              </h3>
            ) : (
              <h3 className='sm:text-md text-sm'>Loading results...</h3>
            )}
          </div>

          {/* Table */}
          <div className='overflow-hidden rounded-2xl border-white/20 bg-white/80 backdrop-blur-sm'>
            <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
              <table className='w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400'>
                <thead className='sm:text-md bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th scope='col' className='px-6 py-3'>
                      Job Title
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Status
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Applicants
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Deleted
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(isLoading || isFetching) && (
                    <>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <TableRowSkeleton key={i} />
                      ))}
                    </>
                  )}
                  {!isFetching &&
                    !isLoading &&
                    isSuccess &&
                    data?.data?.map((job: IJobByRecruiterResponse) => (
                      <tr
                        key={job.id}
                        className='border-b border-gray-200 odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800'
                      >
                        <th
                          scope='row'
                          className='text-md px-6 py-4 font-semibold whitespace-nowrap text-gray-900 dark:text-white'
                        >
                          {job.title}
                        </th>
                        <td className='px-6 py-4'>
                          <StatusTag status={job.status} />
                        </td>
                        <td className='px-6 py-4'>
                          <button
                            className='flex cursor-pointer items-center justify-center gap-2 text-blue-500 hover:text-blue-600'
                            onClick={() => navigate(`/recruiter/applicants/${job.id}`)}
                          >
                            <Users className='h-5 w-5' />
                            {job.totalApply}
                          </button>
                        </td>
                        <td className='px-6 py-4'>
                          <span
                            className={`inline-flex items-center justify-center rounded-full border px-3 py-1 text-sm font-medium ${
                              job.isDeleted
                                ? 'border-red-200 bg-red-100 text-red-700'
                                : 'border-green-200 bg-green-100 text-green-700'
                            }`}
                            style={{ minWidth: '80px' }}
                          >
                            {job.isDeleted ? 'Deleted' : 'Not deleted'}
                          </span>
                        </td>

                        <td className='flex gap-2 px-6 py-4'>
                          <button
                            disabled={job.isDeleted || job.status === 'EXPIRED' || job.status === 'REJECT'}
                            className='text-blue-500 transition-all duration-200 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-blue-500'
                          >
                            <Edit className='h-5 w-5' onClick={() => navigate(`/recruiter/edit-job/${job.id}`)} />
                          </button>

                          <button
                            onClick={() => {
                              if (window.confirm('Bạn có chắc chắn muốn xoá công việc này không?')) {
                                onDelete(job.id);
                              }
                            }}
                            disabled={job.isDeleted === true}
                            className='text-red-500 transition-all duration-200 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-red-500'
                          >
                            <Trash2 className='h-5 w-5' />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {isSuccess && data?.data?.length === 0 && !isLoading && !isFetching && <EmptyTable name='Jobs' />}
            {isError && <ErrorState title='Đã xảy ra lỗi' description='Không thể kết nối tới server.' icon={XCircle} />}
            {pagination.totalDocs > 0 && (
              <div className='navigation mt-5 flex justify-center'>
                <Pagination
                  count={pagination.totalPages}
                  page={currentPage}
                  size={isMobile ? 'medium' : 'large'}
                  siblingCount={isMobile ? 0 : 1}
                  boundaryCount={isMobile ? 1 : 2}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobManager;
