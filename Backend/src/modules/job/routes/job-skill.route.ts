import { Router } from 'express';
import asyncWrapper from '~/global/core/async-wrapper.core';
import { allowRole } from '~/global/middlewares/allowRole.middleware';
import { verify } from '~/global/middlewares/verify.middleware';
import { jobSkillController } from '../controllers/job-skill.controller';
import { jobSkillSchema } from '../schemas/job-skill.schema';
import { validateSchema } from '~/global/middlewares/validate.middleware';

const jobSkillRoute = Router();

jobSkillRoute.post(
  '/',
  verify,
  allowRole('RECRUITER'),
  validateSchema(jobSkillSchema),
  asyncWrapper(jobSkillController.create)
);

jobSkillRoute.get('/:jobId', verify, allowRole('RECRUITER'), asyncWrapper(jobSkillController.getAllByJob));
jobSkillRoute.delete('/:jobId/:skillName', verify, allowRole('RECRUITER'), asyncWrapper(jobSkillController.delete));

export default jobSkillRoute;
