import express from 'express';
import { userController } from '../controllers/user.controller';
import asyncWrapper from '~/global/core/async-wrapper.core';
import { validateSchema } from '~/global/middlewares/validate.middleware';
import { userCreateSchema } from '../schemas/user.schema';
import { allowRole } from '~/global/middlewares/allowRole.middleware';
import { verify } from '~/global/middlewares/verify.middleware';

const userRoute = express.Router();

userRoute.post('/', validateSchema(userCreateSchema), asyncWrapper(userController.create));
userRoute.patch('/admin/:userId/update', verify, allowRole('ADMIN'), asyncWrapper(userController.updateByAdmin));
userRoute.patch('/admin/:userId/delete', verify, allowRole('ADMIN'), asyncWrapper(userController.softDelete));

userRoute.get('/admin/get-all', userController.getAllByAdmin);

export default userRoute;
