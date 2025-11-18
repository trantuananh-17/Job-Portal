import { Order, OrderStatus, PrismaClient } from '@prisma/client';
import { BaseRepository } from '~/global/base/repositories/implements/base.repository.impl';
import { IOrderRepository } from '../order.repository';
import prisma from '~/prisma';
import { IOrderByAdminResponse } from '../../interfaces/order.interface';
import convertDay from '~/global/helpers/convertDay.helpter';

class OrderRepository extends BaseRepository<Order> implements IOrderRepository {
  constructor(private readonly prisma: PrismaClient) {
    super(prisma.order);
  }

  async getAllByAdmin(
    page: number,
    limit: number,
    sort?: 'asc' | 'desc',
    filterDate?: string,
    status?: OrderStatus
  ): Promise<{ data: IOrderByAdminResponse[]; total: number }> {
    const whereClause = {
      ...(status ? { status } : {}),

      ...(filterDate
        ? {
            orderDate: {
              gte: convertDay(filterDate)
            }
          }
        : {})
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.order.findMany({
        where: whereClause,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { orderDate: sort },
        select: {
          id: true,
          orderDate: true,
          package: {
            select: {
              id: true,
              label: true,
              price: true,
              jobPostLimit: true
            }
          },
          recruiter: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          totalPrice: true,
          status: true
        }
      }),

      this.prisma.order.count({ where: whereClause })
    ]);

    return { data, total };
  }

  async getMyOrder(userId: number): Promise<Order[]> {
    return await this.prisma.order.findMany({
      where: { recruiterId: userId }
    });
  }

  async findFirstByUser(id: number, userId: number): Promise<Order | null> {
    return await this.prisma.order.findFirst({
      where: { id, recruiterId: userId }
    });
  }

  async findFirstByAdmin(id: number): Promise<Order | null> {
    return await this.prisma.order.findFirst({
      where: { id }
    });
  }

  async createOrder(packageId: number, recruiterId: number, totalPrice: number): Promise<Order> {
    return await this.prisma.order.create({
      data: {
        packageId,
        recruiterId,
        totalPrice
      }
    });
  }

  async updateStatusOrder(id: number, status: OrderStatus): Promise<Order> {
    return await this.prisma.order.update({
      where: { id },
      data: {
        status
      }
    });
  }
}

export const orderRepository: IOrderRepository = new OrderRepository(prisma);
