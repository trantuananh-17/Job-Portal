import { Order, OrderStatus } from '@prisma/client';
import { BaseRepository } from '~/global/base/repositories/implements/base.repository.impl';
import { IOrderRepository } from '../order.repository';
import prisma from '~/prisma';

class OrderRepository extends BaseRepository<Order> implements IOrderRepository {
  constructor() {
    super(prisma.order);
  }

  async getMyOrder(userId: number): Promise<Order[]> {
    return await prisma.order.findMany({
      where: { recruiterId: userId }
    });
  }

  async findFirstByUser(id: number, userId: number): Promise<Order | null> {
    return await prisma.order.findFirst({
      where: { id, recruiterId: userId }
    });
  }

  async findFirstByAdmin(id: number): Promise<Order | null> {
    return await prisma.order.findFirst({
      where: { id }
    });
  }

  async createOrder(packageId: number, recruiterId: number, totalPrice: number): Promise<Order> {
    return await prisma.order.create({
      data: {
        packageId,
        recruiterId,
        totalPrice
      }
    });
  }

  async updateStatusOrder(id: number, status: OrderStatus): Promise<Order> {
    return await prisma.order.update({
      where: { id },
      data: {
        status
      }
    });
  }
}

export const orderRepository: IOrderRepository = new OrderRepository();
