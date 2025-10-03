import type { RouteObject } from 'react-router-dom';
import UserRoute from './user/UserRoute';
import RecruiterRoute from './recruiter/RecruiterRoute';

const AppRoute: RouteObject[] = [...UserRoute, ...RecruiterRoute];

export default AppRoute;
