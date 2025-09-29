import { User } from '@prisma/client';
import prisma from '~/prisma';
import { IUserRepository } from '../user.repository';
import { PrismaClient } from '@prisma/client/extension';

class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}
  public async findUserByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: { email }
    });
  }
}

export const userRepository: IUserRepository = new UserRepository(prisma);
