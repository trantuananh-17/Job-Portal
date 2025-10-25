import { Router } from 'express';
import asyncWrapper from '~/global/core/async-wrapper.core';
import { allowRole } from '~/global/middlewares/allowRole.middleware';
import { verify } from '~/global/middlewares/verify.middleware';
import { applyController } from '../controllers/apply.controller';
import { validateSchema } from '~/global/middlewares/validate.middleware';
import { updateStatusApplySchema } from '../schemas/apply.schema';
import upload from '~/global/middlewares/upload.middleware';

const applyRoute = Router();

applyRoute.post('/', verify, allowRole('CANDIDATE'), upload.single('cv'), asyncWrapper(applyController.create));
applyRoute.get('/', verify, allowRole('CANDIDATE'), asyncWrapper(applyController.getByMe));
applyRoute.get('/:jobId', verify, allowRole('RECRUITER'), asyncWrapper(applyController.getByRecruiter));
applyRoute.patch(
  '/',
  verify,
  allowRole('RECRUITER'),
  validateSchema(updateStatusApplySchema),
  asyncWrapper(applyController.updateStatus)
);

export default applyRoute;
