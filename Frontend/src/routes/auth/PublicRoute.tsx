import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import LoadingSpinner from '@components/common/LoadingSpinner';
import { useEffect, useState } from 'react';

const PublicRoute = () => {
  const { isAuthenticated, user } = useAuth();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShowLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  if (showLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (isAuthenticated && user) {
    switch (user.role) {
      case 'ADMIN':
        return <Navigate to='/admin' replace />;
      case 'RECRUITER':
        return <Navigate to='/recruiter' replace />;
      default:
        return <Navigate to='/' replace />;
    }
  }

  return <Outlet />;
};

export default PublicRoute;
