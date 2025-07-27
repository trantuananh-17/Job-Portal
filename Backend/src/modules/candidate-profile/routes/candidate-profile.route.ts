import { Router } from 'express';
import asyncWrapper from '~/global/core/async-wrapper.core';
import { candidateProfileController } from '../controllers/candidate-profile.controller';
import { verify } from '~/global/middlewares/verify.middleware';

const candidateProfileRoute = Router();

candidateProfileRoute.post('/', verify, asyncWrapper(candidateProfileController.create));
candidateProfileRoute.get('/', verify, asyncWrapper(candidateProfileController.getAll));
candidateProfileRoute.get('/:id', verify, asyncWrapper(candidateProfileController.getOne));

export default candidateProfileRoute;
