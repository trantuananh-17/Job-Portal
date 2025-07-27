import { Application } from 'express';
import userRoute from '~/modules/user/routes/user.route';

function appRoutes(app: Application) {
  app.use('/api/v1/users', userRoute);
}

export default appRoutes;
