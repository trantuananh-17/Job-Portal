import { Router } from 'express';
import asyncWrapper from '~/global/core/async-wrapper.core';
import { companyIndustryController } from '../controllers/company-industry.controller';
import { verify } from '~/global/middlewares/verify.middleware';
import { allowRole } from '~/global/middlewares/allowRole.middleware';
import { validateSchema } from '~/global/middlewares/validate.middleware';
import { companyIndustrySchema } from '../schemas/company-industry.schema';

const companyIndustryRoute = Router();

companyIndustryRoute.post(
  '/:companyId',
  verify,
  allowRole('RECRUITER'),
  validateSchema(companyIndustrySchema),
  asyncWrapper(companyIndustryController.create)
);

companyIndustryRoute.get('/:companyId', asyncWrapper(companyIndustryController.getByCompanyId));

companyIndustryRoute.delete(
  '/:companyId',
  verify,
  allowRole('RECRUITER'),
  validateSchema(companyIndustrySchema),
  asyncWrapper(companyIndustryController.delete)
);

export default companyIndustryRoute;
