import DashboardLayout from '@layouts/DashboardLayout';
import { Navigate, type RouteObject } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import RecruiterDashboard from '@pages/recruiter/recruiter-dashboard';

const RecruiterRoute: RouteObject[] = [
  {
    path: '/recruiter',
    element: <ProtectedRoute role='RECRUITER' />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Navigate to='recruiter-dashboard' replace /> },
          { path: 'recruiter-dashboard', element: <RecruiterDashboard /> },
          { path: 'post-job', element: <RecruiterDashboard /> }
        ]
      }
    ]
  }
];

export default RecruiterRoute;
