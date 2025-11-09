import { convertPrice } from '@utils/formatPrice';
import type { IOrder } from '@apis/orders/interfaces/order.interface';
import TitleHeader from '@components/common/TitleHeader';
import { useClickOutside } from '@hooks/useClickOutside';
import usePagination from '@hooks/usePagination';
import { useMediaQuery } from '@mui/material';
import { STATUS_FILTER } from '@utils/data';
import { ChevronDown, Edit, Eye, Mail, Search, Trash2, User } from 'lucide-react';
import moment from 'moment';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TagOrder from './components/TagOrder';
import OrderPreview from './components/OrderPreview';

interface Props {}

const orders: IOrder[] = [
  {
    id: 1,
    recruiter: {
      id: 101,
      name: 'Nguyễn Văn A',
      email: 'a@gmail.com',
      role: 'RECRUITER'
    },
    package: {
      id: 1,
      label: 'Gói Cơ Bản',
      price: 199000,
      jobPostLimit: 5,
      isActive: true
    },
    totalPrice: 199000,
    status: 'SUCCESS',
    orderDate: '2025-11-01T08:30:00Z'
  },
  {
    id: 2,
    recruiter: {
      id: 102,
      name: 'Trần Thị B',
      email: 'b@gmail.com',
      role: 'RECRUITER'
    },
    package: {
      id: 2,
      label: 'Gói Nâng Cao',
      price: 499000,
      jobPostLimit: 15,
      isActive: true
    },
    totalPrice: 499000,
    status: 'PENDING',
    orderDate: '2025-11-05T12:45:00Z'
  },
  {
    id: 3,
    recruiter: {
      id: 103,
      name: 'Lê Hoàng C',
      email: 'c@gmail.com',
      role: 'RECRUITER'
    },
    package: {
      id: 3,
      label: 'Gói Doanh Nghiệp',
      price: 999000,
      jobPostLimit: 50,
      isActive: true
    },
    totalPrice: 999000,
    status: 'FAILED',
    orderDate: '2025-11-07T10:15:00Z'
  }
];

const ManageOrders: React.FC<Props> = ({}) => {
  const isMobile = useMediaQuery('(max-width:640px)');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const currentPage = Number(searchParams.get('page')) || 1;
  useClickOutside(containerRef, () => setIsOpen(false));
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState<IOrder | null>(null);

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

  return (
    <div className='min-h-screen p-4 sm:p-6 lg:p-8'>
      {/* Header */}
      <div className='mb-4 px-4'>
        <div className='flex flex-row items-center justify-between'>
          <TitleHeader title='Quản lý đơn hàng' subtitle='Quản lý danh sách thanh toán gói dịch vụ của người dùng' />
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
                  <th scope='col' className='min-w-[150px] px-6 py-3 whitespace-nowrap'>
                    Nhà tuyển dụng
                  </th>
                  <th scope='col' className='px-6 py-3 whitespace-nowrap'>
                    Gói dịch vụ
                  </th>
                  <th scope='col' className='px-6 py-3 whitespace-nowrap'>
                    Giá
                  </th>
                  <th scope='col' className='px-6 py-3 whitespace-nowrap'>
                    Trạng thái
                  </th>
                  <th scope='col' className='px-6 py-3 whitespace-nowrap'>
                    Ngày đăng ký
                  </th>
                  <th scope='col' className='px-6 py-3 whitespace-nowrap'>
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order: IOrder) => (
                  <tr
                    key={order.id}
                    className='border-b border-gray-200 odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800'
                  >
                    <th
                      scope='row'
                      className='text-md max-w-[180px] truncate overflow-hidden px-6 py-4 font-semibold text-ellipsis whitespace-nowrap text-gray-900 dark:text-white'
                    >
                      <div className='flex items-center gap-3'>
                        <div>
                          <div className='flex items-center gap-1 text-sm font-medium'>
                            <User className='h-4 w-4' />
                            {order.recruiter.name}
                          </div>
                          <div className='flex items-center gap-1 text-sm font-extralight text-gray-500'>
                            <Mail className='h-4 w-4' />
                            {order.recruiter.email}
                          </div>
                        </div>
                      </div>
                    </th>

                    <td className='px-6 py-4 whitespace-nowrap'>{order.package.label}</td>
                    <td className='px-6 py-4'>{convertPrice(order.totalPrice)}</td>
                    <td className='px-6 py-4'>
                      <TagOrder status={order.status} />
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-sm'>{moment(order.orderDate).format('DD/MM/yyyy')}</div>
                    </td>

                    <td className=''>
                      <div className='flex gap-2 px-6 py-4'>
                        <button className='text-blue-500 transition-all duration-200 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-blue-500'>
                          <Eye
                            className='h-5 w-5'
                            onClick={() => {
                              setOpen(true);
                              setOrder(order);
                            }}
                          />
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
      {open && <OrderPreview open={open} orderInfo={order} onClose={() => setOpen(false)} />}
    </div>
  );
};

export default ManageOrders;
