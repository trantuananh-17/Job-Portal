import { Router } from 'express';
import asyncWrapper from '~/global/core/async-wrapper.core';
import { candidateEducationController } from '../controllers/candidate-education.controller';
import { verify } from '~/global/middlewares/verify.middleware';
import { validateSchema } from '~/global/middlewares/validate.middleware';
import { candidateEducationCreateSchema, candidateEducationUpdateSchema } from '../schemas/candidate-education.schema';

const candidateEducationRoute = Router();

candidateEducationRoute.post(
  '/',
  verify,
  validateSchema(candidateEducationCreateSchema),
  asyncWrapper(candidateEducationController.create)
);
candidateEducationRoute.get('/', verify, asyncWrapper(candidateEducationController.getAll));

candidateEducationRoute.get('/me', verify, asyncWrapper(candidateEducationController.getMyEducation));

candidateEducationRoute.patch(
  '/:educationId',
  verify,
  validateSchema(candidateEducationUpdateSchema),
  asyncWrapper(candidateEducationController.update)
);

candidateEducationRoute.delete('/:educationId', verify, asyncWrapper(candidateEducationController.delete));

export default candidateEducationRoute;
