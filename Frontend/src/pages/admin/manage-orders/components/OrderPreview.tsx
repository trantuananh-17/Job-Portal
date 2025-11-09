import type { IOrder } from '@apis/orders/interfaces/order.interface';
import { Box, Button, Card, CardContent, Divider, List, Modal, Typography } from '@mui/material';
import { Eye, Package, User } from 'lucide-react';
import TagOrder from './TagOrder';
import moment from 'moment';
import { convertPrice } from '@utils/formatPrice';

interface Props {
  open: boolean;
  orderInfo: IOrder | null;
  onClose?: () => void;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: {
    xs: 'translate(-50%, -50%)',
    md: 'translate(-50%, -50%)'
  },
  width: '95%',
  maxWidth: 800,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto'
};

const OrderPreview: React.FC<Props> = ({ open, orderInfo, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='order-details-modal'
      aria-describedby='order-details-modal-description'
    >
      <Box sx={style}>
        {/* Header */}
        <Box display='flex' alignItems='center' gap={1} mb={2}>
          <Eye size={20} />
          <Typography variant='h6' fontWeight={400}>
            Chi Tiết Đơn Hàng
          </Typography>
        </Box>

        {/* Thông tin đơn hàng cơ bản */}
        <Card variant='outlined' sx={{ mb: 2 }}>
          <div className='grid grid-cols-1 overflow-hidden rounded-sm sm:grid-cols-2 md:grid-cols-4'>
            <div className='flex items-center justify-start border border-gray-200 bg-gray-100 p-4'>
              <span className='text-sm font-medium text-gray-500'>Trạng thái đơn hàng</span>
            </div>
            <div className='flex items-center justify-start border border-gray-200 p-4'>
              {orderInfo?.status && <TagOrder status={orderInfo.status} />}
            </div>
            <div className='flex items-center justify-start border border-gray-200 bg-gray-100 p-4'>
              <span className='text-sm font-medium text-gray-500'>Ngày đặt</span>
            </div>
            <div className='flex items-center justify-start border border-gray-200 p-4'>
              <div className='text-sm font-medium text-gray-600'>
                {orderInfo?.orderDate && moment(orderInfo.orderDate).format('DD/MM/yyyy hh:mm a')}
              </div>
            </div>
          </div>
        </Card>

        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
          {/* Thông tin khách hàng */}
          <Card variant='outlined' sx={{ mb: 2 }}>
            <div className='flex items-center gap-1 px-2 py-1'>
              <User size={18} />
              <Typography variant='subtitle1' fontWeight={500}>
                Thông tin khách hàng
              </Typography>
            </div>
            <Divider />
            <CardContent>
              <div className='flex flex-col gap-2'>
                <Typography variant='body2'>
                  <span className='text-gray-400'>Tên: </span> {orderInfo?.recruiter.name}
                </Typography>
                <Typography variant='body2'>
                  <span className='text-gray-400'>Email: </span>
                  {orderInfo?.recruiter.email}
                </Typography>
              </div>
            </CardContent>
          </Card>

          {/* Danh sách sản phẩm */}
          <Card variant='outlined' sx={{ mb: 2 }}>
            <div className='flex items-center gap-1 px-2 py-1'>
              <Package size={18} />
              <Typography variant='subtitle1' fontWeight={500}>
                Thông tin gói dịch vụ
              </Typography>
            </div>
            <Divider />
            <CardContent>
              <div className='flex flex-col gap-2'>
                <Typography variant='body2'>
                  <span className='text-gray-400'>Tên: </span> {orderInfo?.package.label}
                </Typography>
                <Typography variant='body2'>
                  <span className='text-gray-400'>Số lượng bài đăng: </span>
                  {orderInfo?.package.jobPostLimit}
                </Typography>
                <Typography variant='body2'>
                  <span className='text-gray-400'>Giá </span>
                  {convertPrice(orderInfo?.package.price!)}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </div>
      </Box>
    </Modal>
  );
};

export default OrderPreview;
