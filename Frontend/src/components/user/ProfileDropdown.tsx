import { useAuth } from '@context/AuthContext';
import { ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  avatar: string;
  name: string;
  email: string;
  onToggle: (e: React.MouseEvent) => void;
  onLogout?: () => void;
}

const ProfileDropdown: React.FC<Props> = ({ isOpen, avatar, name, email, onLogout, onToggle }) => {
  const navigate = useNavigate();

  return (
    <div className='relative cursor-pointer'>
      <button
        onClick={onToggle}
        className='flex cursor-pointer items-center space-x-3 rounded-xl p-2 transition-colors duration-200 hover:bg-gray-900'
      >
        {avatar ? (
          <img src={avatar} alt='avatar' className='h-9 w-9 rounded-xl object-cover' />
        ) : (
          <div className='bg-primary flex h-8 w-8 items-center justify-center rounded-xl'>
            <span className='text-sm font-semibold text-white'>{name.charAt(0).toUpperCase()}</span>
          </div>
        )}
        <div className='hidden text-left sm:block'>
          <p className='text-sm font-medium text-white'>{name}</p>
          <p className='text-xs'>Candidate</p>
        </div>
        <ChevronDown className='h-4 w-4 text-gray-400' />
      </button>

      {/* Open */}
      <div
        className={`absolute right-0 mt-2 w-56 origin-top transform rounded-xl border border-gray-100 bg-white py-2 shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen
            ? 'visible translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none invisible -translate-y-3 opacity-0'
        }`}
      >
        <div className='border-b border-gray-100 px-4 py-3'>
          <p className='text-sm font-medium text-gray-800'>{name}</p>
          <p className='text-xs text-gray-500'>{email}</p>
        </div>

        <Link
          to='/candidate/profile'
          className='block px-4 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-50'
        >
          View Profile
        </Link>

        <div className='mt-2 border-t border-gray-100 pt-2'>
          <button
            onClick={onLogout}
            className='block px-4 py-2 text-sm text-red-600 transition-colors duration-200 hover:bg-red-50'
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
