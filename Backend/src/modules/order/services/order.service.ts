import { Order, OrderStatus } from '@prisma/client';

export interface IOrderService {
  create(packageId: number, userId: number): Promise<Order>;
  getAll(): Promise<Order[]>;
  getMyOrders(userId: number): Promise<Order[]>;
  getOne(id: number, user: UserPayload): Promise<Order>;
  updateStatus(id: number, status: OrderStatus): Promise<Order>;
}
