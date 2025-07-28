import { User } from '@prisma/client';
import prisma from '~/prisma';

class UserRepository {
  public async findUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findFirst({
      where: { email }
    });
  }
}

export const userRepository: UserRepository = new UserRepository();
