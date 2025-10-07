import { Routes, Route } from 'react-router-dom';

import UserRoute from './user/UserRoute';
import RecruiterRoute from './recruiter/RecruiterRoute';
import AuthRoute from './auth/AuthRoute';

export default function AppRoute() {
  return (
    <Routes>
      <Route path='/*' element={<UserRoute />} />
      <Route path='/auth/*' element={<AuthRoute />} />
      <Route path='/recruiter/*' element={<RecruiterRoute />} />
    </Routes>
  );
}
