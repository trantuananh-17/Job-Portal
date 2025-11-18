import { Router } from 'express';
import { packageController } from '../controllers/package.controller';
import asyncWrapper from '~/global/core/async-wrapper.core';
import { allowRole } from '~/global/middlewares/allowRole.middleware';
import { verify } from '~/global/middlewares/verify.middleware';
import { validateSchema } from '~/global/middlewares/validate.middleware';
import { packageCreateSchema, packageUpdateActiveSchema, packageUpdateSchema } from '../schemas/package.schema';

const packageRoute = Router();

packageRoute.post(
  '/',
  verify,
  allowRole('ADMIN'),
  validateSchema(packageCreateSchema),
  asyncWrapper(packageController.create)
);

packageRoute.get('/admin/get-all', verify, allowRole('ADMIN'), asyncWrapper(packageController.getAllByAdmin));
packageRoute.get('/:id/admin', verify, allowRole('ADMIN'), asyncWrapper(packageController.getOneAdmin));

packageRoute.get('/:id', verify, allowRole('ADMIN', 'RECRUITER'), asyncWrapper(packageController.getOne));
packageRoute.patch(
  '/:id',
  verify,
  allowRole('ADMIN'),
  validateSchema(packageUpdateSchema),
  asyncWrapper(packageController.update)
);
packageRoute.patch(
  '/:id/active',
  verify,
  allowRole('ADMIN'),
  validateSchema(packageUpdateActiveSchema),
  asyncWrapper(packageController.updateActive)
);

export default packageRoute;
