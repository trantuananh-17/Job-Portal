import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import { withSuspense } from '@utils/withSuspense';
import DashboardLayout from '@layouts/DashboardLayout';
import ProtectedRoute from '../auth/ProtectedRoute';

const RecruiterDashboard = lazy(() => import('@pages/recruiter/recruiter-dashboard'));

const RecruiterDashboardWithSuspense = withSuspense(RecruiterDashboard);

export default function RecruiterRoute() {
  return (
    <Routes>
      <Route path='/' element={<ProtectedRoute role='RECRUITER' />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<Navigate to='recruiter-dashboard' replace />} />
          <Route path='recruiter-dashboard' element={<RecruiterDashboardWithSuspense />} />
        </Route>
      </Route>
    </Routes>
  );
}
