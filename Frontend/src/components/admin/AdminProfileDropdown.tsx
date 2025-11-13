import { ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  avatar: string;
  companyName: string;
  email: string;
  onToggle: (e: React.MouseEvent) => void;
  onLogout?: () => void;
}

const AdminProfileDropdown: React.FC<Props> = ({ isOpen, avatar, companyName, email, onLogout, onToggle }) => {
  const navigate = useNavigate();

  return (
    <div className='relative'>
      <button
        onClick={onToggle}
        className='flex items-center space-x-3 rounded-xl p-2 transition-colors duration-200 hover:bg-gray-50'
      >
        {avatar ? (
          <img src={avatar} alt='avatar' className='h-9 w-9 rounded-xl object-cover' />
        ) : (
          <div className='flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600'>
            <span className='text-sm font-semibold text-white'>{companyName.charAt(0).toUpperCase()}</span>
          </div>
        )}
        <div className='hidden text-left md:block'>
          <p className='text-sm font-medium text-gray-800'>{companyName}</p>
          <p className='text-xs'>Admin</p>
        </div>
        <ChevronDown className='h-4 w-4 text-gray-400' />
      </button>

      {isOpen && (
        <div className='x-50 absolute right-0 mt-2 w-56 rounded-xl border border-gray-100 bg-white py-2 shadow-lg'>
          <div className='border-b border-gray-100 px-4 py-3'>
            <p className='border-gray-100 text-sm font-medium'>{companyName}</p>
            <p className='text-xs text-gray-500'>{email}</p>
          </div>

          <Link
            to={'/admin/admin-profile'}
            className='block px-4 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-50'
          >
            View Profile
          </Link>

          <div className='mt-2 border-t border-gray-100 pt-2'>
            <a
              href='#'
              onClick={onLogout}
              className='block px-4 py-2 text-sm text-red-600 transition-colors duration-200 hover:bg-red-50'
            >
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfileDropdown;
