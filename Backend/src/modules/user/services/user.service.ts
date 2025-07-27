import { User } from 'generated/prisma';
import prisma from '~/prisma';

class UserService {
  public async createUser(req: any): Promise<User> {
    const { name, email, password, role } = req;

    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        status: true,
        role: req.body.role
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
