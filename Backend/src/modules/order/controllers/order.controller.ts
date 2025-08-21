import { Request, Response } from 'express';
import HttpStatus from '~/global/constants/http.constant';
import { orderService } from '../services/implements/order.service.impl';

class OrderController {
  public async getAll(req: Request, res: Response) {
    const orders = await orderService.getAll();

    return res.status(HttpStatus.OK).json({
      message: 'Get all orders',
      data: orders
    });
  }

  public async getMyOrder(req: Request, res: Response) {
    const userId = +req.user.id;

    const orders = await orderService.getMyOrders(userId);

    return res.status(HttpStatus.OK).json({
      message: 'Get all orders',
      data: orders
    });
  }

  public async getOne(req: Request, res: Response) {
    const orderId = +req.params.id;
    const user = req.user;

    const order = await orderService.getOne(orderId, user);

    return res.status(HttpStatus.OK).json({
      message: 'Get one order',
      data: order
    });
  }

  public async updateStatus(req: Request, res: Response) {
    const orderId = +req.params.id;
    const { status } = req.body;

    const order = await orderService.updateStatus(orderId, status);

    return res.status(HttpStatus.OK).json({
      message: 'Update status successfully',
      data: order
    });
  }
}

export const orderController: OrderController = new OrderController();
