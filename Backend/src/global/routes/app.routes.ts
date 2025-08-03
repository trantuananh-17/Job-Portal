import { Application } from 'express';
import candidateEducationRoute from '~/modules/candidate-profile/routes/candidate-education.route';
import candidateExperienceRoute from '~/modules/candidate-profile/routes/candidate-experience.route';
import candidateLanguageRoute from '~/modules/candidate-profile/routes/candidate-language.route';
import candidateProfileRoute from '~/modules/candidate-profile/routes/candidate-profile.route';
import candidateSkillRoute from '~/modules/candidate-profile/routes/candidate-skill.route';
import companyRoute from '~/modules/company/routes/company.route';
import authRoute from '~/modules/user/routes/auth.route';
import userRoute from '~/modules/user/routes/user.route';

function appRoutes(app: Application) {
  app.use('/api/v1/users', userRoute);
  app.use('/api/v1/auth', authRoute);
  app.use('/api/v1/candidate-profiles', candidateProfileRoute);
  app.use('/api/v1/candidate-languages', candidateLanguageRoute);
  app.use('/api/v1/candidate-educations', candidateEducationRoute);
  app.use('/api/v1/candidate-skills', candidateSkillRoute);
  app.use('/api/v1/candidate-experiences', candidateExperienceRoute);
  app.use('/api/v1/companies', companyRoute);
}

export default appRoutes;
