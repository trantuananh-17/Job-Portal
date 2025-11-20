import type {
  ICreateAndUpdatePackage,
  IPackage,
  IPackageResponseByAdmin
} from '@apis/packages/interfaces/package.interface';
import { createPackageApi, getAllPackageByAdmin, updatePackageApi } from '@apis/packages/package.api';
import TitleHeader from '@components/common/TitleHeader';
import { useClickOutside } from '@hooks/useClickOutside';
import usePagination from '@hooks/usePagination';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { STATUS_FILTER } from '@utils/data';
import { ChevronDown, Edit, Plus, Search } from 'lucide-react';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CreateAndEditPackage from './components/CreateAndEditPackage';
import TagActive from './components/TagActive';
import { Pagination, useMediaQuery } from '@mui/material';

interface Props {}

const ManagePackages: React.FC<Props> = ({}) => {
  const queryClient = useQueryClient();
  const isMobile = useMediaQuery('(max-width:640px)');

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
    limit: 8
  });

  // Change pagination
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    jumpToPage(value);
    const params = new URLSearchParams(searchParams);
    params.set('page', `${value}`);
    setSearchParams(params);
  };

  const page = searchParams.get('page') || 1;

  const { data, isLoading, isError, isSuccess, isFetching } = useQuery({
    queryKey: ['getPackagesByAdmin', currentPage],
    queryFn: () => getAllPackageByAdmin(Number(page)),
    select: (res) => ({
      packages: res.data.data,
      pagination: res.data.pagination
    }),
    staleTime: 1000 * 60 * 60
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

  return (
    <div className='min-h-screen p-4 sm:p-6 lg:p-8'>
      {/* Header */}
      <div className='px-4'>
        <div className='flex flex-col items-center justify-between md:flex-row'>
          <TitleHeader title='Quản lý gói dịch vụ' subtitle='Quản lý tất cả dịch vụ trong hệ thống' />
          <button
            className='inline-flex transform items-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-sm font-semibold whitespace-nowrap text-white transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-700 hover:to-blue-900'
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

      <div className='mb-8 rounded-2xl border border-white/20 bg-white/80 p-4 shadow-xl shadow-black/5 backdrop-blur-sm sm:p-6'>
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
            <table className='w-full table-auto text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400'>
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
                  {/* <th scope='col' className='px-6 py-3 whitespace-nowrap'>
                    Ngày tạo
                  </th> */}
                  <th scope='col' className='px-6 py-3 whitespace-nowrap'>
                    Đăng ký
                  </th>
                  <th scope='col' className='px-6 py-3 whitespace-nowrap'>
                    Thứ tự
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
                  data.packages.map((pack: IPackageResponseByAdmin) => (
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
                      {/* <td className='px-6 py-4'>
                        <div className='text-sm'>{moment(pack.createdAt).format('DD/MM/yyyy')}</div>
                      </td> */}
                      <td className='px-6 py-4'>
                        <div className='text-sm'>{pack._count.orders}</div>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='text-sm'>{pack.priorityLevel}</div>
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

        {/* pagiantion */}
        {pagination.totalPages > 0 && (
          <div className='navigation mt-5 flex justify-center'>
            <Pagination
              count={pagination.totalPages}
              onChange={handlePageChange}
              page={currentPage}
              size={isMobile ? 'medium' : 'large'}
              siblingCount={isMobile ? 0 : 1}
              boundaryCount={isMobile ? 1 : 2}
            />
          </div>
        )}
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
