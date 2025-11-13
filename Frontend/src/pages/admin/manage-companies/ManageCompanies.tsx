import { useClickOutside } from '@hooks/useClickOutside';
import usePagination from '@hooks/usePagination';
import TitleHeader from '@components/common/TitleHeader';
import { Button, useMediaQuery } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { STATUS_FILTER } from '@utils/data';
import { ChevronDown, Edit, Mail, Search, Trash2, User, Users } from 'lucide-react';
import { getAllCompaniesByAdmin } from '@apis/companies/company.api';
import type { ICompanyByAdminResponse } from '@apis/companies/interfaces/company.interface';
import TableRowSkeleton from '@pages/recruiter/job-manager/components/TableRowSkeleton';
import CompanyPreview from './components/CompanyPreview';
import moment from 'moment';
import TagStatus from './components/TagStatus';

interface Props {}

export const companyByAdminData: ICompanyByAdminResponse[] = [
  {
    id: 1,
    name: 'Công ty TNHH ABC Software',
    avatarUrl: 'https://guchat.vn/wp-content/uploads/2025/04/anh-meo-cute-2-1.jpg',
    emailCompany: 'contact@abcsoftware.vn',
    status: 'ACTIVE',
    isDeleted: false,
    createdAt: new Date('2024-03-15T09:00:00Z'),
    user: {
      id: 11,
      avatar: 'https://guchat.vn/wp-content/uploads/2025/04/anh-meo-cute-2-1.jpg',
      email: 'nguyenvana@gmail.com',
      name: 'Nguyễn Văn A'
    }
  },
  {
    id: 2,
    name: 'Công ty Cổ phần GreenHouse',
    avatarUrl: 'https://guchat.vn/wp-content/uploads/2025/04/anh-meo-cute-2-1.jpg',
    emailCompany: 'info@greenhouse.com.vn',
    status: 'PENDING',
    isDeleted: false,
    createdAt: new Date('2024-04-10T10:30:00Z'),
    user: {
      id: 12,
      avatar: 'https://guchat.vn/wp-content/uploads/2025/04/anh-meo-cute-2-1.jpg',
      email: 'bichngoc.tran@greenhouse.com.vn',
      name: 'Trần Bích Ngọc'
    }
  },
  {
    id: 3,
    name: 'Công ty TNHH Thực phẩm An Nhiên',
    avatarUrl: 'https://guchat.vn/wp-content/uploads/2025/04/anh-meo-cute-2-1.jpg',
    emailCompany: 'support@annhienfoods.vn',
    status: 'REJECT',
    isDeleted: false,
    createdAt: new Date('2024-02-20T08:45:00Z'),
    user: {
      id: 13,
      avatar: 'https://guchat.vn/wp-content/uploads/2025/04/anh-meo-cute-2-1.jpg',
      email: 'leminhquan@annhienfoods.vn',
      name: 'Lê Minh Quân'
    }
  },
  {
    id: 4,
    name: 'Công ty TNHH Zentech Solutions',
    avatarUrl: 'https://guchat.vn/wp-content/uploads/2025/04/anh-meo-cute-2-1.jpg',
    emailCompany: 'contact@zentech.vn',
    status: 'INACTIVE',
    isDeleted: true,
    createdAt: new Date('2024-01-05T11:15:00Z'),
    user: {
      id: 14,
      avatar: 'https://guchat.vn/wp-content/uploads/2025/04/anh-meo-cute-2-1.jpg',
      email: 'phamthuha@zentech.vn',
      name: 'Phạm Thu Hà'
    }
  }
];

