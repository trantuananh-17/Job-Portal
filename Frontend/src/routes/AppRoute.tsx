import type { RouteObject } from 'react-router-dom';
import UserRoute from './user/UserRoute';
import RecruiterRoute from './recruiter/RecruiterRoute';
import AuthRoute from './auth/AuthRoute';

const AppRoute: RouteObject[] = [...AuthRoute, ...UserRoute, ...RecruiterRoute];

export default AppRoute;
