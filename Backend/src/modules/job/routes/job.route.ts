import { Router } from 'express';
import asyncWrapper from '~/global/core/async-wrapper.core';
import { allowRole } from '~/global/middlewares/allowRole.middleware';
import { validateSchema } from '~/global/middlewares/validate.middleware';
import { verify, verifyUserOrNot } from '~/global/middlewares/verify.middleware';
import { jobController } from '../controllers/job.controller';
import { jobCreateSchema, jobUpdateSchema } from '../schemas/job.schema';

const jobRoute = Router();

jobRoute.post(
  '/',
  verify,
  allowRole('RECRUITER', 'ADMIN'),
  validateSchema(jobCreateSchema),
  asyncWrapper(jobController.create)
);

jobRoute.get('/get/all', jobController.getES);

jobRoute.get('/', asyncWrapper(jobController.getAll));
jobRoute.get('/me', verify, allowRole('RECRUITER'), asyncWrapper(jobController.getAllForRecruiter));

jobRoute.get('/:id', verifyUserOrNot, asyncWrapper(jobController.getOne));

jobRoute.patch(
  '/:id/:companyId/status',
  verify,
  allowRole('RECRUITER'),
  // validateSchema(jobUpdateSchema),
  asyncWrapper(jobController.updateStatus)
);
jobRoute.patch(
  '/:id/:companyId',
  verify,
  allowRole('RECRUITER'),
  validateSchema(jobUpdateSchema),
  asyncWrapper(jobController.update)
);
jobRoute.delete('/:id/:companyId', verify, allowRole('RECRUITER'), asyncWrapper(jobController.delete));

export default jobRoute;
