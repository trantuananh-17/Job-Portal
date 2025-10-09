import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import LoadingSpinner from '@components/common/LoadingSpinner';

interface ProtectedRouteProps {
  role?: 'ADMIN' | 'RECRUITER' | 'CANDIDATE';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner />;

  if (!isAuthenticated || !user) {
    return <Navigate to='/' state={{ from: location }} replace />;
  }

  if (location.pathname === '/' && user) {
    switch (user.role) {
      case 'ADMIN':
        return <Navigate to='/admin' replace />;
      case 'RECRUITER':
        return <Navigate to='/recruiter' replace />;
      case 'CANDIDATE':
        return <Navigate to='/' replace />;
      default:
        return <Navigate to='/' replace />;
    }
  }

  if (role && user.role !== role) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
