import type { RouteObject } from 'react-router-dom';
import UserLayout from '../../layouts/UserLayout';
import Landing from '@pages/user/Landing';
import Jobs from '@pages/user/Jobs';

const UserRoute: RouteObject[] = [
  {
    path: '',
    element: <UserLayout />,
    children: [
      { index: true, element: <Landing /> },
      { path: 'jobs', element: <Jobs /> }
    ]
  }
];

export default UserRoute;
