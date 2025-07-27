import express from 'express';
import asyncWrapper from '~/global/core/async-wrapper.core';
import { authController } from '../controllers/auth.controller';
import { validateSchema } from '~/global/middlewares/validate.middleware';
import { authSignInSchema, authSignUpSchema } from '../schemas/auth.schema';
import { verify } from '~/global/middlewares/verify.middleware';

const authRoute = express.Router();

authRoute.post('/signup', validateSchema(authSignUpSchema), asyncWrapper(authController.signUp));
authRoute.post('/login', validateSchema(authSignInSchema), asyncWrapper(authController.signIn));
authRoute.get('/me', verify, asyncWrapper(authController.getProfileUser));

export default authRoute;
