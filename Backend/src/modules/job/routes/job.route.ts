import { Router } from 'express';
import asyncWrapper from '~/global/core/async-wrapper.core';
import { allowRole } from '~/global/middlewares/allowRole.middleware';
import { validateSchema } from '~/global/middlewares/validate.middleware';
import { verify } from '~/global/middlewares/verify.middleware';
import { jobController } from '../controllers/job.controller';

const jobRoute = Router();

jobRoute.post(
  '/',
  verify,
  allowRole('RECRUITER', 'ADMIN'),
  // validateSchema(jobCreateSchema),
  asyncWrapper(jobController.create)
);

export default jobRoute;
