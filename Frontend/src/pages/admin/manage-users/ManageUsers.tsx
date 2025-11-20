import TitleHeader from '@components/common/TitleHeader';
import { ACTIVE_FILTER, ROLE_FILTER, STATUS_FILTER, VERIFIED_FILTER } from '@utils/data';
import { useClickOutside } from '@hooks/useClickOutside';
import usePagination from '@hooks/usePagination';
import { Box, Card, CardContent, Grid, Pagination, Typography, useMediaQuery } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ChevronDown, Edit, Mail, Search, Trash2, UsersIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import moment from 'moment';
import type { IUser } from '@apis/users/interfaces/user.interface';
import RoleTag from './components/RoleTag';
import Tag from './components/Tag';
import EditUserModal from './components/EditUserModal';
import UserStat from './components/UserStat';
import { getAllUserByAdmin } from '@apis/users/user.api';

interface Props {}

const users = [
  {
    id: 3,
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'ADMIN',
    status: true,
    isActive: true,
    isVerified: true,
    avatar:
      'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/483336Ppu/anh-mo-ta.png',
    createdAt: '2025-11-08T08:00:00.000Z'
  },
  {
    id: 2,
    name: 'Recruiter User',
    email: 'recruiter@example.com',
    role: 'RECRUITER',
    status: true,
    isActive: true,
    isVerified: true,
    avatar: null,
    createdAt: '2025-11-08T08:00:00.000Z'
  },
  {
    id: 1,
    name: 'Candidate User',
    email: 'candidate@example.com',
    role: 'CANDIDATE',
    status: true,
    isActive: false,
    isVerified: false,
    avatar: null,
    createdAt: '2025-11-08T08:00:00.000Z'
  }
];

