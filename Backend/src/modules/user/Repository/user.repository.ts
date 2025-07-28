import { User } from '@prisma/client';

export interface IUserRepository {
  findUserByEmail(email: string): Promise<User | null>;
}
