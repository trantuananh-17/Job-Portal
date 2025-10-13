import { Router } from 'express';
import asyncWrapper from '~/global/core/async-wrapper.core';
import { allowRole } from '~/global/middlewares/allowRole.middleware';
import { validateSchema } from '~/global/middlewares/validate.middleware';
import { verify } from '~/global/middlewares/verify.middleware';
import { companyController } from '../controllers/company.controller';
import { companyApprovedSchema, companyCreateSchema, companyUpdateSchema } from '../schemas/company.schema';

const companyRoute = Router();

companyRoute.get('/', asyncWrapper(companyController.getAll));

companyRoute.get('/me/get-all', verify, allowRole('RECRUITER'), asyncWrapper(companyController.getMyCompanies));
companyRoute.get('/auth/me', verify, allowRole('RECRUITER'), asyncWrapper(companyController.getMyCompany));
companyRoute.post(
  '/',
  verify,
  allowRole('RECRUITER'),
  validateSchema(companyCreateSchema),
  asyncWrapper(companyController.create)
);

companyRoute.get('/:id', asyncWrapper(companyController.getOne));

companyRoute.patch(
  '/:id',
  verify,
  allowRole('RECRUITER'),
  validateSchema(companyUpdateSchema),
  asyncWrapper(companyController.update)
);
companyRoute.patch(
  '/approved/:id',
  verify,
  allowRole('ADMIN'),
  validateSchema(companyApprovedSchema),
  asyncWrapper(companyController.updateApproved)
);
companyRoute.delete('/:id', verify, allowRole('RECRUITER'), asyncWrapper(companyController.remove));

companyRoute.get('/admin/get-all', verify, allowRole('ADMIN'), asyncWrapper(companyController.getAllForAdmin));

companyRoute.get('/:id/admin', verify, allowRole('ADMIN'), asyncWrapper(companyController.getOneAdmin));

export default companyRoute;
