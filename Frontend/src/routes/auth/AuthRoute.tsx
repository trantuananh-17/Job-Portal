import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import { withSuspense } from '@utils/withSuspense';
import PublicRoute from './PublicRoute';

const Login = lazy(() => import('@pages/auth/Login'));

export default function AuthRoute() {
  return (
    <Routes>
      <Route path='/' element={<PublicRoute />}>
        <Route path='login' element={withSuspense(Login)} />
      </Route>
    </Routes>
  );
}
