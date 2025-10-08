import { Navigate, Route, Routes } from 'react-router-dom';
import UserLayout from '../../layouts/UserLayout';
import { withSuspense } from '@utils/withSuspense';
import { lazy } from 'react';
import { useAuth } from '@context/AuthContext';
import LoadingSpinner from '@components/common/LoadingSpinner';

const Landing = lazy(() => import('@pages/user/Landing'));
const Jobs = lazy(() => import('@pages/user/Jobs'));
const JobDetail = lazy(() => import('@pages/user/JobDetail'));

const LandingWithSuspense = withSuspense(Landing);
const JobsWithSuspense = withSuspense(Jobs);
const JobDetailWithSuspense = withSuspense(JobDetail);

export default function UserRoute() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  if (user?.role === 'RECRUITER') {
    return <Navigate to='/recruiter' replace />;
  }

  if (user?.role === 'ADMIN') {
    return <Navigate to='/admin' replace />;
  }
  return (
    <Routes>
      <Route path='/' element={<UserLayout />}>
        <Route index element={<LandingWithSuspense />} />
        <Route path='jobs' element={<JobsWithSuspense />} />
        <Route path='job-detail' element={<JobDetailWithSuspense />} />
      </Route>
    </Routes>
  );
}
