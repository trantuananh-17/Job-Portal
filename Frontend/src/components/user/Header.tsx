import { useEffect, useState } from 'react';
import LOGO from '../../assets/images/img_logo.png';
import { menuItems } from '../../constant/menuItem';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { BriefcaseBusiness, Menu, X } from 'lucide-react';
import { useAuth } from '@context/AuthContext';
import ProfileDropdown from './ProfileDropdown';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useAuth();

  const [active, setActive] = useState('Home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleNav = (item: string) => {
    const slug = item.toLowerCase() === 'home' ? '/' : `/${toSlug(item)}`;
    navigate(slug);
    setActive(item);

    if (isMobile) setSidebarOpen(false);
  };

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
    const handleClickOutside = () => {
      if (profileDropdownOpen) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [profileDropdownOpen]);

  //  Lock scroll khi sidebar mở
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  const toggleSideBar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toSlug = (str: string) => {
    return str
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
  };

  const capitalizeWords = (str: string) => str.replace(/\b\w/g, (char) => char.toUpperCase());

  useEffect(() => {
    const currentPath = location.pathname === '/' ? 'Home' : location.pathname.replace('/', '').replace('-', ' ');
    setActive(capitalizeWords(currentPath));
  }, [location]);

  const handleLogout = async () => {
    await logout();
    navigate('/auth/login');
  };

  return (
    <header className='fixed top-0 left-0 z-50 w-full bg-black text-white shadow-md'>
      <div className='mx-auto flex h-[70px] w-full max-w-7xl items-center justify-between px-6'>
        {/* Logo */}
        <NavLink to='/' className='flex items-center gap-2'>
          <BriefcaseBusiness className='h-7 w-7' />
          <p className='text-xl font-semibold'>Job Portal</p>
        </NavLink>

        {/* Navigation */}
        {!isMobile ? (
          <>
            <nav>
              <ul className='flex items-center gap-6'>
                {menuItems.map((item) => (
                  <li
                    key={item}
                    onClick={() => handleNav(item)}
                    className={`relative cursor-pointer after:absolute after:bottom-[-5px] after:left-0 after:h-[1.5px] after:w-full after:scale-x-0 after:bg-gray-300 after:transition-all after:duration-300 hover:after:scale-x-100 ${
                      active === item ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </nav>
            {!user ? (
              <div className='flex gap-5'>
                <button className='font-semibold' onClick={() => navigate('/auth/login')}>
                  Login
                </button>
                <button className='rounded-lg bg-[#309689] px-5 py-[10px] font-semibold'>Register</button>
              </div>
            ) : (
              <ProfileDropdown
                isOpen={profileDropdownOpen}
                name={user.name}
                email={user.email}
                avatar=''
                onToggle={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  setProfileDropdownOpen(!profileDropdownOpen);
                }}
                onLogout={handleLogout}
              />
            )}
          </>
        ) : (
          <div className='flex'>
            {user && (
              <ProfileDropdown
                isOpen={profileDropdownOpen}
                name={user.name}
                email={user.email}
                avatar=''
                onToggle={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  setProfileDropdownOpen(!profileDropdownOpen);
                }}
                onLogout={handleLogout}
              />
            )}
            <button onClick={toggleSideBar} className='rounded-xl p-2 transition-colors duration-200 hover:bg-gray-900'>
              {sidebarOpen ? <X className='h-5 w-5 text-gray-200' /> : <Menu className='h-5 w-5 text-gray-200' />}
            </button>
          </div>
        )}
      </div>

      {/*  Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 top-0 right-0 z-40 w-3/4 max-w-sm bg-black text-white shadow-lg transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex h-screen flex-col p-6'>
          {/* Header of drawer */}
          <div className='mb-8 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <img src={LOGO} className='h-6 w-6' alt='LOGO ICON' />
              <span className='text-lg font-semibold'>Job Portal</span>
            </div>
            <button onClick={toggleSideBar}>
              <X className='h-6 w-6 text-gray-300' />
            </button>
          </div>
          <div className='flex flex-col gap-10'>
            {/* Menu Items */}
            <ul className='flex flex-col items-center gap-5 text-lg font-medium'>
              {menuItems.map((item) => (
                <li
                  key={item}
                  onClick={() => handleNav(item)}
                  className={` ${active === item ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                >
                  {item}
                </li>
              ))}
            </ul>
            {/* Auth buttons */}
            {!user ? (
              <div className='flex flex-col gap-4'>
                <button className='rounded-md border border-white py-4 font-semibold'>Login</button>
                <button className='bg-primary rounded-md py-4 font-semibold text-white'>Register</button>
              </div>
            ) : (
              <button onClick={handleLogout} className='bg-primary rounded-md py-4 font-semibold text-white'>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity duration-300'
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
