import { User } from '@prisma/client';
import { ICreateUser, IUpdateUserByAdmin, IUserResponseByAdmin } from '../interfaces/user.interface';

export interface IUserService {
  createUser(req: ICreateUser): Promise<User>;
  getAll(
    page: number,
    limit: number,
    q?: string,
    active?: boolean,
    verified?: boolean,
    role?: string
  ): Promise<{ data: IUserResponseByAdmin[]; totalDocs: number; totalPages: number; page: number; limit: number }>;
  getUserUnique(userId: number): Promise<User | null>;
  updateUserByAdmin(userId: number, requestBody: Partial<IUpdateUserByAdmin>): Promise<User>;
  softDelete(userId: number): Promise<User>;
}
