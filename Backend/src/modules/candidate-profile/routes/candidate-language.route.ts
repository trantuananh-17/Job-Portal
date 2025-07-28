import { Router } from 'express';
import asyncWrapper from '~/global/core/async-wrapper.core';
import { candidateLanguagesController } from '../controllers/candidate-language.controller';
import { verify } from '~/global/middlewares/verify.middleware';

const candidateLanguageRoute = Router();

candidateLanguageRoute.post('/', verify, asyncWrapper(candidateLanguagesController.create));

export default candidateLanguageRoute;
