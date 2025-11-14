import { User } from '@prisma/client';
import { ICreateUser, IUpdateUserByAdmin, IUserResponseByAdmin } from '../interfaces/user.interface';

export interface IUserRepository {
  findUserByEmail(email: string): Promise<User | null>;
  createUser(user: ICreateUser): Promise<User>;
  getUserUnique(userId: number): Promise<User | null>;
  getTotalDocs(q?: string, active?: boolean, verified?: boolean, role?: string): Promise<number>;
  getAllByAdmin(
    page: number,
    limit: number,
    q?: string,
    active?: boolean,
    verified?: boolean,
    role?: string
  ): Promise<IUserResponseByAdmin[]>;

  updateUserByAdmin(userId: number, requestBody: Partial<IUpdateUserByAdmin>): Promise<User>;
  softDelete(userId: number): Promise<User>;
}
