import { Router } from 'express';
import asyncWrapper from '~/global/core/async-wrapper.core';
import { allowRole } from '~/global/middlewares/allowRole.middleware';
import { verify } from '~/global/middlewares/verify.middleware';
import { jobRoleController } from '../controllers/job-role.controller';
import { validateSchema } from '~/global/middlewares/validate.middleware';
import { jobRoleCreateSchema } from '../schemas/job-role.schemas';

const jobRoleRoute = Router();

jobRoleRoute.post(
  '/',
  verify,
  allowRole('ADMIN'),
  validateSchema(jobRoleCreateSchema),
  asyncWrapper(jobRoleController.create)
);

jobRoleRoute.get('/', verify, allowRole('ADMIN'), asyncWrapper(jobRoleController.getAll));
jobRoleRoute.delete('/:name', verify, allowRole('ADMIN'), asyncWrapper(jobRoleController.delete));

export default jobRoleRoute;
