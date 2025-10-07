import { withSuspense } from '@utils/withSuspense';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import UserLayout from '../../layouts/UserLayout';

const Landing = lazy(() => import('@pages/user/Landing'));
const Jobs = lazy(() => import('@pages/user/Jobs'));
const JobDetail = lazy(() => import('@pages/user/JobDetail'));

export default function UserRoute() {
  return (
    <Routes>
      <Route path='/' element={<UserLayout />}>
        <Route index element={withSuspense(Landing)} />
        <Route path='jobs' element={withSuspense(Jobs)} />
        <Route path='job-detail' element={withSuspense(JobDetail)} />
      </Route>
    </Routes>
  );
}
