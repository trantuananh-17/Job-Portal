import Login from '@pages/auth/Login';
import type { RouteObject } from 'react-router-dom';

const AuthRoute: RouteObject[] = [
  {
    path: '/login',
    element: <Login />
  }
];

export default AuthRoute;
