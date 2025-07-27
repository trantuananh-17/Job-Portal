import { User } from 'generated/prisma';
import prisma from '~/prisma';

class UserService {
  public async createUser(requestBody: any) {}

  public async getAll(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users;
  }
}

export const userService: UserService = new UserService();
