import { Router } from 'express';
import asyncWrapper from '~/global/core/async-wrapper.core';
import { candidateProfileController } from '../controllers/candidate-profile.controller';
import { verify } from '~/global/middlewares/verify.middleware';
import { permission } from '~/global/middlewares/permission.middlerware';
import { allowRole } from '~/global/middlewares/allowRole.middleware';
import { validateSchema } from '~/global/middlewares/validate.middleware';
import { candidateProfileCreateSchema, candidateProfileUpdateSchema } from '../schemas/candidate-profile.schema';

const candidateProfileRoute = Router();

candidateProfileRoute.post(
  '/',
  verify,
  validateSchema(candidateProfileCreateSchema),
  asyncWrapper(candidateProfileController.create)
);
candidateProfileRoute.get('/', verify, allowRole('ADMIN'), asyncWrapper(candidateProfileController.getAll));
candidateProfileRoute.get(
  '/:id',
  verify,
  permission('candidateProfile', 'userId'),
  asyncWrapper(candidateProfileController.getOne)
);
candidateProfileRoute.patch(
  '/:id',
  verify,
  validateSchema(candidateProfileUpdateSchema),
  permission('candidateProfile', 'userId'),
  asyncWrapper(candidateProfileController.update)
);
candidateProfileRoute.patch(
  '/open-to-work/:id',
  verify,
  permission('candidateProfile', 'userId'),
  asyncWrapper(candidateProfileController.changeOpenToWorkStatus)
);
candidateProfileRoute.delete(
  '/:id',
  verify,
  permission('candidateProfile', 'userId'),
  asyncWrapper(candidateProfileController.delete)
);

export default candidateProfileRoute;
