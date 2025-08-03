import { Router } from 'express';
import asyncWrapper from '~/global/core/async-wrapper.core';
import { allowRole } from '~/global/middlewares/allowRole.middleware';
import { validateSchema } from '~/global/middlewares/validate.middleware';
import { verify } from '~/global/middlewares/verify.middleware';
import { companyController } from '../controllers/company.controller';
import { companyCreateSchema } from '../schemas/company.schema';

const companyRoute = Router();

companyRoute.post(
  '/',
  verify,
  allowRole('RECRUITER'),
  validateSchema(companyCreateSchema),
  asyncWrapper(companyController.create)
);

companyRoute.get('/', asyncWrapper(companyController.getAll));
companyRoute.get('/me', verify, allowRole('RECRUITER'), asyncWrapper(companyController.getMyCompanies));
companyRoute.get('/admin', verify, allowRole('ADMIN'), asyncWrapper(companyController.getAllForAdmin));

export default companyRoute;
