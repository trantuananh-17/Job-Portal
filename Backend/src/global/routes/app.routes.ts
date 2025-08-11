import { Application } from 'express';
import candidateEducationRoute from '~/modules/candidate-profile/routes/candidate-education.route';
import candidateExperienceRoute from '~/modules/candidate-profile/routes/candidate-experience.route';
import candidateLanguageRoute from '~/modules/candidate-profile/routes/candidate-language.route';
import candidateProfileRoute from '~/modules/candidate-profile/routes/candidate-profile.route';
import candidateSkillRoute from '~/modules/candidate-profile/routes/candidate-skill.route';
import companyImageRoute from '~/modules/company/routes/company-image.route';
import companyIndustryRoute from '~/modules/company/routes/company-industry.route';
import companyRoute from '~/modules/company/routes/company.route';
import packageRoute from '~/modules/package/routes/package.route';
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
  app.use('/api/v1/company-images', companyImageRoute);
  app.use('/api/v1/company-industries', companyIndustryRoute);
  app.use('/api/v1/packages', packageRoute);
}

export default appRoutes;
