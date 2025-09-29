import { Order, OrderStatus } from '@prisma/client';
import { IOrderService } from '../order.service';
import { packageService } from '~/modules/package/services/implements/package.service.impl';
import { orderRepository } from '../../repositories/implements/order.repository.impl';
import { NotFoundException } from '~/global/core/error.core';
import { IPackageService } from '~/modules/package/services/package.service';
import { IOrderRepository } from '../../repositories/order.repository';

class OrderService implements IOrderService {
  constructor(
    private readonly packageService: IPackageService,
    private readonly orderRepository: IOrderRepository
  ) {}
  async create(packageId: number, userId: number): Promise<Order> {
    const packageEntity = await this.packageService.readOne(packageId);

    const order = await this.orderRepository.createOrder(packageId, userId, packageEntity.price);

    return order;
  }

  async getAll(): Promise<Order[]> {
    const orders = await this.orderRepository.findAll();

    return orders;
  }

  async getMyOrders(userId: number): Promise<Order[]> {
    const orders = await this.orderRepository.getMyOrder(userId);

    return orders;
  }

  async getOne(id: number, user: UserPayload): Promise<Order> {
    let order: Order | null;

    if (user.role === 'RECRUITER') {
      order = await this.orderRepository.findFirstByUser(id, +user.id);
    } else if (user.role === 'ADMIN') {
      order = await this.orderRepository.findFirstByAdmin(id);
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

    const order = await this.orderRepository.updateStatusOrder(id, status);

    return order;
  }

  private async findOne(id: number) {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new NotFoundException('Order not found');
    }
  }
}

export const orderService: IOrderService = new OrderService(packageService, orderRepository);
