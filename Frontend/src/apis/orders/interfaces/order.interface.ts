import type { IPackage } from '@/apis/packages/interfaces/package.interface';
import type { IUser } from '@apis/users/interfaces/user.interface';

export interface IOrder {
  id: number;
  recruiter: IUser;
  package: IPackage;
  totalPrice: number;
  status: string;
  orderDate: string;
}
