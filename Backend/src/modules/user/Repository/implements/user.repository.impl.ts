import { User } from '@prisma/client';
import prisma from '~/prisma';
import { IUserRepository } from '../user.repository';

class UserRepository implements IUserRepository {
  public async findUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findFirst({
      where: { email }
    });
  }
}

export const userRepository: IUserRepository = new UserRepository();
