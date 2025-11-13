import ProfileDropdown from '@components/recruiter/ProfileDropdown';
import NavigationItem from '@components/recruiter/NavigationItem';
import { Briefcase, Building2, LogOut, Menu, X, type LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import AdminProfileDropdown from '@components/admin/AdminProfileDropdown';

interface Props {
  menu: {
    id: string;
    name: string;
    icon: LucideIcon;
  }[];
  admin?: boolean;
}

const DashboardLayout: React.FC<Props> = ({ menu, admin }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    if (!profileDropdownOpen) return;

    const handleClickOutside = () => {
      if (profileDropdownOpen) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [profileDropdownOpen]);

  const handleNavigation = (itemId: string) => {
    navigate(`/${itemId}`);

    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const toggleSideBar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const sidebarCollapsed = !isMobile && false;

  return (
    <div className=''>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ${
          isMobile ? (sidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'
        } ${sidebarCollapsed ? 'w-16' : 'w-64'} border-r border-gray-200 bg-white`}
      >
        {/* Company Logo */}
        <div className='flex h-16 items-center border-b border-gray-200 pl-6'>
          {!sidebarCollapsed ? (
            <Link to='/' className='flex items-center space-x-3'>
              <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700'>
                <Briefcase className='h-5 w-5 text-white' />
              </div>
              <span className='text-xl font-bold text-gray-800'>JobPortal</span>
            </Link>
          ) : (
            <div className='flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700'>
              <Building2 className='h-5 w-5 text-white' />
            </div>
          )}
        </div>
        {/* Navigation */}
        <nav className='space-y-2 p-4'>
          {menu.map((item) => (
            <NavigationItem
              key={item.id}
              item={item}
              isActive={location.pathname.startsWith(`/${item.id}`)}
              onClick={handleNavigation}
              isCollapsed={sidebarCollapsed}
            />
          ))}
        </nav>

        {/* Logout */}
        <div className='absolute right-4 bottom-4 left-4'>
          <button className='text-gray=600 flex w-full cursor-pointer items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-gray-100 hover:text-gray-800'>
            <LogOut className='h-5 w-5 flex-shrink-0 text-gray-500' />
            {!sidebarCollapsed && <span className='ml-3'>Logout</span>}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div className='absolute inset-0 z-40 bg-black/40' onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div
        className={`flex flex-1 flex-col transition-all duration-300 ${isMobile ? 'ml-0' : sidebarCollapsed ? 'ml-16' : 'ml-64'}`}
      >
        {/* Top Nav */}
        <header className='sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white/30 px-6 backdrop-blur-sm'>
          <div className='flex items-center space-x-4'>
            {isMobile && (
              <button
                onClick={toggleSideBar}
                className='rounded-xl p-2 transition-colors duration-200 hover:bg-gray-100'
              >
                {sidebarOpen ? <X className='h-5 w-5 text-gray-600' /> : <Menu className='h-5 w-5 text-gray-600' />}
              </button>
            )}
            <div>
              <h1 className='text-base font-semibold'>Welcome back!</h1>
              <p className='hidden text-sm text-gray-500 md:block'>Here's what's happening with your jobs today.</p>
            </div>
          </div>

          <div className='flex items-center space-x-3'>
            {/* Profile dropdown */}
            {!admin ? (
              <ProfileDropdown
                isOpen={profileDropdownOpen}
                avatar={''}
                companyName='Tanh Haui'
                email='anhhaui@gmail.com'
                onToggle={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  setProfileDropdownOpen(!profileDropdownOpen);
                }}
              />
            ) : (
              <AdminProfileDropdown
                isOpen={profileDropdownOpen}
                avatar={''}
                companyName='Tuấn Anh'
                email='admin@gmail.com'
                onToggle={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  setProfileDropdownOpen(!profileDropdownOpen);
                }}
              />
            )}
          </div>
        </header>

        {/*Main Content Area*/}
        <main className=''>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
