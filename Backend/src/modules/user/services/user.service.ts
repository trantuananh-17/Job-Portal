import { User } from '@prisma/client';
import prisma from '~/prisma';

class UserService {
  public async createUser(req: any): Promise<User> {
    const { name, email, password } = req;

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
        status: true,
        role: 'CANDIDATE'
      }
    });

    return user;
  }

  public async getAll(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users;
  }
}

export const userService: UserService = new UserService();
