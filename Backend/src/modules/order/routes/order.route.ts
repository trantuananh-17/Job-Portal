import { Router } from 'express';
import asyncWrapper from '~/global/core/async-wrapper.core';
import { allowRole } from '~/global/middlewares/allowRole.middleware';
import { verify } from '~/global/middlewares/verify.middleware';
import { orderController } from '../controllers/order.controller';

const orderRoute = Router();

orderRoute.get('/admin/get-all', asyncWrapper(orderController.getAllByAdmin));
orderRoute.get('/me', verify, allowRole('RECRUITER'), asyncWrapper(orderController.getMyOrder));
orderRoute.get('/:id', verify, allowRole('RECRUITER', 'ADMIN'), asyncWrapper(orderController.getOne));
orderRoute.patch('/:id', verify, allowRole('ADMIN'), asyncWrapper(orderController.updateStatus));

export default orderRoute;
