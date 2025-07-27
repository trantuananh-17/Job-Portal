import express from 'express';
import asyncWrapper from '~/global/core/async-wrapper.core';
import { authController } from '../controllers/auth.controller';
import { validateSchema } from '~/global/middlewares/validate.middleware';
import { authSignUpSchema } from '../schemas/auth.schema';

const authRoute = express.Router();

authRoute.post('/signup', validateSchema(authSignUpSchema), asyncWrapper(authController.signUp));

export default authRoute;
