import { Router } from 'express';
import asyncWrapper from '~/global/core/async-wrapper.core';
import { allowRole } from '~/global/middlewares/allowRole.middleware';
import upload from '~/global/middlewares/upload.middleware';
import { verify } from '~/global/middlewares/verify.middleware';
import { companyImageController } from '../controllers/company-image.controller';

const companyImageRoute = Router();

companyImageRoute.post(
  '/:companyId',
  verify,
  allowRole('RECRUITER'),
  upload.array('images'),
  asyncWrapper(companyImageController.create)
);

companyImageRoute.get('/:companyId', asyncWrapper(companyImageController.getAll));
companyImageRoute.delete(
  '/:companyId/:companyImageId',
  verify,
  allowRole('RECRUITER'),
  asyncWrapper(companyImageController.delete)
);

export default companyImageRoute;
