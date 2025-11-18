import { Order, OrderStatus } from '@prisma/client';
import { IBaseRepository } from '~/global/base/repositories/base.repository';
import { IOrderByAdminResponse } from '../interfaces/order.interface';

export interface IOrderRepository extends IBaseRepository<Order> {
  findFirstByUser(id: number, userId: number): Promise<Order | null>;
  findFirstByAdmin(id: number): Promise<Order | null>;
  createOrder(packageId: number, recruiterId: number, totalPrice: number): Promise<Order>;
  updateStatusOrder(id: number, status: OrderStatus): Promise<Order>;
  getMyOrder(userId: number): Promise<Order[]>;

  getAllByAdmin(
    page: number,
    limit: number,
    sort?: 'asc' | 'desc',
    filterDate?: string,
    status?: OrderStatus
  ): Promise<{ data: IOrderByAdminResponse[]; total: number }>;
}
