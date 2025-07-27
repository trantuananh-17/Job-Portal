import { Application } from 'express';
import authRoute from '~/modules/user/routes/auth.route';
import userRoute from '~/modules/user/routes/user.route';

function appRoutes(app: Application) {
  app.use('/api/v1/users', userRoute);
  app.use('/api/v1/auth', authRoute);
}

export default appRoutes;
