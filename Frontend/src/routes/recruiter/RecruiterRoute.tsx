import { RecruiterAuthProvider } from '@context/RecruiterContext';
// import DashboardLayout from '@layouts/DashboardLayout';
import { withSuspense, withSuspenseDashboard } from '@utils/withSuspense';
import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const DashboardLayout = lazy(() => import('@layouts/DashboardLayout'));
const RecruiterDashboard = lazy(() => import('@pages/recruiter/recruiter-dashboard'));
const PostJob = lazy(() => import('@pages/recruiter/post-job'));
const JobManager = lazy(() => import('@pages/recruiter/job-manager'));

const DashboardLayoutWithSuspense = withSuspense(DashboardLayout);
const RecruiterDashboardWithSuspense = withSuspenseDashboard(RecruiterDashboard);
const PostJobWithSuspense = withSuspenseDashboard(PostJob);
const JobManagerWithSuspense = withSuspenseDashboard(JobManager);

export default function RecruiterRoute() {
  return (
    <RecruiterAuthProvider>
      <Routes>
        <Route element={<DashboardLayoutWithSuspense />}>
          <Route index element={<Navigate to='recruiter-dashboard' replace />} />
          <Route path='recruiter-dashboard' element={<RecruiterDashboardWithSuspense />} />
          <Route path='post-job' element={<PostJobWithSuspense />} />
          <Route path='manage-jobs' element={<JobManagerWithSuspense />} />
        </Route>
      </Routes>
    </RecruiterAuthProvider>
  );
}
