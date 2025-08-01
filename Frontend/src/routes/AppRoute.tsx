import type { RouteObject } from 'react-router-dom';
import UserRoute from './user/UserRoute';

const AppRoute: RouteObject[] = [...UserRoute];

export default AppRoute;
