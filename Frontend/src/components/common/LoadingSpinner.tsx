import { Briefcase } from 'lucide-react';

interface Props {}

const LoadingSpinner: React.FC<Props> = ({}) => {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50'>
      <div className='text-center'>
        <div className='relative'>
          <div className='mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600'></div>
          <div className='absolute inset-0 flex items-center justify-center'>
            <Briefcase className='h-6 w-6 text-blue-600' />
          </div>
        </div>

        <p className='font-medium text-gray-600'>Finding amazing opportunities...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
