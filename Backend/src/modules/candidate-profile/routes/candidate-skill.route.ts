import { Router } from 'express';
import { candidateSkillController } from '../controllers/candidate-skill.controller';
import asyncWrapper from '~/global/core/async-wrapper.core';
import { verify } from '~/global/middlewares/verify.middleware';
import { allowRole } from '~/global/middlewares/allowRole.middleware';
import { validateSchema } from '~/global/middlewares/validate.middleware';
import { createCandidateSkillSchema } from '../schemas/candidate-skill.schema';

const candidateSkillRoute = Router();

candidateSkillRoute.post(
  '/',
  verify,
  validateSchema(createCandidateSkillSchema),
  asyncWrapper(candidateSkillController.create)
);
candidateSkillRoute.get('/', verify, allowRole('ADMIN'), asyncWrapper(candidateSkillController.readAll));
candidateSkillRoute.get('/me', verify, asyncWrapper(candidateSkillController.getMySkills));
candidateSkillRoute.delete('/:skillName', verify, asyncWrapper(candidateSkillController.delete));

export default candidateSkillRoute;
