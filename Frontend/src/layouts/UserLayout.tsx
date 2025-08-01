import { Outlet } from 'react-router-dom';
import Header from '@components/user/Header';
import Footer from '@components/user/Footer';

const UserLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default UserLayout;
