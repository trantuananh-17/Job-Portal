import type { IOrder } from '@apis/orders/interfaces/order.interface';
import { getAllOrderByadmin } from '@apis/orders/order.api';
import TitleHeader from '@components/common/TitleHeader';
import { useClickOutside } from '@hooks/useClickOutside';
import usePagination from '@hooks/usePagination';
import { Pagination, useMediaQuery } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { ORDER_DATE_FILTER, ORDER_STATUS_FILTER, SORT_ORDER, STATUS_FILTER } from '@utils/data';
import { convertPrice } from '@utils/formatPrice';
import { ChevronDown, Eye, Mail, Search, User } from 'lucide-react';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import OrderPreview from './components/OrderPreview';
import TagOrder from './components/TagOrder';

interface Props {}

const ManageOrders: React.FC<Props> = ({}) => {
  const isMobile = useMediaQuery('(max-width:640px)');
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState<IOrder | null>(null);

  const orderStatusRef = useRef<HTMLDivElement | null>(null);
  const dateFilteref = useRef<HTMLDivElement | null>(null);
  const ordersortRef = useRef<HTMLDivElement | null>(null);

  const [isOrderStatusOpen, setIsOrderStatusOpen] = useState(false);
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
  const [isOrderSortOpen, setIsOrderSortOpen] = useState(false);

  useClickOutside(orderStatusRef, () => setIsOrderStatusOpen(false));
  useClickOutside(dateFilteref, () => setIsDateFilterOpen(false));
  useClickOutside(ordersortRef, () => setIsOrderSortOpen(false));

  const page = searchParams.get('page') || 1;

  const { data, isLoading, isError, isSuccess, isFetching } = useQuery({
    queryKey: ['getOrdersByAdmin', currentPage],
    queryFn: () => getAllOrderByadmin(Number(page)),
    select: (res) => ({
      orders: res.data.data,
      pagination: res.data.pagination
    }),
    staleTime: 1000 * 60 * 60
  });

  const { pagination, jumpToPage, setPagination } = usePagination({
    totalDocs: 0,
    totalPages: 0,
    currentPage: 0,
    limit: 6
  });

  const { register, handleSubmit, watch, control, setValue, reset } = useForm({
    defaultValues: {
      status: '',
      sort: '',
      date: ''
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
        <div className='flex flex-row items-center justify-between'>
          <TitleHeader title='Quản lý đơn hàng' subtitle='Quản lý danh sách thanh toán gói dịch vụ của người dùng' />
        </div>
      </div>

      <div className='mb-8 rounded-2xl border border-white/20 bg-white/80 p-4 shadow-xl shadow-black/5 backdrop-blur-sm sm:p-6'>
        <div className='flex flex-wrap gap-4 sm:flex-row'>
          {/* Status filter */}
          <div ref={orderStatusRef} className='xs:w-48 relative whitespace-nowrap'>
            <div className='block w-full rounded-lg border border-gray-200 px-4 py-2'>
              <div
                className='flex cursor-pointer items-center justify-between gap-3 rounded-xl bg-white'
                onClick={() => setIsOrderStatusOpen((prev) => !prev)}
              >
                <div className='flex items-center gap-3'>
                  <p className='text-gray-600'>
                    {ORDER_STATUS_FILTER.find((s) => s.key === (searchParams.get('status') || 'all'))?.label}
                  </p>
                </div>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-gray-600 transition-transform ${isOrderSortOpen ? 'rotate-180' : ''}`}
                />
              </div>

              {isOrderStatusOpen && (
                <ul className='absolute top-[40px] left-0 z-10 w-full overflow-y-auto rounded-lg bg-white shadow-md'>
                  {ORDER_STATUS_FILTER.map((s) => (
                    <li
                      key={s.key}
                      onClick={() => {
                        setValue('status', s.key);
                        setIsOrderStatusOpen(false);
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

          {/* Order Sort */}
          <div ref={ordersortRef} className='xs:w-48 relative whitespace-nowrap'>
            <div className='block w-full rounded-lg border border-gray-200 px-4 py-2'>
              <div
                className='flex cursor-pointer items-center justify-between gap-3 rounded-xl bg-white'
                onClick={() => setIsOrderSortOpen((prev) => !prev)}
              >
                <div className='flex items-center gap-3'>
                  <p className='text-gray-600'>
                    {SORT_ORDER.find((s) => s.key === (searchParams.get('sort') || 'desc'))?.label}
                  </p>
                </div>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-gray-600 transition-transform ${isOrderSortOpen ? 'rotate-180' : ''}`}
                />
              </div>

              {isOrderSortOpen && (
                <ul className='absolute top-[40px] left-0 z-10 w-full overflow-y-auto rounded-lg bg-white shadow-md'>
                  {SORT_ORDER.map((s) => (
                    <li
                      key={s.key}
                      onClick={() => {
                        setValue('sort', s.key);
                        setIsOrderSortOpen(false);
                        const param = new URLSearchParams(searchParams);
                        param.set('sort', s.key);
                        setSearchParams(param);
                      }}
                      className={`cursor-pointer px-4 py-3 hover:bg-gray-100 ${
                        searchParams.get('sort') === s.key ? 'bg-gray-200 font-semibold' : ''
                      }`}
                    >
                      {s.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Filter Date */}
          <div ref={dateFilteref} className='xs:w-48 relative whitespace-nowrap'>
            <div className='block w-full rounded-lg border border-gray-200 px-4 py-2'>
              <div
                className='flex cursor-pointer items-center justify-between gap-3 rounded-xl bg-white'
                onClick={() => setIsDateFilterOpen((prev) => !prev)}
              >
                <div className='flex items-center gap-3'>
                  <p className='text-gray-600'>
                    {ORDER_DATE_FILTER.find((s) => s.key === (searchParams.get('date') || 'all'))?.label}
                  </p>
                </div>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-gray-600 transition-transform ${isDateFilterOpen ? 'rotate-180' : ''}`}
                />
              </div>

              {isDateFilterOpen && (
                <ul className='absolute top-[40px] left-0 z-10 w-full overflow-y-auto rounded-lg bg-white shadow-md'>
                  {ORDER_DATE_FILTER.map((s) => (
                    <li
                      key={s.key}
                      onClick={() => {
                        setValue('date', s.key);
                        setIsDateFilterOpen(false);
                        const param = new URLSearchParams(searchParams);
                        param.set('date', s.key);
                        setSearchParams(param);
                      }}
                      className={`cursor-pointer px-4 py-3 hover:bg-gray-100 ${
                        searchParams.get('date') === s.key ? 'bg-gray-200 font-semibold' : ''
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
                {!isLoading &&
                  !isFetching &&
                  isSuccess &&
                  data.orders.map((order: IOrder) => (
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
        {/* pagiantion */}
        {pagination.totalPages > 0 && (
          <div className='navigation mt-5 flex justify-center'>
            <Pagination
              count={pagination.totalPages}
              // onChange={handlePageChange}
              page={currentPage}
              size={isMobile ? 'medium' : 'large'}
              siblingCount={isMobile ? 0 : 1}
              boundaryCount={isMobile ? 1 : 2}
            />
          </div>
        )}
      </div>
      {open && <OrderPreview open={open} orderInfo={order} onClose={() => setOpen(false)} />}
    </div>
  );
};

export default ManageOrders;
