import { Order, OrderStatus } from '@prisma/client';
import { IOrderService } from '../order.service';
import { packageService } from '~/modules/package/services/implements/package.service.impl';
import { orderRepository } from '../../repositories/implements/order.repository.impl';
import { NotFoundException } from '~/global/core/error.core';

class OrderService implements IOrderService {
  async create(packageId: number, userId: number): Promise<Order> {
    const packageEntity = await packageService.readOne(packageId);

    const order = await orderRepository.createOrder(packageId, userId, packageEntity.price);

    return order;
  }

  async getAll(): Promise<Order[]> {
    const orders = await orderRepository.findAll();

    return orders;
  }

  async getMyOrders(userId: number): Promise<Order[]> {
    const orders = await orderRepository.getMyOrder(userId);

    return orders;
  }

  async getOne(id: number, user: UserPayload): Promise<Order> {
    let order: Order | null;

    if (user.role === 'RECRUITER') {
      order = await orderRepository.findFirstByUser(id, +user.id);
    } else if (user.role === 'ADMIN') {
      order = await orderRepository.findFirstByAdmin(id);
    } else {
      order = null;
    }

    if (!order) {
      throw new NotFoundException('Cannot find order');
    }

    return order;
  }

  async updateStatus(id: number, status: OrderStatus): Promise<Order> {
    await this.findOne(id);

    const order = await orderRepository.updateStatusOrder(id, status);

    return order;
  }

  private async findOne(id: number) {
    const order = await orderRepository.findById(id);

    if (!order) {
      throw new NotFoundException('Order not found');
    }
  }
}

export const orderService: IOrderService = new OrderService();
