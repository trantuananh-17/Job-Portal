import { useState } from 'react';
import LOGO from '../../assets/images/img_logo.png';
import { menuItems } from '../../constant/menuItem';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [active, setActive] = useState('Home');

  const handleNav = (item: string) => {
    setActive(item);
  };

  const toSlug = (str: string) => {
    return str
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
  };

  return (
    <header className='fixed top-0 left-0 z-50 w-[100%] bg-black text-white'>
      <div className='container flex items-center justify-between'>
        <div className='flex items-center gap-[10px]'>
          <img src={LOGO} className='image h-7 w-7' alt='LOGO ICON' />
          <p className='text-[20px] font-semibold'>Job Portal</p>
        </div>

        <nav>
          <ul className='flex items-center justify-between gap-5'>
            {menuItems.map((item) => (
              <li
                className={`relative cursor-pointer after:absolute after:bottom-[-5px] after:left-0 after:h-[1.5px] after:w-full after:scale-x-0 after:bg-gray-300 after:transition-all after:duration-300 hover:after:-scale-x-100 ${active === item ? 'opacity-100' : 'opacity-60'}`}
                key={item}
                onClick={() => handleNav(item)}
              >
                <NavLink to={item === 'Home' ? '/' : toSlug(item)}>{item}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className='flex gap-5'>
          <button type='button' className='font-semibold'>
            Login
          </button>
          <button type='button' className='gap-2.5 rounded-lg bg-[#309689] px-5 py-[14px] font-semibold'>
            Register
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
