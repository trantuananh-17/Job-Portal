import { Router } from 'express';
import asyncWrapper from '~/global/core/async-wrapper.core';
import { allowRole } from '~/global/middlewares/allowRole.middleware';
import { verify } from '~/global/middlewares/verify.middleware';
import { jobSkillController } from '../controllers/job-skill.controller';

const jobSkillRoute = Router();

jobSkillRoute.post(
  '/',
  verify,
  allowRole('ADMIN'),
  // validateSchema(jobRoleCreateSchema),
  asyncWrapper(jobSkillController.create)
);

jobSkillRoute.get('/:jobId', verify, allowRole('ADMIN'), asyncWrapper(jobSkillController.getAllByJob));
jobSkillRoute.delete('/:jobId/:skillName', verify, allowRole('ADMIN'), asyncWrapper(jobSkillController.delete));

export default jobSkillRoute;
