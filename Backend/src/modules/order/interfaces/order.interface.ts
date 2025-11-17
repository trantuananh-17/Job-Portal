import { OrderStatus } from '@prisma/client';

interface IOrder {
  id: number;
  package: {
    id: number;
    label: string;
    jobPostLimit: number;
    price: number;
  };
  totalPrice: number;
  status: OrderStatus;
  orderDate: Date;
}

interface IOrderByAdminResponse extends IOrder {
  recruiter: {
    id: number;
    name: string | null;
    email: string;
  };
}

export { IOrder, IOrderByAdminResponse };
