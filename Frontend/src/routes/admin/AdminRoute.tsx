import { ADMIN_NAVIGATION_MENU } from '@utils/data';
import { withSuspense, withSuspenseDashboard } from '@utils/withSuspense';
import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const DashboardLayout = lazy(() => import('@layouts/DashboardLayout'));
const ManageCompanies = lazy(() => import('@pages/admin/manage-companies'));
const AdminDashboard = lazy(() => import('@pages/admin/admin-dashboard'));
const ManagePackages = lazy(() => import('@pages/admin/manage-packages'));
const ManageOrders = lazy(() => import('@pages/admin/manage-orders'));
const ManageUsers = lazy(() => import('@pages/admin/manage-users'));
const ManageJobs = lazy(() => import('@pages/admin/manage-jobs'));
const JobDetail = lazy(() => import('@pages/admin/job-detail'));

const DashboardLayoutWithSuspense = withSuspense(DashboardLayout);
const ManageCompaniesWithSuspense = withSuspenseDashboard(ManageCompanies);
const AdminDashboardWithSuspense = withSuspenseDashboard(AdminDashboard);
const ManagePackagesWithSuspense = withSuspenseDashboard(ManagePackages);
const ManageOrdersWithSuspense = withSuspenseDashboard(ManageOrders);
const ManageUsersWithSuspense = withSuspenseDashboard(ManageUsers);
const ManageJobsWithSuspense = withSuspenseDashboard(ManageJobs);
const JobDetailWithSuspense = withSuspenseDashboard(JobDetail);

export default function AdminRoute() {
  return (
    <Routes>
      <Route element={<DashboardLayoutWithSuspense menu={ADMIN_NAVIGATION_MENU} admin />}>
        <Route index element={<Navigate to='admin-dashboard' replace />} />
        <Route path='manage-companies' element={<ManageCompaniesWithSuspense />} />
        <Route path='admin-dashboard' element={<AdminDashboardWithSuspense />} />
        <Route path='manage-packages' element={<ManagePackagesWithSuspense />} />
        <Route path='manage-orders' element={<ManageOrdersWithSuspense />} />
        <Route path='manage-users' element={<ManageUsersWithSuspense />} />
        <Route path='manage-jobs' element={<ManageJobsWithSuspense />} />
        <Route path='job-detail/:id' element={<JobDetailWithSuspense />} />
      </Route>
    </Routes>
  );
}
