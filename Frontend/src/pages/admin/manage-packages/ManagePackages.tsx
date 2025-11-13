import type { ICreateAndUpdatePackage, IPackage } from '@apis/packages/interfaces/package.interface';
import { createPackageApi, updatePackageApi } from '@apis/packages/package.api';
import TitleHeader from '@components/common/TitleHeader';
import { useClickOutside } from '@hooks/useClickOutside';
import usePagination from '@hooks/usePagination';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { STATUS_FILTER } from '@utils/data';
import { ChevronDown, Edit, Plus, Search } from 'lucide-react';
import moment from 'moment';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CreateAndEditPackage from './components/CreateAndEditPackage';
import TagActive from './components/TagActive';

interface Props {}

export const packages: IPackage[] = [
  {
    id: 1,
    label: 'Gói Cơ Bản',
    price: 0,
    jobPostLimit: 1,
    isActive: true,
    createdAt: '2025-01-10T08:00:00Z'
  },
  {
    id: 2,
    label: 'Gói Tiêu Chuẩn',
    price: 199000,
    jobPostLimit: 5,
    isActive: true,
    createdAt: '2025-01-15T10:30:00Z'
  },
  {
    id: 3,
    label: 'Gói Cao Cấp',
    price: 499000,
    jobPostLimit: 15,
    isActive: true,
    createdAt: '2025-02-01T09:15:00Z'
  },
  {
    id: 4,
    label: 'Gói Doanh Nghiệp',
    price: 999000,
    jobPostLimit: 50,
    isActive: false,
    createdAt: '2025-02-20T11:45:00Z'
  }
];

const ManagePackages: React.FC<Props> = ({}) => {
  const queryClient = useQueryClient();

  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const currentPage = Number(searchParams.get('page')) || 1;

  const containerRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [packageInfo, setPackageInfo] = useState<IPackage | null>(null);

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

  const createMutation = useMutation({
    mutationFn: (data: ICreateAndUpdatePackage) => createPackageApi(data),
    onSuccess: () => {
      toast.success('Tạo gói dịch vụ thành công!');
    },
    onError: () => {
      toast.error('Có lỗi xảy ra khi tạo gói!');
    }
  });
  const updateMutation = useMutation({
    mutationFn: ({ data, id }: { data: ICreateAndUpdatePackage; id: number }) => updatePackageApi(data, id),
    onSuccess: () => {
      toast.success('Cập nhật gói dịch vụ thành công!');
    },
    onError: () => {
      toast.error('Có lỗi xảy ra khi cập nhật!');
    }
  });

  return (
    <div className='min-h-screen p-4 sm:p-6 lg:p-8'>
      {/* Header */}
      <div className='mb-4 px-4'>
        <div className='flex flex-row items-center justify-between'>
          <TitleHeader title='Quản lý gói dịch vụ' subtitle='Quản lý tất cả dịch vụ trong hệ thống' />
          <button
            className='inline-flex transform items-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-sm font-semibold whitespace-nowrap text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-700 hover:to-blue-900'
            onClick={() => {
              setEdit(false);
              setPackageInfo(null);
              setOpen(true);
            }}
          >
            <Plus className='mr-2 h-5 w-5' />
            Thêm gói dịch vụ
          </button>
        </div>
      </div>

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
                  <th scope='col' className='min-w-[200px] px-6 py-3 whitespace-nowrap'>
                    Tên gói dịch vụ
                  </th>
                  <th scope='col' className='px-6 py-3 whitespace-nowrap'>
                    Giá
                  </th>
                  <th scope='col' className='px-6 py-3 whitespace-nowrap'>
                    Số bài đăng
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
                {packages.map((pack: IPackage) => (
                  <tr
                    key={pack.id}
                    className='border-b border-gray-200 odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800'
                  >
                    <th
                      scope='row'
                      className='text-md max-w-[180px] truncate overflow-hidden px-6 py-4 font-semibold text-ellipsis whitespace-nowrap text-gray-900 dark:text-white'
                    >
                      <div>
                        <div className='font-medium'>{pack.label}</div>
                      </div>
                    </th>
                    <td className='min-w-[100px] truncate px-6 py-4 text-ellipsis whitespace-nowrap'>{pack.price}</td>
                    <td className='px-6 py-4'>{pack.jobPostLimit}</td>
                    <td className='px-6 py-4'>
                      <TagActive isActive={pack.isActive} />
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-sm'>{moment(pack.createdAt).format('DD/MM/yyyy')}</div>
                    </td>

                    <td className=''>
                      <div className='flex gap-2 px-6 py-4'>
                        <button className='text-blue-500 transition-all duration-200 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-blue-500'>
                          <Edit
                            className='h-5 w-5'
                            onClick={() => {
                              setPackageInfo(pack);
                              setOpen(true);
                              setEdit(true);
                            }}
                          />
                        </button>

                        {/* <button
                          onClick={() => {
                            if (window.confirm('Bạn có chắc chắn muốn xoá công việc này không?')) {
                            }
                          }}
                          className='text-red-500 transition-all duration-200 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-red-500'
                        >
                          <Trash2 className='h-5 w-5' />
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {open && (
        <CreateAndEditPackage
          defaultValues={packageInfo}
          isEdit={edit}
          isLoading={false}
          onClose={() => setOpen(false)}
          open={open}
          onSubmit={(formData) => {
            if (edit && packageInfo) {
              updateMutation.mutate({ data: formData, id: packageInfo.id });
            } else {
              createMutation.mutate(formData);
            }
          }}
        />
      )}
    </div>
  );
};

export default ManagePackages;
