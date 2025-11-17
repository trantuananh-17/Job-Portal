import { Order, OrderStatus } from '@prisma/client';
import { IOrderByAdminResponse } from '../interfaces/order.interface';

export interface IOrderService {
  create(packageId: number, userId: number): Promise<Order>;
  getAll(): Promise<Order[]>;
  getMyOrders(userId: number): Promise<Order[]>;
  getOne(id: number, user: UserPayload): Promise<Order>;
  updateStatus(id: number, status: OrderStatus): Promise<Order>;

  getAllByAdmin(
    page: number,
    limit: number,
    sort?: 'asc' | 'desc',
    filterDate?: string,
    status?: string
  ): Promise<{ data: IOrderByAdminResponse[]; totalDocs: number; totalPages: number; page: number; limit: number }>;
}
