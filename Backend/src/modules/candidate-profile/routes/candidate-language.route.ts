import { Router } from 'express';
import asyncWrapper from '~/global/core/async-wrapper.core';
import { candidateLanguagesController } from '../controllers/candidate-language.controller';
import { verify } from '~/global/middlewares/verify.middleware';
import { allowRole } from '~/global/middlewares/allowRole.middleware';
import { validateSchema } from '~/global/middlewares/validate.middleware';
import { candidateLanguageCreateSchema, candidateLanguageUpdateSchema } from '../schemas/candidate-language.schema';

const candidateLanguageRoute = Router();

candidateLanguageRoute.post(
  '/',
  verify,
  validateSchema(candidateLanguageCreateSchema),
  asyncWrapper(candidateLanguagesController.create)
);
candidateLanguageRoute.get('/', verify, allowRole('ADMIN'), asyncWrapper(candidateLanguagesController.getAll));
candidateLanguageRoute.get('/me', verify, asyncWrapper(candidateLanguagesController.getMyLanguages));
candidateLanguageRoute.patch(
  '/:languageName',
  verify,
  validateSchema(candidateLanguageUpdateSchema),
  asyncWrapper(candidateLanguagesController.updateLevel)
);
candidateLanguageRoute.delete('/:languageName', verify, asyncWrapper(candidateLanguagesController.delete));

export default candidateLanguageRoute;