const ManageCompanies: React.FC<Props> = ({}) => {
  const queryClient = useQueryClient();
  const isMobile = useMediaQuery('(max-width:640px)');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const currentPage = Number(searchParams.get('page')) || 1;
  useClickOutside(containerRef, () => setIsOpen(false));
  const [open, setOpen] = useState(false); // đóng mở model
  const [companyId, setCompanyId] = useState<string | null>(null);

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

  // const { data, isLoading, isError, isSuccess, isFetching } = useQuery({
  //   queryKey: ['getCompaniesByAdmin', currentPage],
  //   queryFn: () => getAllCompaniesByAdmin(Number(page)),
  //   select: (res) => ({
  //     companies: res.data.data.data,
  //     pagination: res.data.data.pagination
  //   }),
  //   staleTime: 1000 * 60 * 60
  // });

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <div className='min-h-screen p-4 sm:p-6 lg:p-8'>
      {/* Header */}
      <div className='mb-8 px-4'>
        <div className='flex flex-row items-center justify-between'>
          <TitleHeader
            title='Companies Management'
            subtitle='Review and approve all registered companies in the system'
          />
        </div>
      </div>

      <Button onClick={handleOpen}>Open Child Modal</Button>
      <CompanyPreview open={open} onClose={handleClose} companyId={companyId} />

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
          {pagination.totalDocs > 0 ? (
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
                  <th scope='col' className='min-w-[300px] px-6 py-3 whitespace-nowrap'>
                    Công ty
                  </th>
                  <th scope='col' className='min-w-[250px] px-6 py-3 whitespace-nowrap'>
                    Nhà tuyển dụng
                  </th>
                  <th scope='col' className='px-6 py-3 whitespace-nowrap'>
                    Ngày đăng ký
                  </th>
                  <th scope='col' className='px-6 py-3 whitespace-nowrap'>
                    Trạng thái
                  </th>
                  <th scope='col' className='px-6 py-3 whitespace-nowrap'>
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {companyByAdminData.map((company: ICompanyByAdminResponse) => (
                  <tr
                    key={company.id}
                    className='border-b border-gray-200 odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800'
                  >
                    <td
                      scope='row'
                      className='text-md max-w-[180px] truncate overflow-hidden px-6 py-4 font-semibold text-ellipsis whitespace-nowrap text-gray-900 dark:text-white'
                    >
                      <div className='flex items-center gap-3'>
                        {company.avatarUrl ? (
                          <img
                            src={company.avatarUrl}
                            alt='avatar'
                            className='h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12'
                          />
                        ) : (
                          <div className='bg-primary flex h-10 w-10 items-center justify-center rounded-full sm:h-12 sm:w-12'>
                            <span className='text-sm font-semibold text-white'>
                              {company.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div>
                          <p className='truncate font-medium' title='Công ty TNHH Zentech Solutions'>
                            Công ty TNHH Zentech Solutions
                          </p>
                          <div className='flex items-center gap-1 text-sm font-extralight text-gray-500'>
                            <Mail className='h-4 w-4' />
                            {company.emailCompany}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      scope='row'
                      className='text-md max-w-[180px] truncate overflow-hidden px-6 py-4 font-semibold text-ellipsis whitespace-nowrap text-gray-900 dark:text-white'
                    >
                      <div className='flex items-center gap-3'>
                        <div>
                          <div className='flex items-center gap-1 text-sm font-medium'>
                            <User className='h-4 w-4' />
                            {company.user.name}
                          </div>
                          <div className='flex items-center gap-1 text-sm font-extralight text-gray-500'>
                            <Mail className='h-4 w-4' />
                            <p className='max-w-[300px] truncate font-medium' title={company.user.email}>
                              {company.user.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-sm'>{moment(company.createdAt).format('DD/MM/yyyy')}</div>
                    </td>
                    <td className='px-6 py-4'>
                      <TagStatus status={company.status} />
                    </td>
                    <td className=''>
                      <div className='flex gap-2 px-6 py-4'>
                        <button className='text-blue-500 transition-all duration-200 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-blue-500'>
                          <Edit className='h-5 w-5' onClick={() => {}} />
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
      </div>
    </div>
  );
};

export default ManageCompanies;
