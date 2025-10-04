import Login from '@pages/auth/Login';
import type { RouteObject } from 'react-router-dom';
import PublicRoute from './PublicRoute';

const AuthRoute: RouteObject[] = [
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/login',
        element: <Login />
      }
    ]
  }
];

export default AuthRoute;
