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

jobRoute.get('/search', asyncWrapper(jobController.searchCompletion));
jobRoute.get('/es/search', asyncWrapper(jobController.searchJobsFilter));
jobRoute.get('/', asyncWrapper(jobController.getAll));
jobRoute.get('/me', verify, allowRole('RECRUITER'), asyncWrapper(jobController.getAllForRecruiter));
jobRoute.get('/:id', verifyUserOrNot, asyncWrapper(jobController.getOne));
jobRoute.get('/recruiter/:id', jobController.getJobByRecruiter);
jobRoute.get('/admin/get-all', verify, allowRole('ADMIN'), jobController.getAllForAdmin);
jobRoute.get('/admin/:id', verify, allowRole('ADMIN'), jobController.getJobByIdForAdmin);

jobRoute.patch(
  '/:id/status',
  verify,
  allowRole('ADMIN'),
  // validateSchema(jobUpdateSchema),
  asyncWrapper(jobController.updateStatus)
);
jobRoute.patch(
  '/:id/:companyId',
  verify,
  allowRole('RECRUITER'),
  validateSchema(jobUpdateSchema),
  jobController.update
);

jobRoute.delete('/admin/:id', verify, allowRole('ADMIN'), jobController.deleteJobByAdmin);
jobRoute.delete('/:id/:companyId', verify, allowRole('RECRUITER'), asyncWrapper(jobController.delete));

export default jobRoute;
