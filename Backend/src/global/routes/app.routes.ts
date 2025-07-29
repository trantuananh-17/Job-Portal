import { Application } from 'express';
import candidateLanguageRoute from '~/modules/candidate-profile/routes/candidate-language.route';
import candidateProfileRoute from '~/modules/candidate-profile/routes/candidate-profile.route';
import authRoute from '~/modules/user/routes/auth.route';
import userRoute from '~/modules/user/routes/user.route';

function appRoutes(app: Application) {
  app.use('/api/v1/users', userRoute);
  app.use('/api/v1/auth', authRoute);
  app.use('/api/v1/candidate-profiles', candidateProfileRoute);
  app.use('/api/v1/candidate-languages', candidateLanguageRoute);
}

export default appRoutes;
