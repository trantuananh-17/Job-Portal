import { Router } from 'express';
import asyncWrapper from '~/global/core/async-wrapper.core';
import { allowRole } from '~/global/middlewares/allowRole.middleware';
import { verify } from '~/global/middlewares/verify.middleware';
import { recruiterPackageController } from '../controllers/recruiter-package.controller';

const recruiterPackageRoute = Router();

recruiterPackageRoute.post('/', verify, allowRole('RECRUITER'), asyncWrapper(recruiterPackageController.create));

export default recruiterPackageRoute;
