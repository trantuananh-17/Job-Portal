import { Router } from 'express';
import asyncWrapper from '~/global/core/async-wrapper.core';
import { allowRole } from '~/global/middlewares/allowRole.middleware';
import { verify } from '~/global/middlewares/verify.middleware';
import { jobBenefitController } from '../controllers/job-benefit.controller';
import { validateSchema } from '~/global/middlewares/validate.middleware';
import { jobBenefitSchema } from '../schemas/job-benefit.schema';

const jobBenefitRoute = Router();

jobBenefitRoute.post(
  '/',
  verify,
  allowRole('RECRUITER'),
  validateSchema(jobBenefitSchema),
  asyncWrapper(jobBenefitController.create)
);
jobBenefitRoute.get('/:jobId', asyncWrapper(jobBenefitController.getBenefitByJob));
jobBenefitRoute.delete(
  '/:jobId/:benefitName',
  verify,
  allowRole('RECRUITER'),
  asyncWrapper(jobBenefitController.delete)
);

export default jobBenefitRoute;