const ManageUsers: React.FC<Props> = ({}) => {
  const queryClient = useQueryClient();
  const isMobile = useMediaQuery('(max-width:640px)');
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const currentPage = Number(searchParams.get('page')) || 1;
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  //Filter dropdown
  const verifiedRef = useRef<HTMLDivElement | null>(null);
  const roleRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef<HTMLDivElement | null>(null);

  const [isVerifiedOpen, setIsVerifiedOpen] = useState(false);
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [isActiveOpen, setIsActiveOpen] = useState(false);

  useClickOutside(verifiedRef, () => setIsVerifiedOpen(false));
  useClickOutside(roleRef, () => setIsRoleOpen(false));
  useClickOutside(activeRef, () => setIsActiveOpen(false));

  const { pagination, jumpToPage, setPagination } = usePagination({
    totalDocs: 0,
    totalPages: 0,
    currentPage: 0,
    limit: 6
  });

  const { register, handleSubmit, watch, control, setValue, reset } = useForm({
    defaultValues: {
      search: '',
      status: '',
      active: '',
      role: ''
    }
  });

  const page = searchParams.get('page') || 1;

  const { data, isLoading, isError, isSuccess, isFetching } = useQuery({
    queryKey: ['getUsersByAdmin', currentPage],
    queryFn: () => getAllUserByAdmin(Number(page)),
    select: (res) => ({
      users: res.data.data,
      pagination: res.data.pagination
    }),
    staleTime: 1000 * 60 * 60
  });

  useEffect(() => {
    const param = new URLSearchParams(searchParams);

    if (!searchParams.get('page')) {
      param.set('page', '1');
    }

    setSearchParams(param, { replace: true });
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (data?.pagination) {
      setPagination(data.pagination);
    }
  }, [data]);

  // Calculate statistics
  const totalUsers = 10;
  const candidateCount = users.filter((u) => u.role === 'CANDIDATE').length;
  const recruiterCount = users.filter((u) => u.role === 'RECRUITER').length;
  const verifiedCount = users.filter((u) => u.isVerified).length;

  return (
    <div className='min-h-screen p-4 sm:p-6 lg:p-8'>
      {/* Header */}
      <div className='mb-2 px-4'>
        <div className='flex flex-row items-center justify-between'>
          <TitleHeader title='Quản lý người dùng' subtitle='Quản lý tất cả người dùng trong hệ thống' />
        </div>
      </div>

      {/* Statistics */}
      <UserStat
        candidateCount={candidateCount}
        recruiterCount={recruiterCount}
        totalUsers={totalUsers}
        verifiedCount={verifiedCount}
      />

      <div className='mb-8 rounded-2xl border border-white/20 bg-white/80 p-6 shadow-xl shadow-black/5 backdrop-blur-sm'>
        <div className='xs:flex-row flex flex-col gap-4'>
          {/* Search */}
          <div className='relative flex-1'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
              <Search className='h-4 w-4 text-gray-400' />
            </div>

            <input
              type='text'
              placeholder='Tìm kiếm người dùng...'
              className='block w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pr-4 pl-10 text-sm placeholder-gray-400 outline-0 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
            />
          </div>

          {/* Status filter */}
          <div ref={verifiedRef} className='relative sm:w-48'>
            <div
              className='flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2'
              onClick={() => setIsVerifiedOpen((prev) => !prev)}
            >
              <p className='text-gray-600'>
                {VERIFIED_FILTER.find((s) => s.key === (searchParams.get('status') || 'all'))?.label}
              </p>
              <ChevronDown
                className={`h-5 w-5 text-gray-600 transition-transform ${isVerifiedOpen ? 'rotate-180' : ''}`}
              />
            </div>
            {isVerifiedOpen && (
              <ul className='absolute top-[40px] left-0 z-10 w-full rounded-lg bg-white shadow-md'>
                {VERIFIED_FILTER.map((s) => (
                  <li
                    key={s.key}
                    onClick={() => {
                      setValue('status', s.key);
                      setIsVerifiedOpen(false);
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

          {/* Role Filter */}
          <div ref={roleRef} className='relative sm:w-48'>
            <div
              className='flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2'
              onClick={() => setIsRoleOpen((prev) => !prev)}
            >
              <p className='text-gray-600'>
                {ROLE_FILTER.find((r) => r.key === (searchParams.get('role') || 'all'))?.label}
              </p>
              <ChevronDown className={`h-5 w-5 text-gray-600 transition-transform ${isRoleOpen ? 'rotate-180' : ''}`} />
            </div>
            {isRoleOpen && (
              <ul className='absolute top-[40px] left-0 z-10 w-full rounded-lg bg-white shadow-md'>
                {ROLE_FILTER.map((r) => (
                  <li
                    key={r.key}
                    onClick={() => {
                      setValue('role', r.key);
                      setIsRoleOpen(false);
                      const param = new URLSearchParams(searchParams);
                      param.set('role', r.key);
                      setSearchParams(param);
                    }}
                    className={`cursor-pointer px-4 py-3 hover:bg-gray-100 ${
                      searchParams.get('role') === r.key ? 'bg-gray-200 font-semibold' : ''
                    }`}
                  >
                    {r.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Active Filter */}
          <div ref={activeRef} className='relative sm:w-48'>
            <div
              className='flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2'
              onClick={() => setIsActiveOpen((prev) => !prev)}
            >
              <p className='text-gray-600'>
                {ACTIVE_FILTER.find((a) => a.key === (searchParams.get('active') || 'all'))?.label}
              </p>
              <ChevronDown
                className={`h-5 w-5 text-gray-600 transition-transform ${isActiveOpen ? 'rotate-180' : ''}`}
              />
            </div>
            {isActiveOpen && (
              <ul className='absolute top-[40px] left-0 z-10 w-full rounded-lg bg-white shadow-md'>
                {ACTIVE_FILTER.map((a) => (
                  <li
                    key={a.key}
                    onClick={() => {
                      setValue('active', a.key);
                      setIsActiveOpen(false);
                      const param = new URLSearchParams(searchParams);
                      param.set('active', a.key);
                      setSearchParams(param);
                    }}
                    className={`cursor-pointer px-4 py-3 hover:bg-gray-100 ${
                      searchParams.get('active') === a.key ? 'bg-gray-200 font-semibold' : ''
                    }`}
                  >
                    {a.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Results Sumary */}
        <div className='sort my-4 flex items-center justify-between gap-10 px-4 sm:flex-row'>
          {pagination.totalDocs > 0 ? (
            <h3 className='sm:text-md text-sm'>
              Hiển thị {(pagination.currentPage - 1) * pagination.limit + 1} -{' '}
              {Math.min(pagination.currentPage * pagination.limit, pagination.totalDocs)} của {pagination.totalDocs} kết
              quả
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
                  <th scope='col' className='min-w-[300px] px-6 py-3 whitespace-nowrap'>
                    Người dùng
                  </th>
                  <th scope='col' className='px-6 py-3 whitespace-nowrap'>
                    Vai trò
                  </th>
                  <th scope='col' className='px-6 py-3 whitespace-nowrap'>
                    Trạng thái
                  </th>
                  <th scope='col' className='px-6 py-3 whitespace-nowrap'>
                    Ngày tạo
                  </th>
                  <th scope='col' className='px-6 py-3 whitespace-nowrap'>
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {!isLoading &&
                  !isFetching &&
                  isSuccess &&
                  data.users.map((user: IUser) => (
                    <tr
                      key={user.id}
                      className='border-b border-gray-200 odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800'
                    >
                      <th
                        scope='row'
                        className='text-md max-w-[180px] truncate overflow-hidden px-6 py-4 font-semibold text-ellipsis whitespace-nowrap text-gray-900 dark:text-white'
                      >
                        <div className='flex items-center gap-3'>
                          {user.avatar ? (
                            <img
                              src={user.avatar}
                              alt='avatar'
                              className='h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12'
                            />
                          ) : (
                            <div className='bg-primary flex h-10 w-10 items-center justify-center rounded-full sm:h-12 sm:w-12'>
                              <span className='text-sm font-semibold text-white'>
                                {user.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <div>
                            <div className='font-medium'>{user.name}</div>
                            <div className='flex items-center gap-1 text-sm font-extralight text-gray-500'>
                              <Mail className='h-4 w-4' />
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </th>
                      <td className='min-w-[100px] truncate px-6 py-4 text-ellipsis whitespace-nowrap'>
                        <RoleTag role={user.role} />
                      </td>
                      <td className='px-6 py-4'>
                        <Tag isActive={user.isActive} isVerified={user.isVerified} />
                      </td>
                      <td className='px-6 py-4'>
                        <div className='text-sm'>{moment(user.createdAt).format('DD/MM/yyyy')}</div>
                      </td>

                      <td className=''>
                        <div className='flex gap-2 px-6 py-4'>
                          <button className='text-blue-500 transition-all duration-200 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-blue-500'>
                            <Edit
                              className='h-5 w-5'
                              onClick={() => {
                                setUser(user);
                                setOpen(true);
                              }}
                            />
                          </button>

                          <button
                            onClick={() => {
                              if (window.confirm('Bạn có chắc chắn muốn xoá công việc này không?')) {
                              }
                            }}
                            className='text-red-500 transition-all duration-200 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-red-500'
                          >
                            <Trash2 className='h-5 w-5' />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* pagiantion */}
        {pagination.totalPages > 0 && (
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
      {open && (
        <EditUserModal
          defaultValues={user}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          onSubmit={() => {}}
          isUpdating={true}
        />
      )}
    </div>
  );
};

export default ManageUsers;
