import ButtonForm from '@components/common/ButtonForm';
import { Box, Modal } from '@mui/material';
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  Clock,
  FileText,
  Globe,
  Info,
  Locate,
  LocationEdit,
  Mail,
  Map,
  MapPin,
  Users,
  X
} from 'lucide-react';

const company = {
  id: 1,
  name: 'Tanh',
  description: 'TOP-IT-Haui',
  teamSize: 5000,
  establishmentDate: '19/09/2004',
  views: 0,
  websiteUrl: 'https://meta.com',
  status: 'PENDING',
  isApproved: true,
  mapLink: 'https://maps.app.goo.gl/f6JQ4oZwCuWbWX4Jz7',
  address: 'Nhổn, Bắc Từ Liêm, Hà Nội',
  avatarUrl: 'https://guchat.vn/wp-content/uploads/2025/04/anh-meo-cute-2-1.jpg',
  createdAt: '2025-10-20T10:58:47.614Z',
  updatedAt: '2025-10-21T13:24:23.033Z',
  user: {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'abc@gmail.com',
    avatar: 'https://guchat.vn/wp-content/uploads/2025/04/anh-meo-cute-2-1.jpg'
  }
};

interface Props {
  companyId: string | null;
  open: boolean;
  onClose?: () => void;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: 800,
  bgcolor: 'background.paper',
  boxShadow: 20,
  borderRadius: 3,
  p: 0,
  outline: 'none'
};

const CompanyPreview: React.FC<Props> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='company-preview-modal'
      aria-describedby='company-preview-content'
    >
      <Box sx={style}>
        <div className='mx-auto max-w-4xl'>
          <div className='rounded-2xl border-white/20 bg-white/80 p-6 shadow-xl backdrop-blur-sm'>
            <div className='flex items-center justify-between'>
              <h1 className='bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-lg font-bold text-transparent md:text-xl'>
                Company Preview
              </h1>
              <button
                onClick={onClose}
                className='group spacex-2 flex transform items-center gap-1 rounded-xl border border-gray-200 bg-white p-3 text-xs font-medium text-gray-600 shadow-lg shadow-gray-100 transition-all duration-200 hover:-translate-y-0.5 hover:border-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white hover:shadow-xl md:px-6 md:py-3 md:text-sm'
              >
                <ArrowLeft className='h-4 w-4 transition-transform group-hover:-translate-x-1' />
                <span className='hidden sm:block'>Back to overview</span>
              </button>
            </div>

            {/* Nội dung chi tiết công ty */}
            <div className='grid grid-cols-1 border-b border-gray-200 py-6'>
              <div className='space-y-6 px-4 text-gray-700'>
                <div className='border-b border-gray-200' />
                <div className='grid grid-cols-1 sm:grid-cols-2'>
                  {/* Logo */}
                  <div className='flex items-center space-x-4'>
                    <img
                      src={company.user.avatar}
                      alt='Company Logo'
                      className='h-20 w-20 rounded-full border-4 border-blue-50 object-cover'
                    />
                    <div>
                      <h3 className='text-lg font-semibold text-gray-800'>{company.user.name}</h3>
                      <div className='mt-1 flex items-center text-sm text-gray-600'>
                        <Mail className='mr-2 h-4 w-4' />
                        <span>{company.user.email}</span>
                      </div>
                    </div>
                  </div>
                  {/* Company Logo and Name */}
                  <div className='flex items-center space-x-4'>
                    <img
                      src={company.avatarUrl}
                      alt='Company Logo'
                      className='h-20 w-20 rounded-lg border-4 border-blue-500/20 object-cover'
                    />

                    <div>
                      <h3 className='text-lg font-semibold text-gray-800'>{company.name}</h3>

                      <div className='mt-1 flex items-center text-sm text-gray-600'>
                        <Building2 className='mr-2 h-4 w-4' />
                        <span>Company</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='flex flex-col gap-2'>
                  <p className='flex items-center gap-1 text-lg font-medium'>
                    <FileText className='h-5 w-5 text-gray-400' />
                    <span className=''> Description: {company.description}</span>
                  </p>
                  <p className='flex items-center gap-1 text-lg font-medium'>
                    <MapPin className='h-5 w-5 text-gray-400' />
                    <span className=''> Address: {company.address}</span>
                  </p>
                  <p className='flex items-center gap-1 text-lg font-medium'>
                    <Globe className='h-5 w-5 text-gray-400' />
                    <span className=''>
                      {' '}
                      Website:{' '}
                      <a
                        href='https://www.abccompany.vn'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-600 hover:underline'
                      >
                        www.abccompany.vn
                      </a>
                    </span>
                  </p>
                  <div className='grid grid-cols-1 sm:grid-cols-2'>
                    <p className='flex items-center gap-1 text-lg font-medium'>
                      <Users className='h-5 w-5 text-gray-400' />
                      <span className=''> Team Size: {company.teamSize}</span>
                    </p>
                    <p className='flex items-center gap-1 text-lg font-medium'>
                      <CalendarDays className='h-5 w-5 text-gray-400' />
                      <span className=''>Establishment: {company.establishmentDate}</span>
                    </p>
                  </div>

                  <div className='grid grid-cols-1 sm:grid-cols-2'>
                    <p className='flex items-center gap-1 text-lg font-medium'>
                      <Clock className='h-5 w-5 text-gray-400' />
                      <span className=''>Created At: {company.establishmentDate}</span>
                    </p>

                    <p className='flex items-center gap-1 text-lg font-medium'>
                      <CalendarDays className='h-5 w-5 text-gray-400' />
                      <span className=''>Updated At: {company.establishmentDate}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* button */}
            <div className='flex justify-end-safe py-4'>
              <ButtonForm
                name='Khôi phục'
                className='bg-primary text-white hover:from-blue-500 hover:to-blue-600 hover:text-white'
              />
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default CompanyPreview;
