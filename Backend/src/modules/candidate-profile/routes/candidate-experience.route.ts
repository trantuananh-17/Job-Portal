import express from 'express';
import { candidateExperienceController } from '../controllers/candidate-experience.controller';
import { verify } from '~/global/middlewares/verify.middleware';
import { validateSchema } from '~/global/middlewares/validate.middleware';
import {
  candidateExperienceCreateSchema,
  candidateExperienceUpdateSchema
} from '../schemas/candidate-experience.shema';
import asyncWrapper from '~/global/core/async-wrapper.core';
import { allowRole } from '~/global/middlewares/allowRole.middleware';

const candidateExperienceRoute = express.Router();

candidateExperienceRoute.post(
  '/',
  verify,
  validateSchema(candidateExperienceCreateSchema),
  asyncWrapper(candidateExperienceController.create)
);
candidateExperienceRoute.get('/', verify, allowRole('ADMIN'), asyncWrapper(candidateExperienceController.getAll));
candidateExperienceRoute.get('/me', verify, asyncWrapper(candidateExperienceController.readMyExperiences));
candidateExperienceRoute.patch(
  '/:id',
  verify,
  validateSchema(candidateExperienceUpdateSchema),
  asyncWrapper(candidateExperienceController.update)
);
candidateExperienceRoute.delete('/:id', verify, asyncWrapper(candidateExperienceController.delete));

export default candidateExperienceRoute;
