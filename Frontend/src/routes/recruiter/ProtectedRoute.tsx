import { Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  role?: 'ADMIN' | 'RECRUITER' | 'CANDIDATE'; // quyền cần có
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({}) => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
