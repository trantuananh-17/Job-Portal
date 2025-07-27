import express from 'express';
import { userController } from '../controllers/user.controller';
import asyncWrapper from '~/global/core/async-wrapper.core';
import { validateSchema } from '~/global/middlewares/validate.middleware';
import { userCreateSchema } from '../schemas/user.schema';

const userRoute = express.Router();

userRoute.get('/', asyncWrapper(userController.getAll));
userRoute.post('/', validateSchema(userCreateSchema), asyncWrapper(userController.create));

export default userRoute;
