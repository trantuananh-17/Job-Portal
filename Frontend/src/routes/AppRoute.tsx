import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './auth/ProtectedRoute';
import AuthRoute from './auth/AuthRoute';
import UserRoute from './user/UserRoute';
import RecruiterRoute from './recruiter/RecruiterRoute';

export default function AppRoute() {
  return (
    <Routes>
      <Route path='/auth/*' element={<AuthRoute />} />
      <Route path='/*' element={<UserRoute />} />
      {/* <Route element={<ProtectedRoute role='RECRUITER' />}> */}
      <Route path='/recruiter/*' element={<RecruiterRoute />} />
      {/* </Route> */}
    </Routes>
  );
}
